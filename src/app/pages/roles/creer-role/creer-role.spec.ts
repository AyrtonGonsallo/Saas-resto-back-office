import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerRole } from './creer-role';

describe('CreerRole', () => {
  let component: CreerRole;
  let fixture: ComponentFixture<CreerRole>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreerRole],
    }).compileComponents();

    fixture = TestBed.createComponent(CreerRole);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
