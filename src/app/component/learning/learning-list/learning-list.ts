import { Component } from '@angular/core';

import { learningTopData, learningData } from '../../../shared/data/learning/learning';
import { LearningFilter } from '../learning-filter/learning-filter';

@Component({
  selector: 'app-learning-list',
  imports: [LearningFilter],
  templateUrl: './learning-list.html',
  styleUrl: './learning-list.scss',
})
export class LearningList {
  public learningTopData = learningTopData;
  public learningData = learningData;
}
