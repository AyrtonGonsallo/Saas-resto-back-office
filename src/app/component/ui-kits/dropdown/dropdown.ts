import { Component } from '@angular/core';

import { Alignments } from './alignments/alignments';
import { BasicDropdown } from './basic-dropdown/basic-dropdown';
import { DarkDropdown } from './dark-dropdown/dark-dropdown';
import { DividerDropdown } from './divider-dropdown/divider-dropdown';
import { HeadingDropdown } from './heading-dropdown/heading-dropdown';
import { HelperDropdown } from './helper-dropdown/helper-dropdown';
import { InputDropdown } from './input-dropdown/input-dropdown';
import { JustifyContentDropdown } from './justify-content-dropdown/justify-content-dropdown';
import { RoundedDropdown } from './rounded-dropdown/rounded-dropdown';
import { SizingDropdown } from './sizing-dropdown/sizing-dropdown';
import { SplitDropdown } from './split-dropdown/split-dropdown';
import { UniqueDropdown } from './unique-dropdown/unique-dropdown';

@Component({
  selector: 'app-dropdown',
  imports: [
    Alignments,
    BasicDropdown,
    DarkDropdown,
    DividerDropdown,
    HeadingDropdown,
    HelperDropdown,
    InputDropdown,
    JustifyContentDropdown,
    RoundedDropdown,
    SizingDropdown,
    SplitDropdown,
    UniqueDropdown,
  ],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.scss',
})
export class Dropdown {}
