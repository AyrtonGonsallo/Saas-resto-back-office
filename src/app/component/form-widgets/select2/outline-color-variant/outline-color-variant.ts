import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-outline-color-variant',
  imports: [TitleCasePipe],
  templateUrl: './outline-color-variant.html',
  styleUrl: './outline-color-variant.scss',
})
export class OutlineColorVariant {
  colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'inverse'];
}
