import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { ClickOutsideDirective } from '../../../directives/outside.directive';

@Component({
  selector: 'app-profile',
  imports: [RouterModule, ClickOutsideDirective],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  public profile: boolean = false;
  private router = inject(Router);

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
