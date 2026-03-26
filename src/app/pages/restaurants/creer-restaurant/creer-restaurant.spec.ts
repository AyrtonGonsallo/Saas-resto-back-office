import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerRestaurant } from './creer-restaurant';

describe('CreerRestaurant', () => {
  let component: CreerRestaurant;
  let fixture: ComponentFixture<CreerRestaurant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreerRestaurant],
    }).compileComponents();

    fixture = TestBed.createComponent(CreerRestaurant);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
