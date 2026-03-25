import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-validation-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './validation-form.html',
  styleUrl: './validation-form.scss',
})
export class ValidationForm {
  public validate = false;

  public submit() {
    this.validate = !this.validate;
  }
}
