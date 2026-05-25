import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierHoraire } from './modifier-horaire';

describe('ModifierHoraire', () => {
  let component: ModifierHoraire;
  let fixture: ComponentFixture<ModifierHoraire>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierHoraire],
    }).compileComponents();

    fixture = TestBed.createComponent(ModifierHoraire);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
