import { Component } from '@angular/core';

import { Blockquotes } from './blockquotes/blockquotes';
import { ColoredHeadings } from './colored-headings/colored-headings';
import { DisplayHeading } from './display-heading/display-heading';
import { FontWeight } from './font-weight/font-weight';
import { Headings } from './headings/headings';
import { InlineTextElements } from './inline-text-elements/inline-text-elements';
import { ListingTypography } from './listing-typography/listing-typography';
import { TextColor } from './text-color/text-color';

@Component({
  selector: 'app-typography',
  imports: [
    Blockquotes,
    ColoredHeadings,
    DisplayHeading,
    FontWeight,
    Headings,
    InlineTextElements,
    ListingTypography,
    TextColor,
  ],
  templateUrl: './typography.html',
  styleUrl: './typography.scss',
})
export class Typography {}
