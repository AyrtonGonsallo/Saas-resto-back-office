import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterMenu } from './ajouter-menu';

describe('AjouterMenu', () => {
  let component: AjouterMenu;
  let fixture: ComponentFixture<AjouterMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterMenu],
    }).compileComponents();

    fixture = TestBed.createComponent(AjouterMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
