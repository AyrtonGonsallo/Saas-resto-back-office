import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireClickAndCollect } from './formulaire-click-and-collect';

describe('FormulaireClickAndCollect', () => {
  let component: FormulaireClickAndCollect;
  let fixture: ComponentFixture<FormulaireClickAndCollect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulaireClickAndCollect],
    }).compileComponents();

    fixture = TestBed.createComponent(FormulaireClickAndCollect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
