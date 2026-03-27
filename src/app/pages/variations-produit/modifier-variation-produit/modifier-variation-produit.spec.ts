import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierVariationProduit } from './modifier-variation-produit';

describe('ModifierVariationProduit', () => {
  let component: ModifierVariationProduit;
  let fixture: ComponentFixture<ModifierVariationProduit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierVariationProduit],
    }).compileComponents();

    fixture = TestBed.createComponent(ModifierVariationProduit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
