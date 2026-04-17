// environment.ts

export const environment = {
    production: true,
    apiUrl: 'http://localhost:2026/api/v1', // URL de l'API locale
    //apiUrl: 'https://api.resto.orocom.io/api/v1', // URL de l'API sur le dev
    //apiUrl: 'https://api.resto.orocom.io/api/v1', // URL de l'API en prod
    

    imagesUrl: 'http://localhost:2026/api/v1/files/', // URL des images de l'API locale
    //imagesUrl: 'https://api.resto.orocom.io/api/v1/files/', // URL des images de l'API sur le dev
    //imagesUrl: 'https://api.resto.orocom.io/api/v1/files/', // URL des images de l'API sur le prod


    assetsUrl: 'https://resto.orocom.io/assets/', // URL de assets sur le dev

    url_de_retour:"https://resto.orocom.io/",

    //site_url:"https://resto.orocom.io/",
    site_url:"http://localhost:4400/",

    //reservation_url:"https://resto.orocom.io/reservations/formulaire-reservation/",
    reservation_url:"http://localhost:4400/reservations/formulaire-reservation/",

    //click_and_collect_url:"https://resto.orocom.io/click-and-collects/formulaire-click-and-collect/",
    click_and_collect_url:"http://localhost:4400/click-and-collects/formulaire-click-and-collect/",


  
    //stripePublicKey:'pk_test_51R1pR3EDZMIS8WcN1uhuqtPviA3Dd8pEF4zJXY81VSTzZ70jGXGhLjavOwfXgkC3FI0fgF4ENGdcdIosDGFrUF4S00Z8IjZq4N',
    //stripePrivateKey:'sk_test_51R1pR3EDZMIS8WcNRA3mfHVgdM9I7UzIimfm00XwUcHMVeAu3jUIy2EFKtESsm9Ees8hCwO7j7SIuYFXqvdMOO0V00O02dyg9A'
  };
