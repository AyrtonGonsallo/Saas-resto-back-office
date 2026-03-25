import { Component } from '@angular/core';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-unique-sweetalert',
  imports: [],
  templateUrl: './unique-sweetalert.html',
  styleUrl: './unique-sweetalert.scss',
})
export class UniqueSweetalert {
  danger() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href="#">Why do I have this issue?</a>',
    });
  }

  animation() {
    Swal.fire({
      title: 'Custom animation with Animate.css',
      showClass: {
        popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
      },
      hideClass: {
        popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
      },
    });
  }

  timer() {
    let timerInterval;
    Swal.fire({
      title: 'Auto close alert!',
      text: 'just a wait! I will close in 30 second!',
      timer: 30000,
      timerProgressBar: true,
      confirmButtonColor: 'var(--theme-deafult)',
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then(result => {
      if (result.dismiss === Swal.DismissReason.timer) {
      }
    });
  }
}
