import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierPortefeuille } from './modifier-portefeuille';

describe('ModifierPortefeuille', () => {
  let component: ModifierPortefeuille;
  let fixture: ComponentFixture<ModifierPortefeuille>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierPortefeuille],
    }).compileComponents();

    fixture = TestBed.createComponent(ModifierPortefeuille);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
