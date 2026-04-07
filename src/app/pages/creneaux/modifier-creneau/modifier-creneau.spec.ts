import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierCreneau } from './modifier-creneau';

describe('ModifierCreneau', () => {
  let component: ModifierCreneau;
  let fixture: ComponentFixture<ModifierCreneau>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierCreneau],
    }).compileComponents();

    fixture = TestBed.createComponent(ModifierCreneau);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
