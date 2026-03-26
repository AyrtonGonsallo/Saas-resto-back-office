import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthSaasRestoService } from "../services/auth/auth-saas-resto.service";
import { catchError, switchMap, throwError } from "rxjs";

// auth.interceptor.ts
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private auth: AuthSaasRestoService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        const token = this.auth.getAccessToken();

        //  ne jamais intercepter /refresh
        if (req.url.includes('/refresh')) {
            return next.handle(req);
        }

        let cloned = req;

        if (token) {
            cloned = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
            });
        }

        //  Si token expiré → refresh AVANT requête
        if (token && this.auth.isTokenExpired(token)) {
            console.log('Access expiré → refresh');

            return this.auth.refresh().pipe(
            switchMap((res: any) => {
                localStorage.setItem('access_token', res.accessToken);

                const newReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${res.accessToken}`
                }
                });

                return next.handle(newReq);
            }),
            catchError(() => {
                this.auth.logout(); // refresh expiré
                return throwError(() => 'Session expirée');
            })
            );
        }

        //  Sinon requête normale + fallback 401
        return next.handle(cloned).pipe(
            catchError(err => {

            if ((err.status === 401 || err.status === 403)) {

                return this.auth.refresh().pipe(
                switchMap((res: any) => {
                    localStorage.setItem('access_token', res.accessToken);

                    const newReq = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${res.accessToken}`
                    }
                    });

                    return next.handle(newReq);
                }),
                catchError(() => {
                    this.auth.logout();
                    return throwError(() => err);
                })
                );
            }

            return throwError(() => err);
            })
        );
        }
}