import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierMail } from './modifier-mail';

describe('ModifierMail', () => {
  let component: ModifierMail;
  let fixture: ComponentFixture<ModifierMail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierMail],
    }).compileComponents();

    fixture = TestBed.createComponent(ModifierMail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
