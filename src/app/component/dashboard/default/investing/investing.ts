import { Component } from '@angular/core';

import { NgApexchartsModule } from 'ng-apexcharts';

import { investing } from '../../../../shared/data/dashboard/default/default-charts';
import { ClickOutsideDirective } from '../../../../shared/directives/outside.directive';
import { RestaurantService } from '../../../../shared/services/user/user.service';

@Component({
  selector: 'app-investing',
  imports: [NgApexchartsModule, ClickOutsideDirective],
  templateUrl: './investing.html',
  styleUrl: './investing.scss',
})
export class Investing {
  public investingChart = investing;
  public isopen: boolean = false;

  open() {
    this.isopen = !this.isopen;
  }

  clickOutside(): void {
    this.isopen = false;
  }
   constructor(private restaurantService: RestaurantService, ) {}
      
      ngOnInit(): void {
        this.get_all_stats()
        this.investingChart.series=[
          {
            name: 'Resto 1',
            data: [200, 120, 280, 80, ],
          }
        ]

        this.investingChart.fill.colors =  ['#3eb920', '#8b3535', '#FD7E40']
         this.investingChart.xaxis.categories = [
          'Sun',
          '',
          'Mon',
          '',
          '',
          'Tue',
          '',
          '',
          'Wed',
          '',
          '',
          'Thu',
          '',
          'Fri',
          '',
          'Sat',
        ]
      }
      
      stats:any
      get_all_stats(){
  
        this.restaurantService.getStatsHome().subscribe(res => {
          this.stats = res;
        });
        
      }
  
    
}
