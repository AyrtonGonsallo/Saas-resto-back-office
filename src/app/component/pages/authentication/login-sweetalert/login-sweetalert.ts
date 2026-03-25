import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonLoginForm } from '../common-login-form/common-login-form';

@Component({
  selector: 'app-login-sweetalert',
  imports: [RouterModule, CommonLoginForm],
  templateUrl: './login-sweetalert.html',
  styleUrl: './login-sweetalert.scss',
})
export class LoginSweetalert {}
