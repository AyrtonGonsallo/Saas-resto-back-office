import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { basicCheckbox, simpleRadio } from '../../../../shared/data/form-controls/checkbox-radio';

@Component({
  selector: 'app-basic-radio-checkbox',
  imports: [FormsModule],
  templateUrl: './basic-radio-checkbox.html',
  styleUrl: './basic-radio-checkbox.scss',
})
export class BasicRadioCheckbox {
  public basicItem = basicCheckbox;
  public radioData = simpleRadio;
}
