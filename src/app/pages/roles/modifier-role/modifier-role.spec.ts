import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierRole } from './modifier-role';

describe('ModifierRole', () => {
  let component: ModifierRole;
  let fixture: ComponentFixture<ModifierRole>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierRole],
    }).compileComponents();

    fixture = TestBed.createComponent(ModifierRole);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
