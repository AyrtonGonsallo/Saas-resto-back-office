import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root',
})
export class AuthSaasRestoService {
   private api = environment.apiUrl;

   user:any


  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post<any>(`${this.api}/login`, data).pipe(
      tap(res => {
        localStorage.setItem('access_token', res.accessToken);
        localStorage.setItem('refresh_token', res.refreshToken);

        console.log('Access expire:', this.getTokenExpiration(res.accessToken));
        console.log('Refresh expire:', this.getTokenExpiration(res.refreshToken));
      })
    );
  }


   get_change_password_code(data: any) {
    return this.http.post<any>(`${this.api}/get_change_password_code`, data).pipe(
      tap(res => {
        console.log('get_change_password_code ', (res));
      })
    );
  }

  check_change_password_code(data: any) {
    return this.http.post<any>(`${this.api}/check_change_password_code`, data).pipe(
      tap(res => {
        console.log('check_change_password_code ', (res));
      })
    );
  }


  resset_password(data: any) {
    return this.http.post<any>(`${this.api}/resset_password`, data).pipe(
      tap(res => {
        console.log('resset_password ', (res));
      })
    );
  }

  refresh() {
    const refreshToken = localStorage.getItem('refresh_token');
    return this.http.post<any>(`${this.api}/refresh`, { refreshToken });
  }

  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  setUser(user:any){
    this.user=user;
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded: any = JSON.parse(atob(token.split('.')[1]));
      return Date.now() > decoded.exp * 1000;
    } catch {
      return true;
    }
  }

  getUser() {
     const refreshToken = this.getRefreshToken()??'';
     const accessToken = this.getAccessToken()??'';
     console.log('Access expire:', this.getTokenExpiration(accessToken));
      console.log('Refresh expire:', this.getTokenExpiration(refreshToken));
    if (!this.user) {
      const stored = localStorage.getItem('user');
      this.user = stored ? JSON.parse(stored) : null;
    }
    return this.user;

  }

  logout() {
    localStorage.clear();
  }


  getTokenExpiration(token: string): Date | null {
  try {
    const decoded: any = jwtDecode(token);
    if (!decoded.exp) return null;

    return new Date(decoded.exp * 1000); // 🔥 convertir en ms
  } catch (e) {
    return null;
  }
}
}
