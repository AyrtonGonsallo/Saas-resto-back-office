import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerSociete } from './creer-societe';

describe('CreerSociete', () => {
  let component: CreerSociete;
  let fixture: ComponentFixture<CreerSociete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreerSociete],
    }).compileComponents();

    fixture = TestBed.createComponent(CreerSociete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
