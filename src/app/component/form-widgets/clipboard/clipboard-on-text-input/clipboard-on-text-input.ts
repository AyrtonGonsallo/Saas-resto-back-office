import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-clipboard-on-text-input',
  imports: [FormsModule],
  templateUrl: './clipboard-on-text-input.html',
  styleUrl: './clipboard-on-text-input.scss',
})
export class ClipboardOnTextInput {
  public clipboardExample1: string = '';
  public basic = false;
  public copyText: string = '';

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
      case 'clipboardExample1':
        navigator.clipboard.writeText(this.clipboardExample1);
        this.clipboardExample1 = '';
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
