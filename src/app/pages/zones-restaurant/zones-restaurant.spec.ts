import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonesRestaurant } from './zones-restaurant';

describe('ZonesRestaurant', () => {
  let component: ZonesRestaurant;
  let fixture: ComponentFixture<ZonesRestaurant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZonesRestaurant],
    }).compileComponents();

    fixture = TestBed.createComponent(ZonesRestaurant);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
