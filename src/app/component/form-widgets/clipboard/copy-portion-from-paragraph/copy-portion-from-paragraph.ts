import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-copy-portion-from-paragraph',
  imports: [FormsModule],
  templateUrl: './copy-portion-from-paragraph.html',
  styleUrl: './copy-portion-from-paragraph.scss',
})
export class CopyPortionFromParagraph {
  public copyHighlightTxt: string = 'Web design is the process of creating websites';
  public basic = false;
  public copyText: string = '';

  private _clipboardService = inject(ClipboardService);

  callServiceToCopy() {
    this._clipboardService.copy('This is copy thru service copyFromContent directly');
  }

  onCopyFailure() {
    alert('copy fail!');
  }

  copyFunction(txt: string) {
    navigator.clipboard.writeText(txt);
    alert('Copied');
  }

  ngOnInit(): void {
    this._clipboardService.copyResponse$.subscribe(re => {
      if (re.isSuccess) {
        alert('copy success!');
      }
    });
  }
}
