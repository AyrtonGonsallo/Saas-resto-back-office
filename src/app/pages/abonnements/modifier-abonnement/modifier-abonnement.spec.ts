import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierAbonnement } from './modifier-abonnement';

describe('ModifierAbonnement', () => {
  let component: ModifierAbonnement;
  let fixture: ComponentFixture<ModifierAbonnement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierAbonnement],
    }).compileComponents();

    fixture = TestBed.createComponent(ModifierAbonnement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
