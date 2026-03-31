import { CommonModule, SlicePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { Bookmark } from './bookmark/bookmark';
import { Cart } from './cart/cart';
import { Language } from './language/language';
import { Messages } from './messages/messages';
import { Notification } from './notification/notification';
import { Profile } from './profile/profile';
import { Search } from './search/search';
import { Theme } from './theme/theme';
import { LayoutService } from '../../services/layout.service';
import { NavmenuService, Menu } from '../../services/navmenu.service';
import { SvgIcon } from '../svg-icon/svg-icon';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthSaasRestoService } from '../../services/auth/auth-saas-resto.service';
import { RestaurantService } from '../../services/user/user.service';

@Component({
  selector: 'app-header',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    Theme,
    Search,
    CommonModule,
    NgSelectModule, NgbModule,
    Notification,
    Profile,
    Messages,
    Language,
    SvgIcon,
    SlicePipe,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  public menuItems: Menu[] = [];
  public item: Menu[] = [];
  public open = false;
  public searchResult: boolean = false;
  public searchResultEmpty: boolean = false;
  public text: string = '';
  public show = false;
  public navmenu = inject(NavmenuService);
  public layout = inject(LayoutService);
  user:any

  restaurants : any[];

  idRestaurantChoisi: number|null;

  onChangeRestaurant(data:any) {
    if(data){
      console.log('restaurant choisi : ',data.id,data.nom)
      this.restaurantService.setRestaurant(data.id);
    }else{
      console.log('Pas de restaurant choisi : ',data)
      this.restaurantService.clearRestaurant();
    }
     window.location.reload();
  }

  constructor(private authSerivce:AuthSaasRestoService,private restaurantService: RestaurantService) {
    this.navmenu.item.subscribe((menuItems: Menu[]) => (this.item = menuItems));
     this.user = this.authSerivce.getUser();
      console.log('user recuperé',this.user )
      this.restaurants = this.user?.datas?.Restaurants
      this.idRestaurantChoisi = restaurantService.getRestaurant()
      console.log("resto choisi",this.idRestaurantChoisi)
  }

  openMenu() {
    this.navmenu.closeSidebar = !this.navmenu.closeSidebar;
  }
  openSearch() {
    this.show = !this.show;
    this.searchResult = false;
  }

  languageToggle() {
    this.navmenu.language = !this.navmenu.language;
  }

  searchTerm(term: string) {
    term ? this.addFix() : this.removeFix();
    if (!term) return (this.menuItems = []);
    let items: Menu[] = [];
    term = term.toLowerCase();
    this.item.forEach(data => {
      if (data.title?.toLowerCase().includes(term) && data.type === 'link') {
        items.push(data);
      }
      data.children?.filter(subItems => {
        if (subItems.title?.toLowerCase().includes(term) && subItems.type === 'link') {
          subItems.icon = data.icon;
          items.push(subItems);
        }
        subItems.children?.filter(suSubItems => {
          if (suSubItems.title?.toLowerCase().includes(term)) {
            suSubItems.icon = data.icon;
            items.push(suSubItems);
          }
        });
        return;
      });
      this.checkSearchResultEmpty(items);
      this.menuItems = items;
    });
    return;
  }

  checkSearchResultEmpty(items: Menu[]) {
    if (!items.length) this.searchResultEmpty = true;
    else this.searchResultEmpty = false;
  }

  addFix() {
    this.searchResult = true;
    document.body.classList.add('offcanvas');
  }

  removeFix() {
    this.searchResult = false;
    this.text = '';
    document.body.classList.remove('offcanvas');
  }

  clickOutside(): void {
    this.show = false;
    this.open = false;
    this.searchResult = false;
    this.searchResultEmpty = false;
    this.navmenu.language = false;
  }
}
