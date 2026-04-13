import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesDeCuisine } from './types-de-cuisine';

describe('TypesDeCuisine', () => {
  let component: TypesDeCuisine;
  let fixture: ComponentFixture<TypesDeCuisine>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypesDeCuisine],
    }).compileComponents();

    fixture = TestBed.createComponent(TypesDeCuisine);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
