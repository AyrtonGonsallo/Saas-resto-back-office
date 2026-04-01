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

  getRoles(priorite:number | null): Observable<any[]> {
    let url = `${environment.apiUrl}/get_all_roles`;
    if (priorite) {
      url += `?priorite=${priorite}`;
    }
    return this.http.get<any[]>(url);
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

  getUtilisateurs(restaurantId:number | null): Observable<any[]> {
    let url = `${environment.apiUrl}/get_all_utilisateurs`;
    if (restaurantId) {
      url += `?restaurant_id=${restaurantId}`;
    }
    return this.http.get<any[]>(url);
  }

  getUtilisateursByRole(role_string:string,restaurantId:number | null): Observable<any[]> {
    let url = `${environment.apiUrl}/get_all_utilisateurs_by_role/${role_string}`;
    if (restaurantId) {
      url += `?restaurant_id=${restaurantId}`;
    }
    return this.http.get<any[]>(url);
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

  getRestaurants(restaurantId:number | null): Observable<any[]> {
    let url = `${environment.apiUrl}/get_all_restaurants`;
    if (restaurantId) {
      url += `?restaurant_id=${restaurantId}`;
    }
    return this.http.get<any[]>(url);
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


  getTables(restaurantId:number | null): Observable<any[]> {
    let url = `${environment.apiUrl}/get_all_tables`;
    if (restaurantId) {
      url += `?restaurant_id=${restaurantId}`;
    }
    return this.http.get<any[]>(url);
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

  getCategoriesProduit(restaurantId:number | null): Observable<any[]> {
    let url = `${environment.apiUrl}/get_all_categories_produit`;
    if (restaurantId) {
      url += `?restaurant_id=${restaurantId}`;
    }
    return this.http.get<any[]>(url);
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

  getProduits(restaurantId:number | null): Observable<any[]> {
    let url = `${environment.apiUrl}/get_all_produits`;
    if (restaurantId) {
      url += `?restaurant_id=${restaurantId}`;
    }
    return this.http.get<any[]>(url);
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

  getVariationsProduit(restaurantId:number | null): Observable<any[]> {
    let url = `${environment.apiUrl}/get_all_variations_produit`;
    if (restaurantId) {
      url += `?restaurant_id=${restaurantId}`;
    }
    return this.http.get<any[]>(url);
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

  ajouterParametre(userData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/ajouter_parametre`, userData);
  }

  getParametres(restaurantId:number | null): Observable<any[]> {
    let url = `${environment.apiUrl}/get_all_parametres`;
    if (restaurantId) {
      url += `?restaurant_id=${restaurantId}`;
    }
    return this.http.get<any[]>(url);
  }

  getParametreById(id: number): Observable<any> {
    const url = `${environment.apiUrl}/get_parametre_by_id/${id}`;
    return this.http.get<any>(url);
  }

  deleteParametre(id: number): Observable<any> {
    const url = `${environment.apiUrl}/delete_parametre/${id}`;
    return this.http.delete<any>(url);
  }

  updateParametre(id: number, parametre: any): Observable<any> {
    const url = `${environment.apiUrl}/update_parametre/${id}`;
    return this.http.put<any>(url, parametre);
  }

  updatePortefeuille(id: number, datas: any): Observable<any> {
    const url = `${environment.apiUrl}/update_portefeuille/${id}`;
    return this.http.put<any>(url, datas);
  }

  updateAbonnement(id: number, datas: any): Observable<any> {
    const url = `${environment.apiUrl}/update_abonnement/${id}`;
    return this.http.put<any>(url, datas);
  }

  getAbonnementById(id: number): Observable<any> {
    const url = `${environment.apiUrl}/get_abonnement_by_id/${id}`;
    return this.http.get<any>(url);
  }

  getPortefeuilleById(id: number): Observable<any> {
    const url = `${environment.apiUrl}/get_portefeuille_by_id/${id}`;
    return this.http.get<any>(url);
  }


}
