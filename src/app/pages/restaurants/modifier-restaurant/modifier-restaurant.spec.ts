import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierRestaurant } from './modifier-restaurant';

describe('ModifierRestaurant', () => {
  let component: ModifierRestaurant;
  let fixture: ComponentFixture<ModifierRestaurant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierRestaurant],
    }).compileComponents();

    fixture = TestBed.createComponent(ModifierRestaurant);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
