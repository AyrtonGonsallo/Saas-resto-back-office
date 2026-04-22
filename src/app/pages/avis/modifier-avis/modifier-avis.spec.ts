import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierAvis } from './modifier-avis';

describe('ModifierAvis', () => {
  let component: ModifierAvis;
  let fixture: ComponentFixture<ModifierAvis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierAvis],
    }).compileComponents();

    fixture = TestBed.createComponent(ModifierAvis);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
