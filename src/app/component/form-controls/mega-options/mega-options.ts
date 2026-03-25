import { Component } from '@angular/core';

import { DefaultStyle } from './default-style/default-style';
import { HorizontalStyle } from './horizontal-style/horizontal-style';
import { InlineStyle } from './inline-style/inline-style';
import { OfferBordersStyle } from './offer-borders-style/offer-borders-style';
import { SolidBorderStyle } from './solid-border-style/solid-border-style';
import { VariationChecknox } from './variation-checknox/variation-checknox';
import { VariationRadio } from './variation-radio/variation-radio';
import { VerticalStyle } from './vertical-style/vertical-style';
import { WithoutBordersStyle } from './without-borders-style/without-borders-style';

@Component({
  selector: 'app-mega-options',
  imports: [
    DefaultStyle,
    HorizontalStyle,
    InlineStyle,
    OfferBordersStyle,
    SolidBorderStyle,
    VariationChecknox,
    VariationRadio,
    VerticalStyle,
    WithoutBordersStyle,
  ],
  templateUrl: './mega-options.html',
  styleUrl: './mega-options.scss',
})
export class MegaOptions {}
