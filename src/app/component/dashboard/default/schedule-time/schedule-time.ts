import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

import { Friday } from './friday/friday';
import { Monday } from './monday/monday';
import { Thursday } from './thursday/thursday';
import { Tuesday } from './tuesday/tuesday';
import { Wednesday } from './wednesday/wednesday';
import { ClickOutsideDirective } from '../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-schedule-time',
  imports: [Monday, Thursday, Wednesday, Tuesday, Friday, ClickOutsideDirective, NgClass],
  templateUrl: './schedule-time.html',
  styleUrl: './schedule-time.scss',
})
export class ScheduleTime {
  public openTab: string = 'mon';
  public isopen: boolean = false;

  open() {
    this.isopen = !this.isopen;
  }

  clickOutside(): void {
    this.isopen = false;
  }

  public tabbed(val: string) {
    this.openTab = val;
  }
}
