import { Component, inject, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Products } from '../../../../shared/model/product.model';

@Component({
  selector: 'app-quick-view',
  imports: [RouterModule],
  templateUrl: './quick-view.html',
  styleUrl: './quick-view.scss',
})
export class QuickView {
  public counter: number = 1;
  public closeResult: string;
  public modalOpen: boolean = false;
  @Input() productDetails!: Products;

  public activeModal = inject(NgbActiveModal);

  public increment() {
    this.counter += 1;
  }

  public decrement() {
    if (this.counter > 1) {
      this.counter -= 1;
    }
  }
}
