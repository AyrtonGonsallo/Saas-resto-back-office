import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierCategorieVariation } from './modifier-categorie-variation';

describe('ModifierCategorieVariation', () => {
  let component: ModifierCategorieVariation;
  let fixture: ComponentFixture<ModifierCategorieVariation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierCategorieVariation],
    }).compileComponents();

    fixture = TestBed.createComponent(ModifierCategorieVariation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
