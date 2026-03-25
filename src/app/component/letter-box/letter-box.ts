import { Component } from '@angular/core';

import { LetterboxSidebar } from './letterbox-sidebar/letterbox-sidebar';

@Component({
  selector: 'app-letter-box',
  imports: [LetterboxSidebar],
  templateUrl: './letter-box.html',
  styleUrl: './letter-box.scss',
})
export class LetterBox {}
