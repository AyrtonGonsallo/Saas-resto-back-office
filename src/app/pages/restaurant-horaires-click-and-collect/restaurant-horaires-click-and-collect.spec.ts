import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantHorairesClickAndCollect } from './restaurant-horaires-click-and-collect';

describe('RestaurantHorairesClickAndCollect', () => {
  let component: RestaurantHorairesClickAndCollect;
  let fixture: ComponentFixture<RestaurantHorairesClickAndCollect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantHorairesClickAndCollect],
    }).compileComponents();

    fixture = TestBed.createComponent(RestaurantHorairesClickAndCollect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
