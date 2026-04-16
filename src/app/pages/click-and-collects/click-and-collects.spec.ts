import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickAndCollects } from './click-and-collects';

describe('ClickAndCollects', () => {
  let component: ClickAndCollects;
  let fixture: ComponentFixture<ClickAndCollects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClickAndCollects],
    }).compileComponents();

    fixture = TestBed.createComponent(ClickAndCollects);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
