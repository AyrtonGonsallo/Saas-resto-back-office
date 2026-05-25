import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterHoraire } from './ajouter-horaire';

describe('AjouterHoraire', () => {
  let component: AjouterHoraire;
  let fixture: ComponentFixture<AjouterHoraire>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterHoraire],
    }).compileComponents();

    fixture = TestBed.createComponent(AjouterHoraire);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
