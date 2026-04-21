import { NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { LayoutService } from '../../services/layout.service';
import { Menu, NavmenuService } from '../../services/navmenu.service';
import { Feathericon } from '../feathericon/feathericon';
import { SvgIcon } from '../svg-icon/svg-icon';
import { environment } from '../../../environment';

@Component({
  selector: 'app-sidebar',
  imports: [NgbModule, Feathericon, SvgIcon, RouterModule, TranslateModule, NgTemplateOutlet],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  public navServices = inject(NavmenuService);
  public layout = inject(LayoutService);
  private router = inject(Router);
  //public menuItems = this.navServices.MENUITEMS;
  public menuItems: Menu[] = [];
  public margin: number = 0;
  public width: number = window.innerWidth;
  public leftArrowNone: boolean = true;
  public rightArrowNone: boolean = false;
  public screenWidth!: number;
  public screenHeight!: number;
  public pined: boolean = false;
  public pinedItem: number[] = [];
  public userRole: string = '';

  constructor() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userRole = user?.datas?.Role?.type;
    console.log('ROLE =', this.userRole);
    if (window.innerWidth < 1185) {
      this.navServices.closeSidebar = true;
    }
    this.navServices.item.subscribe((menuItems: Menu[]) => {
      this.menuItems = this.filterMenuByRole(menuItems);
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          menuItems.filter(items => {
            if (items.path === event.url) {
              this.setNavActive(items);
            }
            if (!items.children) {
              return false;
            }
            items.children.filter((subItems: Menu) => {
              if (subItems.path === event.url) {
                this.setNavActive(subItems);
              }
              if (!subItems.children) {
                return false;
              }
              subItems.children.filter(subSubItems => {
                if (subSubItems.path === event.url) {
                  this.setNavActive(subSubItems);
                }
              });
              return;
            });
            return;
          });
        }
      });
    });
  }

  setNavActive(item: Menu) {
    this.menuItems.filter(menuItem => {
      if (menuItem !== item) {
        menuItem.active = false;
      }
      if (menuItem.children && menuItem.children.includes(item)) {
        menuItem.active = true;
      }
      if (menuItem.children) {
        menuItem.children.filter(submenuItems => {
          if (submenuItems.children && submenuItems.children.includes(item)) {
            menuItem.active = true;
            submenuItems.active = true;
          } else {
            submenuItems.active = false;
          }
        });
      }
    });
  }

  toggleMenu(item: Menu) {
    if (!item.active) {
      this.menuItems.forEach((a: Menu) => {
        if (this.menuItems.includes(item)) {
          a.active = false;
        }
        if (!a.children) {
          return false;
        }
        a.children.forEach((b: Menu) => {
          if (a.children?.includes(item)) {
            b.active = false;
          }
        });
        return;
      });
    }
    item.active = !item.active;
  }

  scrollToLeft() {
    if (this.margin >= -this.width) {
      this.margin = 0;
      this.leftArrowNone = true;
      this.rightArrowNone = false;
    } else {
      this.margin += this.width;
      this.rightArrowNone = false;
    }
  }

  scrollToRight() {
    if (this.margin <= -3700) {
      this.margin = -3200;
      this.leftArrowNone = false;
      this.rightArrowNone = true;
    } else {
      this.margin += -this.width;
      this.leftArrowNone = false;
    }
  }

  isPined(itemid: number) {
    return this.pinedItem.includes(itemid);
  }

  togglePined(id: number): void {
    const index = this.pinedItem.indexOf(id);
    if (index !== -1) {
      this.pinedItem.splice(index, 1);
    } else {
      this.pinedItem.push(id);
    }
    if (this.pinedItem.length <= 0) {
      this.pined = false;
    } else {
      this.pined = true;
    }
  }

  filterMenuByRole(menu: Menu[]): Menu[] {
  return menu
    .map(item => {
      if (item.children) {
        item.children = this.filterMenuByRole(item.children);
      }
      return item;
    })
    .filter(item => {
      // 1. si pas de roles → visible pour tous
      if (!item.roles) return true;

      // 2. sinon vérifier rôle
      if (!item.roles.includes(this.userRole)) return false;

      // 3. cacher parent si enfants supprimés
      if (item.children && item.children.length === 0) return false;

      return true;
    });
}
}
