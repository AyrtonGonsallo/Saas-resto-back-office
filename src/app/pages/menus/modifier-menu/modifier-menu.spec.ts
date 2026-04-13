import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierMenu } from './modifier-menu';

describe('ModifierMenu', () => {
  let component: ModifierMenu;
  let fixture: ComponentFixture<ModifierMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierMenu],
    }).compileComponents();

    fixture = TestBed.createComponent(ModifierMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
