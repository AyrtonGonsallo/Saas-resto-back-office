import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestautantHoraires } from './restautant-horaires';

describe('RestautantHoraires', () => {
  let component: RestautantHoraires;
  let fixture: ComponentFixture<RestautantHoraires>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestautantHoraires],
    }).compileComponents();

    fixture = TestBed.createComponent(RestautantHoraires);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
