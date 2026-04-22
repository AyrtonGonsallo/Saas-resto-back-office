import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Paniers } from './paniers';

describe('Paniers', () => {
  let component: Paniers;
  let fixture: ComponentFixture<Paniers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Paniers],
    }).compileComponents();

    fixture = TestBed.createComponent(Paniers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
