import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierCommande } from './modifier-commande';

describe('ModifierCommande', () => {
  let component: ModifierCommande;
  let fixture: ComponentFixture<ModifierCommande>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierCommande],
    }).compileComponents();

    fixture = TestBed.createComponent(ModifierCommande);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
