import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerCategorieVariation } from './creer-categorie-variation';

describe('CreerCategorieVariation', () => {
  let component: CreerCategorieVariation;
  let fixture: ComponentFixture<CreerCategorieVariation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreerCategorieVariation],
    }).compileComponents();

    fixture = TestBed.createComponent(CreerCategorieVariation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
