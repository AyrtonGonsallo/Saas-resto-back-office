import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonLoginForm } from '../common-login-form/common-login-form';

@Component({
  selector: 'app-login-tooltip',
  imports: [RouterModule, CommonLoginForm],
  templateUrl: './login-tooltip.html',
  styleUrl: './login-tooltip.scss',
})
export class LoginTooltip {}
