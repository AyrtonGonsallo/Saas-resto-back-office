import { Component } from '@angular/core';
import { RestaurantService } from '../../../../../shared/services/user/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-monday',
  imports: [CommonModule],
  templateUrl: './monday.html',
  styleUrl: './monday.scss',
})
export class Monday {

   
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

    get_status_class(role_priority:number){
      let res = ''
      switch (role_priority) {
        case 1:
          res = 'primary'
          break;
        case 2:
          res = 'primary'
          break;
        case 3:
          res = 'tertiary'
          break;
        case 4:
          res = 'secondary'
          break;
        case 5:
          res = 'danger'
          break;
        case 6:
          res = 'info'
          break;
        case 7:
          res = 'danger'
          break;
        case 8:
          res = 'danger'
          break;
      
        default:
          res = 'primary'
          break;
      }
      return res

    }

  
}
