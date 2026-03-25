import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-alerts-table',
  imports: [NgClass],
  templateUrl: './alerts-table.html',
  styleUrl: './alerts-table.scss',
})
export class AlertsTable {
  public alerts: boolean = true;
  public alerts2: boolean = true;

  close() {
    this.alerts = false;
  }

  close2() {
    this.alerts2 = false;
  }
}
