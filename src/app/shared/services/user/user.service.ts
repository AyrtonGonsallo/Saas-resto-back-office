import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private restaurantIdSubject = new BehaviorSubject<number | null>(null);

  restaurantId$ = this.restaurantIdSubject.asObservable();

  setRestaurant(id: number | null) {
    this.restaurantIdSubject.next(id);

    //  persistance (optionnel)
    localStorage.setItem('restaurant_id', id ? id.toString() : '');
  }

  clearRestaurant() {
    this.restaurantIdSubject.next(null);
    localStorage.removeItem('restaurant_id');
  }

  getRestaurant() {
    this.loadFromStorage()
    return this.restaurantIdSubject.value;
  }

  loadFromStorage() {
    const id = localStorage.getItem('restaurant_id');
    if (id) {
      this.restaurantIdSubject.next(Number(id));
    }
  }

  getUser():any {
     
      let stored = localStorage.getItem('user');
      let user = stored?JSON.parse(stored):null  ;
    return user;

  }
}