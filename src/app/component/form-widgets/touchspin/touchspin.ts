import { Component } from '@angular/core';

import { ButtonsWithPrefixPostfix } from './buttons-with-prefix-postfix/buttons-with-prefix-postfix';
import { DefaultTouchspin } from './default-touchspin/default-touchspin';
import { IconsWithPrefixPostfix } from './icons-with-prefix-postfix/icons-with-prefix-postfix';
import { OutlinedTouchspin } from './outlined-touchspin/outlined-touchspin';
import { RoundedTouchspin } from './rounded-touchspin/rounded-touchspin';

@Component({
  selector: 'app-touchspin',
  imports: [
    ButtonsWithPrefixPostfix,
    DefaultTouchspin,
    IconsWithPrefixPostfix,
    OutlinedTouchspin,
    RoundedTouchspin,
  ],
  templateUrl: './touchspin.html',
  styleUrl: './touchspin.scss',
})
export class Touchspin {}
