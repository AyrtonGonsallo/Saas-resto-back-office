import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierType } from './modifier-type';

describe('ModifierType', () => {
  let component: ModifierType;
  let fixture: ComponentFixture<ModifierType>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierType],
    }).compileComponents();

    fixture = TestBed.createComponent(ModifierType);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
