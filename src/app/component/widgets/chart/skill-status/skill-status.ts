import { Component } from '@angular/core';

import { NgApexchartsModule } from 'ng-apexcharts';

import { SkillStatusData } from './../../../../shared/data/widgets/chart';

@Component({
  selector: 'app-skill-status',
  imports: [NgApexchartsModule],
  templateUrl: './skill-status.html',
  styleUrl: './skill-status.scss',
})
export class SkillStatus {
  public skillstauschart = SkillStatusData;
}
