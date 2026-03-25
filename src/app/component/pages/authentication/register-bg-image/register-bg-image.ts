import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonRegisterForm } from '../common-register-form/common-register-form';

@Component({
  selector: 'app-register-bg-image',
  imports: [RouterModule, CommonRegisterForm],
  templateUrl: './register-bg-image.html',
  styleUrl: './register-bg-image.scss',
})
export class RegisterBgImage {}
