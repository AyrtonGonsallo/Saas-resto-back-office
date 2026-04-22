import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterAvis } from './ajouter-avis';

describe('AjouterAvis', () => {
  let component: AjouterAvis;
  let fixture: ComponentFixture<AjouterAvis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterAvis],
    }).compileComponents();

    fixture = TestBed.createComponent(AjouterAvis);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
