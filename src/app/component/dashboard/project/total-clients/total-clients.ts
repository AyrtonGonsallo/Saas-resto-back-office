import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NgApexchartsModule } from 'ng-apexcharts';

import { Totalclients } from '../../../../shared/data/dashboard/project/project-chart';

@Component({
  selector: 'app-total-clients',
  imports: [RouterModule, NgApexchartsModule],
  templateUrl: './total-clients.html',
  styleUrl: './total-clients.scss',
})
export class TotalClients {
  public clientsData = Totalclients;
}
