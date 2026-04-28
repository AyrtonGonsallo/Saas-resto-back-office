import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Livraisons } from './livraisons';

describe('Livraisons', () => {
  let component: Livraisons;
  let fixture: ComponentFixture<Livraisons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Livraisons],
    }).compileComponents();

    fixture = TestBed.createComponent(Livraisons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
