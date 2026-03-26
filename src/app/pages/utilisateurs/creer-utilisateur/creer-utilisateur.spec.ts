import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerUtilisateur } from './creer-utilisateur';

describe('CreerUtilisateur', () => {
  let component: CreerUtilisateur;
  let fixture: ComponentFixture<CreerUtilisateur>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreerUtilisateur],
    }).compileComponents();

    fixture = TestBed.createComponent(CreerUtilisateur);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
