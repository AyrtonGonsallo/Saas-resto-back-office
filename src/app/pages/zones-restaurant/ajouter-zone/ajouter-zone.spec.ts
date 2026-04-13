import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterZone } from './ajouter-zone';

describe('AjouterZone', () => {
  let component: AjouterZone;
  let fixture: ComponentFixture<AjouterZone>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterZone],
    }).compileComponents();

    fixture = TestBed.createComponent(AjouterZone);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
