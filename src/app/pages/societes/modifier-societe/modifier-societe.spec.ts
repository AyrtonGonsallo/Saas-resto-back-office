import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierSociete } from './modifier-societe';

describe('ModifierSociete', () => {
  let component: ModifierSociete;
  let fixture: ComponentFixture<ModifierSociete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierSociete],
    }).compileComponents();

    fixture = TestBed.createComponent(ModifierSociete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
