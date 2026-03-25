import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-common-login-form',
  imports: [RouterModule],
  templateUrl: './common-login-form.html',
  styleUrl: './common-login-form.scss',
})
export class CommonLoginForm {
  public show: boolean = false;

  showPassword() {
    this.show = !this.show;
  }
}
