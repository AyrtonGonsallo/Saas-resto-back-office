import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';
import { ReservationDatasResponse } from '../../interface/custom/reservation-datas-response';
import { CommandeDatasResponse } from '../../interface/custom/commande-datas-response';

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

  getRestaurantsWithParametres(restaurantId:number | null): Observable<any[]> {
    let url = `${environment.apiUrl}/get_all_restaurants_with_parametres`;
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

  getLowsProduits(restaurantId:number | null): Observable<any[]> {
    let url = `${environment.apiUrl}/get_low_stocks_produits`;
    if (restaurantId) {
      url += `?restaurant_id=${restaurantId}`;
    }
    return this.http.get<any[]>(url);
  }

  getLowsVariationsProduits(restaurantId:number | null): Observable<any[]> {
    let url = `${environment.apiUrl}/get_low_variations_produit`;
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

  getParametreByTypeAndRestaurant(type:string,restaurant_id: number): Observable<any> {
    const url = `${environment.apiUrl}/get_parametre_by_type_and_restaurant/${type}/${restaurant_id}`;
    return this.http.get<any>(url);
  }

  recreateParametresRestaurant(resto_id: number): Observable<any> {
    const url = `${environment.apiUrl}/recreate_parametres_restaurant/${resto_id}`;
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

  
  ajouterCreneau(userData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/ajouter_creneau`, userData);
  }

  getCreneaux(restaurantId:number | null): Observable<any[]> {
    let url = `${environment.apiUrl}/get_all_creneaux`;
    if (restaurantId) {
      url += `?restaurant_id=${restaurantId}`;
    }
    return this.http.get<any[]>(url);
  }

  getCreneauById(id: number): Observable<any> {
    const url = `${environment.apiUrl}/get_creneau_by_id/${id}`;
    return this.http.get<any>(url);
  }

  deleteCreneau(id: number): Observable<any> {
    const url = `${environment.apiUrl}/delete_creneau/${id}`;
    return this.http.delete<any>(url);
  }

  updateCreneau(id: number, parametre: any): Observable<any> {
    const url = `${environment.apiUrl}/update_creneau/${id}`;
    return this.http.put<any>(url, parametre);
  }

  ajouterService(userData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/ajouter_service`, userData);
  }

  getServices(restaurantId:number | null): Observable<any[]> {
    let url = `${environment.apiUrl}/get_all_services`;
    if (restaurantId) {
      url += `?restaurant_id=${restaurantId}`;
    }
    return this.http.get<any[]>(url);
  }

  getServiceById(id: number): Observable<any> {
    const url = `${environment.apiUrl}/get_service_by_id/${id}`;
    return this.http.get<any>(url);
  }

  deleteService(id: number): Observable<any> {
    const url = `${environment.apiUrl}/delete_service/${id}`;
    return this.http.delete<any>(url);
  }

  updateService(id: number, parametre: any): Observable<any> {
    const url = `${environment.apiUrl}/update_service/${id}`;
    return this.http.put<any>(url, parametre);
  }

  ajouterTag(userData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/ajouter_tag`, userData);
  }

  getTags(restaurantId:number | null): Observable<any[]> {
    let url = `${environment.apiUrl}/get_all_tags`;
    if (restaurantId) {
      url += `?restaurant_id=${restaurantId}`;
    }
    return this.http.get<any[]>(url);
  }

  getTagById(id: number): Observable<any> {
    const url = `${environment.apiUrl}/get_tag_by_id/${id}`;
    return this.http.get<any>(url);
  }

  deleteTag(id: number): Observable<any> {
    const url = `${environment.apiUrl}/delete_tag/${id}`;
    return this.http.delete<any>(url);
  }

  updateTag(id: number, parametre: any): Observable<any> {
    const url = `${environment.apiUrl}/update_tag/${id}`;
    return this.http.put<any>(url, parametre);
  }


  ajouterReservation(userData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/ajouter_reservation`, userData);
  }

  getReservations(restaurantId:number | null): Observable<any[]> {
    let url = `${environment.apiUrl}/get_all_reservations`;
    if (restaurantId) {
      url += `?restaurant_id=${restaurantId}`;
    }
    return this.http.get<any[]>(url);
  }

   getMaxReservations(restaurantId:number | null): Observable<any[]> {
    let url = `${environment.apiUrl}/get_max_reservations`;
    if (restaurantId) {
      url += `?restaurant_id=${restaurantId}`;
    }
    return this.http.get<any[]>(url);
  }

  getReservationById(id: number): Observable<any> {
    const url = `${environment.apiUrl}/get_reservation_by_id/${id}`;
    return this.http.get<any>(url);
  }

  deleteReservation(id: number): Observable<any> {
    const url = `${environment.apiUrl}/delete_reservation/${id}`;
    return this.http.delete<any>(url);
  }

  updateReservation(id: number, parametre: any): Observable<any> {
    const url = `${environment.apiUrl}/update_reservation/${id}`;
    return this.http.put<any>(url, parametre);
  }

  getReservationDatasBySocieteId(societeID:number | null): Observable<ReservationDatasResponse> {
    let url = `${environment.apiUrl}/get_reservation_datas_by_societeID/${societeID}`;
    
    return this.http.get<ReservationDatasResponse>(url);
  }

  getCommandeDatasBySocieteId(societeID:number | null): Observable<CommandeDatasResponse> {
    let url = `${environment.apiUrl}/get_commande_datas_by_societeID/${societeID}`;
    
    return this.http.get<CommandeDatasResponse>(url);
  }

  getStripePaymentLinkForReservation(restaurantId:number | null, datas: any): Observable<any> {
    let url = `${environment.apiUrl}/get_stripe_payment_link_for_reservation/${restaurantId}`;
    return this.http.post<any>(url, datas);
  }

  getStripePaymentLinkForCommande(restaurantId:number | null, datas: any): Observable<any> {
    let url = `${environment.apiUrl}/get_stripe_payment_link_for_commande/${restaurantId}`;
    return this.http.post<any>(url, datas);
  }

  ajouterTypeCuisine(userData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/ajouter_type_cuisine`, userData);
  }

  getTypesCuisine(restaurantId:number | null): Observable<any[]> {
    let url = `${environment.apiUrl}/get_all_types_cuisine`;
    if (restaurantId) {
      url += `?restaurant_id=${restaurantId}`;
    }
    return this.http.get<any[]>(url);
  }

  getTypeCuisineById(id: number): Observable<any> {
    const url = `${environment.apiUrl}/get_type_cuisine_by_id/${id}`;
    return this.http.get<any>(url);
  }

  deleteTypeCuisine(id: number): Observable<any> {
    const url = `${environment.apiUrl}/delete_type_cuisine/${id}`;
    return this.http.delete<any>(url);
  }

  updateTypeCuisine(id: number, parametre: any): Observable<any> {
    const url = `${environment.apiUrl}/update_type_cuisine/${id}`;
    return this.http.put<any>(url, parametre);
  }

  ajouterZoneRestaurant(userData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/ajouter_zone_table`, userData);
  }

  getZonesRestaurant(restaurantId:number | null): Observable<any[]> {
    let url = `${environment.apiUrl}/get_all_zones_table`;
    if (restaurantId) {
      url += `?restaurant_id=${restaurantId}`;
    }
    return this.http.get<any[]>(url);
  }

  getZoneRestaurantById(id: number): Observable<any> {
    const url = `${environment.apiUrl}/get_zone_table_by_id/${id}`;
    return this.http.get<any>(url);
  }

  deleteZoneRestaurant(id: number): Observable<any> {
    const url = `${environment.apiUrl}/delete_zone_table/${id}`;
    return this.http.delete<any>(url);
  }

  updateZoneRestaurant(id: number, parametre: any): Observable<any> {
    const url = `${environment.apiUrl}/update_zone_table/${id}`;
    return this.http.put<any>(url, parametre);
  }

  updateNotification(id: number, parametre: any): Observable<any> {
    const url = `${environment.apiUrl}/update_notification/${id}`;
    return this.http.put<any>(url, parametre);
  }

  getNotificationById(id: number): Observable<any> {
    const url = `${environment.apiUrl}/get_notification_by_id/${id}`;
    return this.http.get<any>(url);
  }

  getAllNotificationsByUserID(userID:number | null): Observable<any[]> {
    let url = `${environment.apiUrl}/get_all_notifications_by_id/${userID}`;
    return this.http.get<any[]>(url);
  }

  getAllUnreadNotificationsByUserID(userID:number | null,max:number): Observable<any[]> {
    let url = `${environment.apiUrl}/get_all_unread_notifications_by_id/${userID}/${max}`;
    return this.http.get<any[]>(url);
  }

  getAllStatistiques(): Observable<any[]> {
    let url = `${environment.apiUrl}/get_all_statistiques`;
    return this.http.get<any[]>(url);
  }

  ajouterMenu(userData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/ajouter_menu`, userData);
  }

  getMenus(restaurantId:number | null): Observable<any[]> {
    let url = `${environment.apiUrl}/get_all_menus`;
    if (restaurantId) {
      url += `?restaurant_id=${restaurantId}`;
    }
    return this.http.get<any[]>(url);
  }

  getMenuById(id: number): Observable<any> {
    const url = `${environment.apiUrl}/get_menu_by_id/${id}`;
    return this.http.get<any>(url);
  }

  deleteMenu(id: number): Observable<any> {
    const url = `${environment.apiUrl}/delete_menu/${id}`;
    return this.http.delete<any>(url);
  }

  updateMenu(id: number, parametre: any): Observable<any> {
    const url = `${environment.apiUrl}/update_menu/${id}`;
    return this.http.put<any>(url, parametre);
  }

  ajouterCommande(payload: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/ajouter_commande`, payload);
  }

  ajouterCategorieVariation(userData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/ajouter_categorie_variation`, userData);
  }

  getCategorieVariations(restaurantId:number | null): Observable<any[]> {
    let url = `${environment.apiUrl}/get_all_categorie_variations`;
    if (restaurantId) {
      url += `?restaurant_id=${restaurantId}`;
    }
    return this.http.get<any[]>(url);
  }

  getCategorieVariationById(id: number): Observable<any> {
    const url = `${environment.apiUrl}/get_categorie_variation_by_id/${id}`;
    return this.http.get<any>(url);
  }

  deleteCategorieVariation(id: number): Observable<any> {
    const url = `${environment.apiUrl}/delete_categorie_variation/${id}`;
    return this.http.delete<any>(url);
  }

  updateCategorieVariation(id: number, parametre: any): Observable<any> {
    const url = `${environment.apiUrl}/update_categorie_variation/${id}`;
    return this.http.put<any>(url, parametre);
  }

  getCommandes(restaurantId:number | null): Observable<any[]> {
    let url = `${environment.apiUrl}/get_all_commandes`;
    if (restaurantId) {
      url += `?restaurant_id=${restaurantId}`;
    }
    return this.http.get<any[]>(url);
  }
  

  getMaxCommandes(restaurantId:number | null): Observable<any[]> {
    let url = `${environment.apiUrl}/get_max_commandes`;
    if (restaurantId) {
      url += `?restaurant_id=${restaurantId}`;
    }
    return this.http.get<any[]>(url);
  }

  getCommandeById(id: number): Observable<any> {
    const url = `${environment.apiUrl}/get_commande_by_id/${id}`;
    return this.http.get<any>(url);
  }

  deleteCommande(id: number): Observable<any> {
    const url = `${environment.apiUrl}/delete_commande/${id}`;
    return this.http.delete<any>(url);
  }

  updateCommande(id: number, parametre: any): Observable<any> {
    const url = `${environment.apiUrl}/update_commande/${id}`;
    return this.http.put<any>(url, parametre);
  }

   updateFormuleCommande(id: number,): Observable<any> {
    const url = `${environment.apiUrl}/update_formule_commande/${id}`;
    return this.http.put<any>(url,null);
  }


  ajouterAvis(userData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/ajouter_avis`, userData);
  }
  getAvis(restaurantId:number | null): Observable<any[]> {
    let url = `${environment.apiUrl}/get_all_avis`;
    if (restaurantId) {
      url += `?restaurant_id=${restaurantId}`;
    }
    return this.http.get<any[]>(url);
  }
  getAvisReservationById(id: number): Observable<any> {
    const url = `${environment.apiUrl}/get_avis_reservation_by_id/${id}`;
    return this.http.get<any>(url);
  }
  getAvisCommandeById(id: number): Observable<any> {
    const url = `${environment.apiUrl}/get_avis_commande_by_id/${id}`;
    return this.http.get<any>(url);
  }
  deleteAvis(id: number): Observable<any> {
    const url = `${environment.apiUrl}/delete_avis/${id}`;
    return this.http.delete<any>(url);
  }
  getAvisById(id: number): Observable<any> {
    const url = `${environment.apiUrl}/get_avis_by_id/${id}`;
    return this.http.get<any>(url);
  }
  updateAvis(id: number, data: any): Observable<any> {
    const url = `${environment.apiUrl}/update_avis/${id}`;
    return this.http.put<any>(url, data);
  }
  getPaiements(restaurantId:number | null): Observable<any[]> {
    let url = `${environment.apiUrl}/get_all_paiements`;
    if (restaurantId) {
      url += `?restaurant_id=${restaurantId}`;
    }
    return this.http.get<any[]>(url);
  }
  getPaniers(restaurantId:number | null): Observable<any[]> {
    let url = `${environment.apiUrl}/get_all_paniers`;
    if (restaurantId) {
      url += `?restaurant_id=${restaurantId}`;
    }
    return this.http.get<any[]>(url);
  }

  ajouterLivraison(userData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/ajouter_livraison`, userData);
  }
  getLivraisons(restaurantId:number | null): Observable<any[]> {
    let url = `${environment.apiUrl}/get_all_livraisons`;
    if (restaurantId) {
      url += `?restaurant_id=${restaurantId}`;
    }
    return this.http.get<any[]>(url);
  }
  deleteLivraison(id: number): Observable<any> {
    const url = `${environment.apiUrl}/delete_livraison/${id}`;
    return this.http.delete<any>(url);
  }
  getLivraisonById(id: number): Observable<any> {
    const url = `${environment.apiUrl}/get_livraison_by_id/${id}`;
    return this.http.get<any>(url);
  }
  updateLivraison(id: number, data: any): Observable<any> {
    const url = `${environment.apiUrl}/update_livraison/${id}`;
    return this.http.put<any>(url, data);
  }
  




}
