import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-color-schemes',
  imports: [NgClass],
  templateUrl: './color-schemes.html',
  styleUrl: './color-schemes.scss',
})
export class ColorSchemes {
  public colorschemes: boolean = true;

  close() {
    this.colorschemes = false;
  }
}
