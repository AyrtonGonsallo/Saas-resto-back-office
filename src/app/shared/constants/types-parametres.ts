export const types_de_valeur = [
  { key: 'unite_temporelle', name: 'Unité temporelle' },
  { key: 'statut', name: 'Statut' },
  { key: 'numerique', name: 'Numérique' },
  { key: 'pourcentage', name: 'Pourcentage' },
  { key: 'choix_d_options', name: 'Choix d\'options' },
  { key: 'coefficient', name: 'Coefficient' },
  { key: 'jeton', name: 'Jeton' }
];

export const unites_de_temps = [
  { key: 'secondes', name: 'Secondes' },
  { key: 'minutes', name: 'Minutes' },
  { key: 'heures', name: 'Heures' },
  { key: 'jours', name: 'Jours' }
];


export const options_moyens_contact = [
  { key: 'email', name: 'Email' },
  { key: 'sms', name: 'Sms' },
  { key: 'email + sms', name: 'Email + Sms' },
];



export const  types = [
    { key: 'tva', name: 'Tva' },
    { key: 'coefficient', name: 'Coefficient' },
    { key: 'max_commandes_par_minute', name: 'Max commandes par minute' },
    { key: 'stock_min_avant_alerte', name: 'Stock minimun avant alerte' },
    { key: 'max_couverts_par_jour', name: 'Max couverts par jour' },
    { key: 'delai_rappel_reservation', name: 'Delai avant rappel lors d\'une réservation' },
    { key: 'delai_annulation_reservation', name: 'Delai avant annulation d\'une réservation' },
    { key: 'delai_invitation_avis', name: 'Delai avant envoi du lien du formulaire d\'avis sur une réservation' },
    { key: 'cle_publique_stripe', name: 'Clé publique stripe' },
    { key: 'cle_privee_stripe', name: 'Clé privée stripe' },
    { key: 'etat_des_reservations', name: 'État des réservations' },
    { key: 'etat_du_click_and_collect', name: 'État du click & collect' },
    { key: 'etat_paiement_acompte_reservation', name: 'État du paiement de l\'acompte des réservations' },
    { key: 'montant_paiement_acompte_reservation', name: 'Montant du paiement de l\'acompte des réservations' },
    { key: 'etat_paiement_acompte_click_and_collect', name: 'État du paiement de l\'acompte du click and collect' },
    { key: 'montant_paiement_acompte_click_and_collect', name: 'Montant du paiement de l\'acompte du click and collect' },
    { key: 'montant_livraison_click_and_collect', name: 'Montant du paiement de la livraison du click and collect' },
    { key: 'envoi_de_mail_recap_reservation', name: 'Envoi du mail de récapitulatif sur les réservations' },
    { key: 'envoi_de_mail_recap_click_and_collect', name: 'Envoi du mail de récapitulatif sur le click and collect' },
    { key: 'livraison_click_and_collect', name: 'État de la livraison sur le click and collect' },
    {
      key: 'ecart_entre_heure_actuelle_et_heure_reservation',
      name: 'Écart minimum entre l’heure actuelle et l’heure de réservation'
    },
    {
      key: 'commande_a_l_avance',
      name: 'Commande à l’avance'
    },
    {
      key: 'delai_avant_fermetture_commandes',
      name: 'Délai avant fermeture des commandes'
    },
    {
      key: 'delai_avant_fermetture_reservations',
      name: 'Délai avant fermeture des réservations'
    },
    {
      key: 'delai_de_preparation',
      name: 'Délai de préparation'
    },
    {
      key: 'moyen_notification',
      name: 'Moyen de notification'
    },
    {
      key: 'max_commandes_par_jour',
      name: 'Nombre maximal de commandes par jour'
    },
    {
      key: 'duree_blocage_table',
      name: 'Durée de blocage de la table'
    },
    {
      key: 'delai_annulation_automatique_de_reservation',
      name: 'Délai avant annulation automatique d’une réservation'
    },
    {
      key: 'delai_annulation_gratuite_de_reservation',
      name: 'Délai d’annulation gratuite d’une réservation'
    },
    {
      key: 'delai_annulation_automatique_de_commande',
      name: 'Délai avant annulation automatique d’une commande'
    },
    {
      key: 'delai_annulation_gratuite_de_commande',
      name: 'Délai d’annulation gratuite d’une commande'
    }

  ];


  export const  admin_only_types = [
    
    { key: 'delai_rappel_reservation', name: 'Delai avant rappel lors d\'une réservation' },
    {
      key: 'delai_annulation_automatique_de_reservation',
      name: 'Délai avant annulation automatique d’une réservation'
    },
    {
      key: 'delai_annulation_gratuite_de_reservation',
      name: 'Délai d’annulation gratuite d’une réservation'
    },
    {
      key: 'delai_annulation_automatique_de_commande',
      name: 'Délai avant annulation automatique d’une commande'
    },
    {
      key: 'delai_annulation_gratuite_de_commande',
      name: 'Délai d’annulation gratuite d’une commande'
    },
    { key: 'delai_invitation_avis', name: 'Delai avant envoi du lien du formulaire d\'avis sur une réservation' },
    { key: 'cle_publique_stripe', name: 'Clé publique stripe' },
    { key: 'cle_privee_stripe', name: 'Clé privée stripe' },
    { key: 'etat_des_reservations', name: 'État des réservations' },
    { key: 'etat_du_click_and_collect', name: 'État du click & collect' },
    { key: 'etat_paiement_acompte_reservation', name: 'État du paiement de l\'acompte des réservations' },
    { key: 'etat_paiement_acompte_click_and_collect', name: 'État du paiement de l\'acompte du click and collect' },
    { key: 'envoi_de_mail_recap_reservation', name: 'Envoi du mail de récapitulatif sur les réservations' },
    { key: 'envoi_de_mail_recap_click_and_collect', name: 'Envoi du mail de récapitulatif sur le click and collect' },
    { key: 'livraison_click_and_collect', name: 'État de la livraison sur le click and collect' },
  ];

  export function getTypeName(key: string): string {
    const found = types.find(t => t.key === key);
    return found ? found.name : 'Inconnu';
  }

   export function getAdminOnly(params: any[]): any {
    const admins_only = params.filter(item =>
      admin_only_types.some(t => t.key === item.type)
    );

    return admins_only;
  }

  export function getNotAdminOnly(params: any[]): any {
    const admins_only = params.filter(item =>
      admin_only_types.every(t => t.key != item.type)
    );

    return admins_only;
  }