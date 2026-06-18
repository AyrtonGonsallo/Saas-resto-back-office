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


export const  options_filtres = [
    { key: 'Général', name: 'Général' },
    { key: 'Réservation', name: 'Réservation' },
    { key: 'C&C', name: 'C&C' },

]


export const  types = [
    { key: 'tva', name: 'Général - Tva' },
    { key: 'coefficient', name: 'Général - Coefficient' },
    { key: 'max_commandes_par_minute', name: 'C&C - Max commandes par minute' },
    { key: 'stock_min_avant_alerte', name: 'C&C - Stock minimun avant alerte' },
    { key: 'max_couverts_par_jour', name: 'Réservation - Max couverts par jour' },
    { key: 'delai_rappel_reservation', name: 'Réservation - Delai avant rappel lors d\'une réservation' },
    { key: 'delai_msg_commande_prete', name: 'C&C - Délai avant l\'envoi du message "commande prête"' },
    { key: 'delai_annulation_reservation', name: 'Réservation - Delai avant annulation d\'une réservation' },
    { key: 'delai_invitation_avis', name: 'Réservation - Delai avant envoi du lien du formulaire d\'avis sur une réservation' },
    { key: 'cle_publique_stripe', name: 'Général - Clé publique stripe' },
    { key: 'cle_privee_stripe', name: 'Général - Clé privée stripe' },
    { key: 'etat_des_reservations', name: 'Réservation - État des réservations' },
    { key: 'etat_du_click_and_collect', name: 'C&C - État du click & collect' },
    { key: 'etat_paiement_acompte_reservation', name: 'Réservation - État du paiement de l\'acompte des réservations' },
    { key: 'montant_paiement_acompte_reservation', name: 'Réservation - Montant du paiement de l\'acompte des réservations' },
    { key: 'etat_paiement_acompte_click_and_collect', name: 'C&C - État du paiement de l\'acompte du click and collect' },
    { key: 'montant_paiement_acompte_click_and_collect', name: 'C&C - Montant du paiement de l\'acompte du click and collect' },
    { key: 'montant_livraison_click_and_collect', name: 'C&C - Montant du paiement de la livraison du click and collect' },
    { key: 'envoi_de_mail_recap_reservation', name: 'Réservation - Envoi du mail de récapitulatif sur les réservations' },
    { key: 'envoi_de_mail_recap_click_and_collect', name: 'C&C - Envoi du mail de récapitulatif sur le click and collect' },
    { key: 'livraison_click_and_collect', name: 'C&C - État de la livraison sur le click and collect' },
    {
      key: 'ecart_entre_heure_actuelle_et_heure_reservation',
      name: 'C&C - Délai minimum avant réservation'
    },
    { key: 'etat_paiement_complet_click_and_collect', name: 'C&C - État du paiement complet du click and collect' },
    {
      key: 'fusionner_les_tables_pour_reservation',
      name: 'Réservation - Fusionner les tables pour reservation'
    },
    {
      key: 'commande_a_l_avance',
      name: 'C&C - Délai minimum avant commande'
    },
    {
      key: 'delai_avant_fermetture_commandes',
      name: 'C&C - Délai maximum avant commandes'
    },
    {
      key: 'delai_avant_fermetture_reservations',
      name: 'Réservation - Délai maximum avant réservations'
    },
    {
      key: 'delai_de_preparation',
      name: 'C&C - Délai de préparation'
    },
    {
      key: 'moyen_notification',
      name: 'Général - Moyen de notification'
    },
    {
      key: 'max_commandes_par_jour',
      name: 'C&C - Nombre maximal de commandes par jour'
    },
    {
      key: 'duree_blocage_table',
      name: 'Réservation - Durée de blocage de la table'
    },
    {
      key: 'delai_annulation_automatique_de_reservation',
      name: 'Réservation - Délai avant annulation automatique d’une réservation'
    },
    {
      key: 'delai_annulation_gratuite_de_reservation',
      name: 'Réservation - Délai d’annulation gratuite d’une réservation'
    },
    {
      key: 'delai_annulation_automatique_de_commande',
      name: 'C&C - Délai avant annulation automatique d’une commande'
    },
    {
      key: 'delai_annulation_gratuite_de_commande',
      name: 'C&C - Délai d’annulation gratuite d’une commande'
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