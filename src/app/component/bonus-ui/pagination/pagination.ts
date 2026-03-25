import { Component } from '@angular/core';

import { ActiveDisabledPagination } from './active-disabled-pagination/active-disabled-pagination';
import { AlignmentPagination } from './alignment-pagination/alignment-pagination';
import { DefaultPagination } from './default-pagination/default-pagination';
import { IconsPagination } from './icons-pagination/icons-pagination';
import { RoundedPagination } from './rounded-pagination/rounded-pagination';
import { SizingPagination } from './sizing-pagination/sizing-pagination';

@Component({
  selector: 'app-pagination',
  imports: [
    ActiveDisabledPagination,
    AlignmentPagination,
    DefaultPagination,
    IconsPagination,
    RoundedPagination,
    SizingPagination,
  ],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class Pagination {}
