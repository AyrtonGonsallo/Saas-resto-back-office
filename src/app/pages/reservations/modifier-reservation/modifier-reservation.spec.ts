import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierReservation } from './modifier-reservation';

describe('ModifierReservation', () => {
  let component: ModifierReservation;
  let fixture: ComponentFixture<ModifierReservation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierReservation],
    }).compileComponents();

    fixture = TestBed.createComponent(ModifierReservation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
