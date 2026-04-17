import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesVariation } from './categories-variation';

describe('CategoriesVariation', () => {
  let component: CategoriesVariation;
  let fixture: ComponentFixture<CategoriesVariation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesVariation],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesVariation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
