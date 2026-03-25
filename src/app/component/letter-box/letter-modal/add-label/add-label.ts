import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-label',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-label.html',
  styleUrl: './add-label.scss',
})
export class AddLabel {
  public loginForm: FormGroup;

  public activeModal = inject(NgbActiveModal);

  public myGroup = new FormGroup({
    email: new FormControl(),
    color: new FormControl(),
  });
}
