import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-tooltip-form-validation',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './tooltip-form-validation.html',
  styleUrl: './tooltip-form-validation.scss',
})
export class TooltipFormValidation {
  public validate = false;
  public tooltipValidation = false;

  public submit() {
    this.validate = !this.validate;
  }

  public tooltipSubmit() {
    this.tooltipValidation = !this.tooltipValidation;
  }
}
