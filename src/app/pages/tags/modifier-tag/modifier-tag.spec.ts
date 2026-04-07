import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierTag } from './modifier-tag';

describe('ModifierTag', () => {
  let component: ModifierTag;
  let fixture: ComponentFixture<ModifierTag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierTag],
    }).compileComponents();

    fixture = TestBed.createComponent(ModifierTag);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
