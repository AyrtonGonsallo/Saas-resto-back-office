import { Component } from '@angular/core';

import { NgApexchartsModule } from 'ng-apexcharts';

import { investing } from '../../../../shared/data/dashboard/default/default-charts';
import { ClickOutsideDirective } from '../../../../shared/directives/outside.directive';
import { RestaurantService } from '../../../../shared/services/user/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-investing',
  imports: [NgApexchartsModule, ClickOutsideDirective,CommonModule],
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

  series:any
  categories:any
   constructor(private restaurantService: RestaurantService, ) {}
      
      ngOnInit(): void {
        this.get_all_stats()
        this.investingChart.fill.colors =  ['#3eb920', '#8b3535', '#FD7E40']
        
         
      }
      
      stats:any
      get_all_stats(){
  
        this.restaurantService.getStatsHome().subscribe(res => {
          this.stats = res;
          this.load_datas()
        });
        
      }

      load_datas(){
        
        const data = Object.values(this.stats.ca_par_societes || {});
        console.log('data',data)

        // sociétés
        const categories = data.map((s: any) => s.titre);
        console.log(categories)


         const series = [{
          name: 'Chiffres',
          data: data.map((s: any) => Number(s.total || 0))
        }];

       
        console.log(series)


        

        this.investingChart.series = series;

        this.investingChart.xaxis.categories = categories;
        
      }

       getPriority(): number {
         return this.restaurantService.getUser().datas.Role?.priorite;
        }

        canViewAdminBlocks(): boolean {
          const p = this.getPriority();
         return p < 8;
        }
  
    
}
