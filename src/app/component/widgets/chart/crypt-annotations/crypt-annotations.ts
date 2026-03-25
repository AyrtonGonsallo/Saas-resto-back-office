import { Component } from '@angular/core';

import { NgApexchartsModule } from 'ng-apexcharts';

import { CryptoAnnotations } from '../../../../shared/data/widgets/chart';

@Component({
  selector: 'app-crypt-annotations',
  imports: [NgApexchartsModule],
  templateUrl: './crypt-annotations.html',
  styleUrl: './crypt-annotations.scss',
})
export class CryptAnnotations {
  public CryptoannotationsChart = CryptoAnnotations;
}
