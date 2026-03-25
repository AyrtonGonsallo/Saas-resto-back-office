import { Component } from '@angular/core';

import { Feathericon } from '../../../../shared/component/feathericon/feathericon';
import { TranslucentToasts } from '../../../../shared/data/bonus-ui/toasts';

@Component({
  selector: 'app-translucent-toast',
  imports: [Feathericon],
  templateUrl: './translucent-toast.html',
  styleUrl: './translucent-toast.scss',
})
export class TranslucentToast {
  public TranslucentToastsData = TranslucentToasts;

  close(value: number) {
    const items = this.TranslucentToastsData.filter(v => v.id == value);
    items[0].data = false;
  }
}
