import { Component } from '@angular/core';

import { ButtonsDescription } from './buttons-description/buttons-description';
import { ButtonsSize } from './buttons-size/buttons-size';
import { ButtonsStyle } from './buttons-style/buttons-style';

@Component({
  selector: 'app-buttons',
  imports: [ButtonsStyle, ButtonsSize, ButtonsDescription],
  templateUrl: './buttons.html',
  styleUrl: './buttons.scss',
})
export class Buttons {}
