import { Component } from '@angular/core';

import { NgApexchartsModule } from 'ng-apexcharts';

import { Totalvisit } from '../../../../shared/data/dashboard/default/default-charts';
import { ClickOutsideDirective } from '../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-total-visit',
  imports: [NgApexchartsModule, ClickOutsideDirective],
  templateUrl: './total-visit.html',
  styleUrl: './total-visit.scss',
})
export class TotalVisit {
  public Totalvisitchart = Totalvisit;
  public isopen: boolean = false;

  open() {
    this.isopen = !this.isopen;
  }

  clickOutside(): void {
    this.isopen = false;
  }


   
}
