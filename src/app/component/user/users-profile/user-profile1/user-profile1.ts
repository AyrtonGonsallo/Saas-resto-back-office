import { Component } from '@angular/core';
import { AuthSaasRestoService } from '../../../../shared/services/auth/auth-saas-resto.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile1',
  imports: [CommonModule],
  templateUrl: './user-profile1.html',
  styleUrl: './user-profile1.scss',
})
export class UserProfile1 {
  user:any
  
  constructor(private authSerivce:AuthSaasRestoService) {
    this.user = this.authSerivce.getUser();
    console.log('user recuperé',this.user )
  }
}
