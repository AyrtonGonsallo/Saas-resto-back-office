import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonRegisterForm } from '../common-register-form/common-register-form';

@Component({
  selector: 'app-register-simple',
  imports: [RouterModule, CommonRegisterForm],
  templateUrl: './register-simple.html',
  styleUrl: './register-simple.scss',
})
export class RegisterSimple {}
