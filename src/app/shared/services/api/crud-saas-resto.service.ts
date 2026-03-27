import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class CrudSaasRestoService {

  constructor(private http: HttpClient) { }

  ajouterRole(userData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/ajouter_role`, userData);
  }

  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/get_all_roles`);
  }

  getRoleById(id: number): Observable<any> {
  const url = `${environment.apiUrl}/get_role_by_id/${id}`;
  return this.http.get<any>(url);
}

  deleteRole(id: number): Observable<any> {
    const url = `${environment.apiUrl}/delete_role/${id}`;
    return this.http.delete<any>(url);
  }

  updateRole(id: number, categorie: any): Observable<any> {
    const url = `${environment.apiUrl}/update_role/${id}`;
    return this.http.put<any>(url, categorie);
  }

  ajouterSociete(userData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/ajouter_societe`, userData);
  }

  getSocietes(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/get_all_societes`);
  }

  getSocieteById(id: number): Observable<any> {
  const url = `${environment.apiUrl}/get_societe_by_id/${id}`;
  return this.http.get<any>(url);
}

  deleteSociete(id: number): Observable<any> {
    const url = `${environment.apiUrl}/delete_societe/${id}`;
    return this.http.delete<any>(url);
  }

  updateSociete(id: number, categorie: any): Observable<any> {
    const url = `${environment.apiUrl}/update_societe/${id}`;
    return this.http.put<any>(url, categorie);
  }

  ajouterUtilisateur(userData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/ajouter_utilisateur`, userData);
  }

  getUtilisateurs(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/get_all_utilisateurs`);
  }

  getUtilisateursByRole(role_string:string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/get_all_utilisateurs_by_role/${role_string}`);
  }

  getUtilisateurById(id: number): Observable<any> {
  const url = `${environment.apiUrl}/get_utilisateur_by_id/${id}`;
  return this.http.get<any>(url);
}

  deleteUtilisateur(id: number): Observable<any> {
    const url = `${environment.apiUrl}/delete_utilisateur/${id}`;
    return this.http.delete<any>(url);
  }

  updateUtilisateur(id: number, categorie: any): Observable<any> {
    const url = `${environment.apiUrl}/update_utilisateur/${id}`;
    return this.http.put<any>(url, categorie);
  }

  ajouterRestaurant(userData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/ajouter_restaurant`, userData);
  }

  getRestaurants(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/get_all_restaurants`);
  }

  getRestaurantById(id: number): Observable<any> {
  const url = `${environment.apiUrl}/get_restaurant_by_id/${id}`;
  return this.http.get<any>(url);
}

  deleteRestaurant(id: number): Observable<any> {
    const url = `${environment.apiUrl}/delete_restaurant/${id}`;
    return this.http.delete<any>(url);
  }

  updateRestaurant(id: number, categorie: any): Observable<any> {
    const url = `${environment.apiUrl}/update_restaurant/${id}`;
    return this.http.put<any>(url, categorie);
  }

  ajouterTable(userData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/ajouter_table`, userData);
  }

  getTables(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/get_all_tables`);
  }

  getTableById(id: number): Observable<any> {
  const url = `${environment.apiUrl}/get_table_by_id/${id}`;
  return this.http.get<any>(url);
}

  deleteTable(id: number): Observable<any> {
    const url = `${environment.apiUrl}/delete_table/${id}`;
    return this.http.delete<any>(url);
  }

  updateTable(id: number, categorie: any): Observable<any> {
    const url = `${environment.apiUrl}/update_table/${id}`;
    return this.http.put<any>(url, categorie);
  }

   ajouterCategorieProduit(userData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/ajouter_categorie_produit`, userData);
  }

  getCategoriesProduit(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/get_all_categories_produit`);
  }

  getCategorieProduitById(id: number): Observable<any> {
  const url = `${environment.apiUrl}/get_categorie_produit_by_id/${id}`;
  return this.http.get<any>(url);
}

  deleteCategorieProduit(id: number): Observable<any> {
    const url = `${environment.apiUrl}/delete_categorie_produit/${id}`;
    return this.http.delete<any>(url);
  }

  updateCategorieProduit(id: number, categorie: any): Observable<any> {
    const url = `${environment.apiUrl}/update_categorie_produit/${id}`;
    return this.http.put<any>(url, categorie);
  }

  ajouterProduit(userData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/ajouter_produit`, userData);
  }

  getProduits(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/get_all_produits`);
  }

  getProduitById(id: number): Observable<any> {
  const url = `${environment.apiUrl}/get_produit_by_id/${id}`;
  return this.http.get<any>(url);
}

  deleteProduit(id: number): Observable<any> {
    const url = `${environment.apiUrl}/delete_produit/${id}`;
    return this.http.delete<any>(url);
  }

  updateProduit(id: number, produit: any): Observable<any> {
    const url = `${environment.apiUrl}/update_produit/${id}`;
    return this.http.put<any>(url, produit);
  }

   ajouterVariationProduit(userData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/ajouter_variation_produit`, userData);
  }

  getVariationsProduit(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/get_all_variations_produit`);
  }

  getVariationProduitById(id: number): Observable<any> {
  const url = `${environment.apiUrl}/get_variation_produit_by_id/${id}`;
  return this.http.get<any>(url);
}

  deleteVariationProduit(id: number): Observable<any> {
    const url = `${environment.apiUrl}/delete_variation_produit/${id}`;
    return this.http.delete<any>(url);
  }

  updateVariationProduit(id: number, variation: any): Observable<any> {
    const url = `${environment.apiUrl}/update_variation_produit/${id}`;
    return this.http.put<any>(url, variation);
  }


}
