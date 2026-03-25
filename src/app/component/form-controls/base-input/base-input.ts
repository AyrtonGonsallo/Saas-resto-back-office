import { Component } from '@angular/core';

import { BasicInputControl } from './basic-input-control/basic-input-control';
import { EdgesStyle } from './edges-style/edges-style';
import { FlatStyle } from './flat-style/flat-style';
import { RaiseStyle } from './raise-style/raise-style';
import { SimpleExample } from './simple-example/simple-example';
import { Sizing } from './sizing/sizing';

@Component({
  selector: 'app-base-input',
  imports: [BasicInputControl, EdgesStyle, FlatStyle, RaiseStyle, SimpleExample, Sizing],
  templateUrl: './base-input.html',
  styleUrl: './base-input.scss',
})
export class BaseInput {}
