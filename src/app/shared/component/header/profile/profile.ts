import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { ClickOutsideDirective } from '../../../directives/outside.directive';
import { AuthSaasRestoService } from '../../../services/auth/auth-saas-resto.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [RouterModule, ClickOutsideDirective,CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  public profile: boolean = false;
  private router = inject(Router);
  user:any

   constructor(private authSerivce:AuthSaasRestoService) {
      this.user = this.authSerivce.getUser();
      console.log('user recuperé',this.user )
    }

  open() {
    this.profile = !this.profile;
  }

  clickOutside(): void {
    this.profile = false;
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
