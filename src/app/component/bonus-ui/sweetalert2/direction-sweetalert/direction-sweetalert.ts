import { Component } from '@angular/core';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-direction-sweetalert',
  imports: [],
  templateUrl: './direction-sweetalert.html',
  styleUrl: './direction-sweetalert.scss',
})
export class DirectionSweetalert {
  TopLeft() {
    Swal.fire({
      position: 'top-start',
      icon: 'error',
      title: 'Something went wrong!',
      showConfirmButton: false,
    });
  }

  TopRight() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
    });
  }

  BottomLeft() {
    Swal.fire({
      position: 'bottom-start',
      icon: 'info',
      title: 'You can use, Alerts and other HTML tags',
      showConfirmButton: false,
    });
  }

  BottomRight() {
    Swal.fire({
      position: 'bottom-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
    });
  }
}
