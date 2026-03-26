import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerTable } from './creer-table';

describe('CreerTable', () => {
  let component: CreerTable;
  let fixture: ComponentFixture<CreerTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreerTable],
    }).compileComponents();

    fixture = TestBed.createComponent(CreerTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
