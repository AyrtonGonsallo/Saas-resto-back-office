import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  VariationRadiopayment,
  VariationsWebdesign,
  variationsIcons,
} from '../../../../shared/data/form-controls/mega-options';

@Component({
  selector: 'app-variation-radio',
  imports: [FormsModule],
  templateUrl: './variation-radio.html',
  styleUrl: './variation-radio.scss',
})
export class VariationRadio {
  public paymentData = VariationRadiopayment;
  public webdesignData = VariationsWebdesign;
  public iconsData = variationsIcons;
}
