import { Component } from '@angular/core';
import { RestaurantService } from '../../../../../shared/services/user/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tuesday',
  imports: [CommonModule],
  templateUrl: './tuesday.html',
  styleUrl: './tuesday.scss',
})
export class Tuesday {


      ngOnInit(): void {
        this.get_all_stats()
      }
      constructor(private restaurantService: RestaurantService, ) {}
      
      stats:any
      get_all_stats(){
  
        this.restaurantService.getStatsHome().subscribe(res => {
          this.stats = res;
        });
        
      }
  
      get_status_class(totalprice: number) {
        if (totalprice > 400) {
          return 'danger';
        } else if (totalprice > 200) {
          return 'tertiary';
        } else if (totalprice > 100) {
          return 'secondary';
        } else if (totalprice > 50) {
          return 'info';
        } else {
          return 'primary';
        }
      }
  
  
}
