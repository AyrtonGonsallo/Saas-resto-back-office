import { Component, input } from '@angular/core';

import { NgApexchartsModule } from 'ng-apexcharts';

import { investment } from '../../../../shared/data/dashboard/default/default-charts';
import { ClickOutsideDirective } from '../../../../shared/directives/outside.directive';
import { RestaurantService } from '../../../../shared/services/user/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-total-investment',
  imports: [ClickOutsideDirective, NgApexchartsModule,CommonModule],
  templateUrl: './total-investment.html',
  styleUrl: './total-investment.scss',
})
export class TotalInvestment {
  public readonly investment = input<boolean>(true);

  public Investmentchart = investment;
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
        //  this.investingChart.fill.colors =  ['#3eb920', '#8b3535', '#FD7E40']
          
           
        }
        
        stats:any
        get_all_stats(){
    
          this.restaurantService.getStatsHome().subscribe(res => {
            this.stats = res;
            this.load_datas()
          });
          
        }
  
        load_datas(){
          
          const data = Object.values(this.stats.ca_par_restaurants || {});
          console.log('data',data)
  
          // sociétés
          const categories = data.map((r: any) => r.nom);
          console.log(categories)
  
  
           const series = data.map((r: any) => Number(r.total || 0));
  
         
          console.log('series',series)

          this.Investmentchart.series = series
          this.Investmentchart.yaxis.labels={
            formatter: function (val: number) {
              return '$ ' + val;
            },
          }
          this.Investmentchart.tooltip.y={
            formatter: function (val: number) {
              return '$ ' + val;
            },
          }
  
  
          
        }
}
