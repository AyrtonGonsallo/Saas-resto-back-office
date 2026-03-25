import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

import {
  filterData,
  BrandCheckbox,
  CategoryCheckbox,
} from '../../../../shared/data/ecommerce/product';

@Component({
  selector: 'app-filter',
  imports: [CarouselModule, NgxSliderModule, FormsModule],
  templateUrl: './filter.html',
  styleUrl: './filter.scss',
})
export class Filter {
  public filter = filterData;
  public CategoryCheckboxData = CategoryCheckbox;
  public BarndCheckboxData = BrandCheckbox;
  public openSidebar: boolean = false;
  public value2: number = 200;
  public maxvalue: number = 800;

  customOptions: OwlOptions = {
    items: 1,
    margin: 30,
    loop: true,
    dots: false,
    nav: true,
  };

  options: Options = {
    floor: 0,
    ceil: 1000,
    showTicksValues: true,
    tickStep: 250,
  };

  sidebarToggle() {
    this.openSidebar = !this.openSidebar;
  }
}
