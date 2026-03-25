import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Societes } from './societes';

describe('Societes', () => {
  let component: Societes;
  let fixture: ComponentFixture<Societes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Societes],
    }).compileComponents();

    fixture = TestBed.createComponent(Societes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
