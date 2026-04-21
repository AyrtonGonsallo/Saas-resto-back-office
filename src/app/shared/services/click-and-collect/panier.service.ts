import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

    panier: any[] = [];

    ajouter_produit(produit: any, form: any) {

        const productId = produit.id;

        const existing = this.panier.find(p =>
            p.productId === productId && p.variations.length === 0
        );

        if (existing) {
            existing.quantite = form.quantite;
        } else {
            this.panier.push({
            productId,
            titre: form.titre,
            quantite: form.quantite,
            prix_ht: parseFloat(form.prix_ht),
            tva: parseFloat(form.tva),
            variations: []
            });
        }

        this.savePanier();
        return true
    }

    ajouter_variation(produit: any, form: any) {

        const productId = produit.id;

        // transformer variations proprement
        const variations: any[] = [];

        Object.keys(form.variations).forEach(categorieId => {

            const raw = form.variations[categorieId];

            if (!raw) return;

            // ton format actuel "id:prix:titre"
            const [id, prix, titre] = raw.split(':');

            variations.push({
            id: parseInt(id),
            prix_supplement: parseFloat(prix),
            titre
            });

        });

        const item = {
            productId,
            titre: form.titre,
            quantite: form.quantite,
            prix_ht: parseFloat(form.prix_ht),
            tva: parseFloat(form.tva),
            variations
        };

        // trouver index au lieu de find
        const index = this.panier.findIndex(p =>
            p.productId === productId 
        );

        if (index !== -1) {
            // ✅ écrasement complet
            this.panier[index] = item;
        } else {
            this.panier.push(item);
        }

        this.savePanier();
        return true
    }

    compareVariations(v1: any[], v2: any[]) {

        if (v1.length !== v2.length) return false;

        const sortFn = (a: any, b: any) => a.id - b.id;

        const sorted1 = [...v1].sort(sortFn);
        const sorted2 = [...v2].sort(sortFn);

        return JSON.stringify(sorted1) === JSON.stringify(sorted2);
    }

    retirer_produit(productId: number) {

        console.log('retrait de ', productId);

        const index = this.panier.findIndex(p =>
            p.productId === productId 
        );

        if (index !== -1) {
            this.panier.splice(index, 1);
        }

        this.savePanier();
        return true
    }

    savePanier() {
        localStorage.setItem('panier', JSON.stringify(this.panier));
    }

    loadPanier() {
        const data = localStorage.getItem('panier');
        this.panier = data ? JSON.parse(data) : [];
    }

    isProduitDansPanier(productId: number): boolean {

        return this.panier.some(p =>
            p.productId === productId 
        );

    }

    getTotal() {

        let total = 0;

        this.panier.forEach(item => {

            let prix = item.prix_ht;

            item.variations.forEach((v: any) => {
            prix += v.prix;
            });

            total += prix * item.quantite;

        });

        return total;
    }
    

    getTotalElements() {

        let total = this.panier.length

        return total;
    }

    getElementDatas(pid: number) {
        return this.panier.find(p => p.productId === pid);
    }
    get_panier(){
        return  this.panier;
    }
  
}