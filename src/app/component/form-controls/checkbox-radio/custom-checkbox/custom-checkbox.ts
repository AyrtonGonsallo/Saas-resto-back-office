import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  BorderCheckbox,
  IconsCheckbox,
  FilledCheckbox,
} from '../../../../shared/data/form-controls/checkbox-radio';

@Component({
  selector: 'app-custom-checkbox',
  imports: [FormsModule],
  templateUrl: './custom-checkbox.html',
  styleUrl: './custom-checkbox.scss',
})
export class CustomCheckbox {
  public borders = BorderCheckbox;
  public icons = IconsCheckbox;
  public filled = FilledCheckbox;
}
