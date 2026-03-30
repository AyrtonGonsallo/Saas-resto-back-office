import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerParametre } from './creer-parametre';

describe('CreerParametre', () => {
  let component: CreerParametre;
  let fixture: ComponentFixture<CreerParametre>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreerParametre],
    }).compileComponents();

    fixture = TestBed.createComponent(CreerParametre);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
