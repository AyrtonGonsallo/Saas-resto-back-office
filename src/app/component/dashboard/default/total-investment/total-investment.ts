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

    totalGlobal:any
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
          console.log('data restaurants',data)

          this.totalGlobal = data.reduce((sum, restaurant:any) => {
            return sum + restaurant.paiements.reduce((s:any, p:any) => {
              return s + parseFloat(p.montant);
            }, 0);
          }, 0);

          console.log("TOTAL GLOBAL :", this.totalGlobal);
  
          // sociétés
          const categories = data.map((r: any) => r.nom);
          console.log(categories)
  
  
           const series = data.map((r: any) => Number(r.total || 0));
            console.log('restaurants', categories);
  
         
          console.log('series',series)

          this.categories = categories;
          this.series = series;

          this.Investmentchart.series = series
          this.Investmentchart.yaxis.labels={
            formatter: function (val: number) {
              return '€ ' + val;
            },
          }
          this.Investmentchart.tooltip = {
            y: {
              formatter: (val: number, opts: any) => {
                const index = opts.dataPointIndex;
                const name = this.categories[index];

                return name + ' : ' + val + ' €';
              }
            }
          };
  
  
          
        }

         getPriority(): number {
         return this.restaurantService.getUser().datas.Role?.priorite;
        }

        canViewAdminBlocks(): boolean {
          const p = this.getPriority();
         return p < 8;
        }
}
