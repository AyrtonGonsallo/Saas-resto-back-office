import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterMail } from './ajouter-mail';

describe('AjouterMail', () => {
  let component: AjouterMail;
  let fixture: ComponentFixture<AjouterMail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterMail],
    }).compileComponents();

    fixture = TestBed.createComponent(AjouterMail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
