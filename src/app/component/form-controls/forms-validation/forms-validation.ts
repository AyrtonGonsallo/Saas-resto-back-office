import { Component } from '@angular/core';

import { Browser } from './browser/browser';
import { TooltipFormValidation } from './tooltip-form-validation/tooltip-form-validation';
import { ValidationForm } from './validation-form/validation-form';

@Component({
  selector: 'app-forms-validation',
  imports: [Browser, TooltipFormValidation, ValidationForm],
  templateUrl: './forms-validation.html',
  styleUrl: './forms-validation.scss',
})
export class FormsValidation {}
