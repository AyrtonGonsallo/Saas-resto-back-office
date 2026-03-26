import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierTable } from './modifier-table';

describe('ModifierTable', () => {
  let component: ModifierTable;
  let fixture: ComponentFixture<ModifierTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierTable],
    }).compileComponents();

    fixture = TestBed.createComponent(ModifierTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
