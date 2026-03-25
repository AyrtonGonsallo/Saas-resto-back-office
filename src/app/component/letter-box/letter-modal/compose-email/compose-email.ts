import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-compose-email',
  imports: [AngularEditorModule, FormsModule, ReactiveFormsModule],
  templateUrl: './compose-email.html',
  styleUrl: './compose-email.scss',
})
export class ComposeEmail {
  public isShow: boolean = false;
  public isShow1: boolean = false;
  public htmlContent = '';

  public loginForm: FormGroup;

  public activeModal = inject(NgbActiveModal);

  myGroup = new FormGroup({
    email: new FormControl(),
  });
}
