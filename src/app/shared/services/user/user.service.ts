import { Injectable } from '@angular/core';
import { BehaviorSubject, of, tap } from 'rxjs';
import { CrudSaasRestoService } from '../api/crud-saas-resto.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  statistisques_home:any

  private restaurantIdSubject = new BehaviorSubject<number | null>(null);

  restaurantId$ = this.restaurantIdSubject.asObservable();

  constructor(private crudSaasService:CrudSaasRestoService, ) {}
  

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

  getStatsHome() {
    const stored = localStorage.getItem('statistisques_home');

    if (stored) {
      this.statistisques_home = JSON.parse(stored);
      return of(this.statistisques_home);
    }

    return this.crudSaasService.getAllStatistiques().pipe(
      tap((res: any) => {
        this.statistisques_home = res;
        localStorage.setItem('statistisques_home', JSON.stringify(res));
      })
    );
  }

  hideforuser(menupageid:number){
    let result = false
    let user = this.getUser()
    let rolePriority = user.datas.Role.priorite
    switch (menupageid) {
      case 36:
        result = rolePriority>4
        break;
    
      default:
        break;
    }
    return result


  }


}