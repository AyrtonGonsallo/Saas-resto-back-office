import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  BorderedRadio,
  IconsRadio,
  FilledRadio,
} from '../../../../,./../shared/data/form-controls/checkbox-radio';

@Component({
  selector: 'app-custom-radio',
  imports: [FormsModule],
  templateUrl: './custom-radio.html',
  styleUrl: './custom-radio.scss',
})
export class CustomRadio {
  public borderData = BorderedRadio;
  public iconData = IconsRadio;
  public filledData = FilledRadio;
}
