import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-clipboard-on-textarea',
  imports: [FormsModule],
  templateUrl: './clipboard-on-textarea.html',
  styleUrl: './clipboard-on-textarea.scss',
})
export class ClipboardOnTextarea {
  clipboardExample2: string =
    'A web designer must always enhance their work since creating websites is a creative effort. Therefore, a web designer must be more imaginative to produce exceptional results. Blogs about web design assist web designers in learning about new technologies, offer lessons, news, direction for a freebie, and much more. These blogs allow web designers to stay creative and improve their abilities. Therefore, advice from web design blogs is required to improve your business.';
  basic = false;
  copyText: string = '';

  private _clipboardService = inject(ClipboardService);

  callServiceToCopy() {
    this._clipboardService.copy('This is copy thru service copyFromContent directly');
  }

  copyFunction(txt: string) {
    navigator.clipboard.writeText(txt);
    alert('Copied');
  }
  cutFunction(data: string) {
    switch (data) {
      case 'clipboardExample2':
        navigator.clipboard.writeText(this.clipboardExample2);
        this.clipboardExample2 = '';
        break;
      default:
        break;
    }
  }

  ngOnInit(): void {
    this._clipboardService.copyResponse$.subscribe(re => {
      if (re.isSuccess) {
        alert('copy success!');
      }
    });
  }
}
