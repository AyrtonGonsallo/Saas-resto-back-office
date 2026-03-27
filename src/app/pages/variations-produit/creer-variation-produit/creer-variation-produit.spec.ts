import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerVariationProduit } from './creer-variation-produit';

describe('CreerVariationProduit', () => {
  let component: CreerVariationProduit;
  let fixture: ComponentFixture<CreerVariationProduit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreerVariationProduit],
    }).compileComponents();

    fixture = TestBed.createComponent(CreerVariationProduit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
