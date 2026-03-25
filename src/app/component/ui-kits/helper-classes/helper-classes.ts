import { Component } from '@angular/core';

import { BorderColor } from './border-color/border-color';
import { BorderDisplays } from './border-displays/border-displays';
import { FontSize } from './font-size/font-size';
import { FontStyle } from './font-style/font-style';
import { FontWeight } from './font-weight/font-weight';
import { ImagesSizes } from './images-sizes/images-sizes';
import { StylesBackgroud } from './styles-backgroud/styles-backgroud';
import { StylesBorders } from './styles-borders/styles-borders';
import { TextColor } from './text-color/text-color';

@Component({
  selector: 'app-helper-classes',
  imports: [
    BorderColor,
    FontSize,
    FontStyle,
    FontWeight,
    ImagesSizes,
    StylesBackgroud,
    StylesBorders,
    TextColor,
    BorderDisplays,
  ],
  templateUrl: './helper-classes.html',
  styleUrl: './helper-classes.scss',
})
export class HelperClasses {}
