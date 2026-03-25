import { Component, inject } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-bookmark',
  imports: [],
  templateUrl: './new-bookmark.html',
  styleUrl: './new-bookmark.scss',
})
export class NewBookmark {
  public activeModal = inject(NgbActiveModal);
}
