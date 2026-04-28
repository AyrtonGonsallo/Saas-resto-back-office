import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerLivraison } from './creer-livraison';

describe('CreerLivraison', () => {
  let component: CreerLivraison;
  let fixture: ComponentFixture<CreerLivraison>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreerLivraison],
    }).compileComponents();

    fixture = TestBed.createComponent(CreerLivraison);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
