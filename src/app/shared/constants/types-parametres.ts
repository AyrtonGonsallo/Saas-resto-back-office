export const  types = [
    { key: 'tva', name: 'Tva' },
    { key: 'coefficient', name: 'Coefficient' },
    { key: 'max_commandes_par_minutes', name: 'Max commandes par minute' },
    { key: 'alerte_stocke_min', name: 'Stocke minimun avant alerte' },
    { key: 'max_couverts_par_jour', name: 'Max couverts par jour' },
    { key: 'delai_rappel_reservation', name: 'Delai avant rappel lors d\'une réservation' },
    { key: 'cle_publique_stripe', name: 'Clé publique stripe' },
    { key: 'cle_privee_stripe', name: 'Clé privée stripe' },
    { key: 'etat_des_reservations', name: 'État des réservations' },
    { key: 'etat_paiement_acompte_reservation', name: 'État du paiement de l\'acompte des réservations' },
    { key: 'montant_paiement_acompte_reservation', name: 'Montant du paiement de l\'acompte des réservations' },
    { key: 'etat_paiement_acompte_click_and_collect', name: 'État du paiement de l\'acompte du click and collect' },
    { key: 'montant_paiement_acompte_click_and_collect', name: 'Montant du paiement de l\'acompte du click and collect' },
    //{ key: 'logo', name: 'Logo' },
    //{ key: 'couleur_principale', name: 'Couleur principale' },
    //{ key: 'couleur_secondaire', name: 'Couleur secondaire' },
  ];

  export function getTypeName(key: string): string {
  const found = types.find(t => t.key === key);
  return found ? found.name : 'Inconnu';
}