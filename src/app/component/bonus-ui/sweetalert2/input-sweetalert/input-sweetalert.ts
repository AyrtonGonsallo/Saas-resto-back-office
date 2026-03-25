import { Component } from '@angular/core';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-input-sweetalert',
  imports: [],
  templateUrl: './input-sweetalert.html',
  styleUrl: './input-sweetalert.scss',
})
export class InputSweetalert {
  inputText() {
    (async () => {
      const ipAPI = '//api.ipify.org?format=json';
      const response = await fetch(ipAPI);
      const data = await response.json();
      const inputValue = data.ip;
      const { value: ipAddress } = await Swal.fire({
        title: 'Enter your IP address',
        input: 'text',
        inputLabel: 'Your IP address',
        inputValue,
        showCancelButton: true,
        inputValidator: value => {
          if (!value) {
            return 'You need to write something!';
          }
          return undefined;
        },
      });
      if (ipAddress) {
        Swal.fire(`Your IP address is ${ipAddress}`);
      }
    })();
  }

  async loginEmail() {
    const { value: email } = await Swal.fire({
      title: 'Input email address',
      input: 'email',
      inputLabel: 'Your email address',
      inputPlaceholder: 'Enter your email address',
    });
    if (email) {
      Swal.fire(`Entered email: ${email}`);
    }
  }

  async url() {
    const { value: url } = await Swal.fire({
      input: 'url',
      inputLabel: 'URL address',
      inputPlaceholder: 'Enter the URL',
    });
    if (url) {
      Swal.fire(`Entered URL: ${url}`);
    }
  }

  async password() {
    const { value: password } = await Swal.fire({
      title: 'Enter your password',
      input: 'password',
      inputLabel: 'Password',
      inputPlaceholder: 'Enter your password',
      inputAttributes: {
        maxlength: '10',
        autocapitalize: 'off',
        autocorrect: 'off',
      },
    });
    if (password) {
      Swal.fire(`Entered password: ${password}`);
    }
  }

  async Textarea() {
    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Message',
      inputPlaceholder: 'Type your message here...',
      inputAttributes: {
        'aria-label': 'Type your message here',
      },
      showCancelButton: true,
    });
    if (text) {
      Swal.fire(text);
    }
  }

  async SelectInput() {
    const { value: fruit } = await Swal.fire({
      title: 'Select field validation',
      input: 'select',
      inputOptions: {
        Fruits: {
          apples: 'Apples',
          bananas: 'Bananas',
          grapes: 'Grapes',
          oranges: 'Oranges',
        },
        Vegetables: {
          potato: 'Potato',
          broccoli: 'Broccoli',
          carrot: 'Carrot',
        },
        icecream: 'Ice cream',
      },
      inputPlaceholder: 'Select a fruit',
      showCancelButton: true,
      inputValidator: value => {
        return new Promise(resolve => {
          if (value === 'oranges') {
            resolve();
          } else {
            resolve('You need to select oranges :)');
          }
        });
      },
    });
    if (fruit) {
      Swal.fire(`You selected: ${fruit}`);
    }
  }

  async radio() {
    const inputOptions = new Promise(resolve => {
      setTimeout(() => {
        resolve({
          '#ff0000': 'Red',
          '#00ff00': 'Green',
          '#0000ff': 'Blue',
        });
      }, 1000);
    });
    const { value: color } = await Swal.fire({
      title: 'Select color',
      input: 'radio',
      inputOptions,
      inputValidator: value => {
        if (!value) {
          return 'You need to choose something!';
        }
        return undefined;
      },
    });
    if (color) {
      Swal.fire({ html: `You selected: ${color}` });
    }
  }

  async checkbox() {
    const { value: accept } = await Swal.fire({
      title: 'Terms and conditions',
      input: 'checkbox',
      inputValue: 1,
      inputPlaceholder: `
        I agree with the terms and conditions
      `,
      confirmButtonText: `
        Continue&nbsp;<i class="fa fa-arrow-right"></i>
      `,
      inputValidator: result => {
        return !result && 'You need to agree with T&C';
      },
    });
    if (accept) {
      Swal.fire('You agreed with T&C :)');
    }
  }

  range() {
    Swal.fire({
      title: 'How old are you?',
      icon: 'question',
      input: 'range',
      inputLabel: 'Your age',
      inputAttributes: {
        min: '8',
        max: '120',
        step: '1',
      },
      inputValue: 25,
    });
  }
}
