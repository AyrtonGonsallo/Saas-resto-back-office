import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerCreneau } from './creer-creneau';

describe('CreerCreneau', () => {
  let component: CreerCreneau;
  let fixture: ComponentFixture<CreerCreneau>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreerCreneau],
    }).compileComponents();

    fixture = TestBed.createComponent(CreerCreneau);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
