import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesProduit } from './categories-produit';

describe('CategoriesProduit', () => {
  let component: CategoriesProduit;
  let fixture: ComponentFixture<CategoriesProduit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesProduit],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesProduit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
