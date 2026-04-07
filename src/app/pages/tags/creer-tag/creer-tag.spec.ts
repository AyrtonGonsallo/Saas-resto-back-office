import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerTag } from './creer-tag';

describe('CreerTag', () => {
  let component: CreerTag;
  let fixture: ComponentFixture<CreerTag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreerTag],
    }).compileComponents();

    fixture = TestBed.createComponent(CreerTag);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
