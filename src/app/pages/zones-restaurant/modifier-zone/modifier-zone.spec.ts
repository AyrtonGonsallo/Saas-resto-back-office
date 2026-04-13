import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierZone } from './modifier-zone';

describe('ModifierZone', () => {
  let component: ModifierZone;
  let fixture: ComponentFixture<ModifierZone>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierZone],
    }).compileComponents();

    fixture = TestBed.createComponent(ModifierZone);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
