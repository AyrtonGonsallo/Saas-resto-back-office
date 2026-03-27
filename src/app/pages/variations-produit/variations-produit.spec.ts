import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariationsProduit } from './variations-produit';

describe('VariationsProduit', () => {
  let component: VariationsProduit;
  let fixture: ComponentFixture<VariationsProduit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VariationsProduit],
    }).compileComponents();

    fixture = TestBed.createComponent(VariationsProduit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
