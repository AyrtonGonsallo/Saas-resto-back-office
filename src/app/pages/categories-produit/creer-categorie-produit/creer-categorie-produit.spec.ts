import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerCategorieProduit } from './creer-categorie-produit';

describe('CreerCategorieProduit', () => {
  let component: CreerCategorieProduit;
  let fixture: ComponentFixture<CreerCategorieProduit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreerCategorieProduit],
    }).compileComponents();

    fixture = TestBed.createComponent(CreerCategorieProduit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
