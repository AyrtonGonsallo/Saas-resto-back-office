import { Component } from '@angular/core';

import { AdvanceSweetalert } from './advance-sweetalert/advance-sweetalert';
import { BasicSweetalert } from './basic-sweetalert/basic-sweetalert';
import { DirectionSweetalert } from './direction-sweetalert/direction-sweetalert';
import { GithubAvatar } from './github-avatar/github-avatar';
import { InputSweetalert } from './input-sweetalert/input-sweetalert';
import { MessageTimer } from './message-timer/message-timer';
import { ModalWithImage } from './modal-with-image/modal-with-image';
import { RtlSupport } from './rtl-support/rtl-support';
import { UniqueSweetalert } from './unique-sweetalert/unique-sweetalert';

@Component({
  selector: 'app-sweetalert2',
  imports: [
    AdvanceSweetalert,
    BasicSweetalert,
    DirectionSweetalert,
    GithubAvatar,
    InputSweetalert,
    MessageTimer,
    ModalWithImage,
    RtlSupport,
    UniqueSweetalert,
  ],
  templateUrl: './sweetalert2.html',
  styleUrl: './sweetalert2.scss',
})
export class Sweetalert2 {}
