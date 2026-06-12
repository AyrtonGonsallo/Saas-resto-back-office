import { Component } from '@angular/core';
import { AuthSaasRestoService } from '../../../../shared/services/auth/auth-saas-resto.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environment';

@Component({
  selector: 'app-top-card',
  imports: [CommonModule],
  templateUrl: './top-card.html',
  styleUrl: './top-card.scss',
})
export class TopCard {

  user:any
cleanInterface = environment.cleanInterface
  constructor(private authSerivce:AuthSaasRestoService) {
    this.user = this.authSerivce.getUser();
    console.log('user recuperé',this.user )
  }

}
