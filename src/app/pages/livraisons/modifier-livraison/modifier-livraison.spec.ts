import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierLivraison } from './modifier-livraison';

describe('ModifierLivraison', () => {
  let component: ModifierLivraison;
  let fixture: ComponentFixture<ModifierLivraison>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierLivraison],
    }).compileComponents();

    fixture = TestBed.createComponent(ModifierLivraison);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
