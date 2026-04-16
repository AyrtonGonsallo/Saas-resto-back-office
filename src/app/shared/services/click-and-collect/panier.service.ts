import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

    panier: any[] = [];

    ajouter_produit(productId: number) {

        const existing = this.panier.find(p => p.productId === productId);

        if (existing) {
            existing.quantity++;
        } else {
            this.panier.push({
            productId,
            quantity: 1,
            variations: [] // à remplir plus tard si besoin
            });
        }

        this.savePanier();
    }

     ajouter_variation(productId: number,variationId: number,) {

        const existing = this.panier.find(p => p.productId === productId);

        if (existing) {
            existing.quantity++;
        } else {
            this.panier.push({
            productId,
            quantity: 1,
            variations: [] // à remplir plus tard si besoin
            });
        }

        this.savePanier();
    }

    retirer_produit(productId: number) {

        const index = this.panier.findIndex(p => p.productId === productId);

        if (index !== -1) {
            this.panier[index].quantity--;

            if (this.panier[index].quantity <= 0) {
            this.panier.splice(index, 1);
            }
        }

        this.savePanier();
    }

    savePanier() {
        localStorage.setItem('panier', JSON.stringify(this.panier));
    }

    loadPanier() {
        const data = localStorage.getItem('panier');
        this.panier = data ? JSON.parse(data) : [];
    }
  
}