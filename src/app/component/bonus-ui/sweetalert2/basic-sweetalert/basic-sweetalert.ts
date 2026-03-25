import { Component } from '@angular/core';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-basic-sweetalert',
  imports: [],
  templateUrl: './basic-sweetalert.html',
  styleUrl: './basic-sweetalert.scss',
})
export class BasicSweetalert {
  basicAlert() {
    Swal.fire({
      title: 'Good job!',
      text: 'You clicked the button!',
      icon: 'success',
      confirmButtonColor: 'var(--theme-deafult)',
    });
  }

  withTitle() {
    Swal.fire({
      title: "It's Magic!",
      text: 'Thank you for visiting  Edmin theme',
      confirmButtonColor: 'var(--theme-deafult)',
    });
  }

  informational() {
    Swal.fire({
      title: 'The Internet?',
      text: 'That thing is still around?',
      icon: 'question',
      confirmButtonColor: 'var(--theme-deafult)',
    });
  }

  withCancelled() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        });
      }
    });
  }
}
