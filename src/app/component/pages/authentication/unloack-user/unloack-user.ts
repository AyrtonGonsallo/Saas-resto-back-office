import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-unloack-user',
  imports: [RouterModule],
  templateUrl: './unloack-user.html',
  styleUrl: './unloack-user.scss',
})
export class UnloackUser {
  public show: boolean = false;

  constructor() {}

  showPassword() {
    this.show = !this.show;
  }
}
