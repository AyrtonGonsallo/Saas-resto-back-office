import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierParametre } from './modifier-parametre';

describe('ModifierParametre', () => {
  let component: ModifierParametre;
  let fixture: ComponentFixture<ModifierParametre>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierParametre],
    }).compileComponents();

    fixture = TestBed.createComponent(ModifierParametre);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
