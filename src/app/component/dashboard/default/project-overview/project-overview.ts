import { Component } from '@angular/core';

import { Feathericon } from '../../../../shared/component/feathericon/feathericon';
import { ClickOutsideDirective } from '../../../../shared/directives/outside.directive';
import { RestaurantService } from '../../../../shared/services/user/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-overview',
  imports: [ClickOutsideDirective, Feathericon,CommonModule],
  templateUrl: './project-overview.html',
  styleUrl: './project-overview.scss',
})
export class ProjectOverview {
  public isopen: boolean = false;
  public isopen2: boolean = false;
  user:any
  is_super_admin=false

  open() {
    this.isopen = !this.isopen;
  }
  open2() {
    this.isopen2 = !this.isopen2;
  }

  clickOutside(): void {
    this.isopen = false;
    this.isopen2 = false;
  }

  constructor(private restaurantService: RestaurantService, ) {}
    
    ngOnInit(): void {
      this.get_all_stats()
      this.user = this.restaurantService.getUser()
      this.is_super_admin=(this.user.datas.Role.priorite==1)
    }
    
    stats:any
    get_all_stats(){

      this.restaurantService.getStatsHome().subscribe(res => {
        this.stats = res;
        console.log('this.stats',this.stats)
      });
      
    }

    getPourcentage(part: number, total: number): number {
      if (!total || total === 0) return 0;
      return Math.round((part / total) * 100);
    }
}
