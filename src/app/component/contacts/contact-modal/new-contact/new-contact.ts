import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-contact',
  imports: [FormsModule, ReactiveFormsModule, NgbModule],
  templateUrl: './new-contact.html',
  styleUrl: './new-contact.scss',
})
export class NewContact {
  public validate: boolean = false;
  public activeModal = inject(NgbActiveModal);

  myForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('', [Validators.email, Validators.required]),
    mobile: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    img: new FormControl('assets/images/user/2.png'),
  });

  add() {
    this.activeModal.dismiss();
  }

  get firstName() {
    return this.myForm.get('firstName');
  }

  get lastName() {
    return this.myForm.get('lastName');
  }

  get email() {
    return this.myForm.get('email');
  }

  get mobile() {
    return this.myForm.get('mobile');
  }
}
