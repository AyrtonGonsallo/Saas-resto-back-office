import { Component } from '@angular/core';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-with-image',
  imports: [],
  templateUrl: './modal-with-image.html',
  styleUrl: './modal-with-image.scss',
})
export class ModalWithImage {
  modalImage() {
    Swal.fire({
      title: 'Sweet!',
      text: 'Modal with a custom image.',
      imageUrl: 'https://unsplash.it/400/200',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
    });
  }
}
