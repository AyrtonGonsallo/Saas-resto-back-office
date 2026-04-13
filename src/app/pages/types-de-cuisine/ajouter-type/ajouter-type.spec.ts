import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterType } from './ajouter-type';

describe('AjouterType', () => {
  let component: AjouterType;
  let fixture: ComponentFixture<AjouterType>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterType],
    }).compileComponents();

    fixture = TestBed.createComponent(AjouterType);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
