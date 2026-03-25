import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-full-colored-variant',
  imports: [TitleCasePipe],
  templateUrl: './full-colored-variant.html',
  styleUrl: './full-colored-variant.scss',
})
export class FullColoredVariant {
  colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'inverse'];
}
