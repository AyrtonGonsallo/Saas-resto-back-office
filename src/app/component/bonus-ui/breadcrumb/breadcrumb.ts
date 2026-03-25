import { Component } from '@angular/core';

import { ColoredBreadcrumb } from './colored-breadcrumb/colored-breadcrumb';
import { DefaultBreadcrumb } from './default-breadcrumb/default-breadcrumb';
import { DividerBreadcrumb } from './divider-breadcrumb/divider-breadcrumb';
import { IconsBreadcrumb } from './icons-breadcrumb/icons-breadcrumb';
import { OutlineBreadcrumb } from './outline-breadcrumb/outline-breadcrumb';
import { VariationBreadcrumb } from './variation-breadcrumb/variation-breadcrumb';

@Component({
  selector: 'app-breadcrumb',
  imports: [
    ColoredBreadcrumb,
    DefaultBreadcrumb,
    DividerBreadcrumb,
    IconsBreadcrumb,
    OutlineBreadcrumb,
    VariationBreadcrumb,
  ],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.scss',
})
export class Breadcrumb {}
