import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { soicaMidia, paymentData } from '../../../../shared/data/form-controls/checkbox-radio';

@Component({
  selector: 'app-animated-buttons',
  imports: [FormsModule],
  templateUrl: './animated-buttons.html',
  styleUrl: './animated-buttons.scss',
})
export class AnimatedButtons {
  public SoicalmidiaData = soicaMidia;
  public payment = paymentData;
}
