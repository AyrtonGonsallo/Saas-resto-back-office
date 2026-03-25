import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { imageRadio } from '../../../../shared/data/form-controls/checkbox-radio';

@Component({
  selector: 'app-images-radio',
  imports: [FormsModule],
  templateUrl: './images-radio.html',
  styleUrl: './images-radio.scss',
})
export class ImagesRadio {
  public imgradioData = imageRadio;
}
