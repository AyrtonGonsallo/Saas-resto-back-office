import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierCategorieProduit } from './modifier-categorie-produit';

describe('ModifierCategorieProduit', () => {
  let component: ModifierCategorieProduit;
  let fixture: ComponentFixture<ModifierCategorieProduit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierCategorieProduit],
    }).compileComponents();

    fixture = TestBed.createComponent(ModifierCategorieProduit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
