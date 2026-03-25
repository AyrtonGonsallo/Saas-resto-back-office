import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class CrudSaasRestoService {

  constructor(private http: HttpClient) { }

  ajouterSociete(userData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/ajouter_societe`, userData);
  }

  ajouterRole(userData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/ajouter_role`, userData);
  }

  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/get_all_roles`);
  }

}
