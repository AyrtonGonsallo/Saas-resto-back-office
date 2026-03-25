import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { defaultRedio } from '../../../../shared/data/form-controls/checkbox-radio';

@Component({
  selector: 'app-default-radio',
  imports: [FormsModule],
  templateUrl: './default-radio.html',
  styleUrl: './default-radio.scss',
})
export class DefaultRadio {
  public redio = defaultRedio;
}
