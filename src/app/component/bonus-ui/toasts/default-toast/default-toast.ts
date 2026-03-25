import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-default-toast',
  imports: [NgClass],
  templateUrl: './default-toast.html',
  styleUrl: './default-toast.scss',
})
export class DefaultToast {
  public default: boolean = true;

  close() {
    this.default = false;
  }
}
