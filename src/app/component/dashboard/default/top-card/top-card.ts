import { Component } from '@angular/core';
import { AuthSaasRestoService } from '../../../../shared/services/auth/auth-saas-resto.service';

@Component({
  selector: 'app-top-card',
  imports: [],
  templateUrl: './top-card.html',
  styleUrl: './top-card.scss',
})
export class TopCard {

  user:any

  constructor(private authSerivce:AuthSaasRestoService) {
    this.user = this.authSerivce.getUser();
    console.log('user recuperé',this.user )
  }

}
