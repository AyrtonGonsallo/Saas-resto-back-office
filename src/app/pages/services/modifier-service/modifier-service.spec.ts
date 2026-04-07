import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierService } from './modifier-service';

describe('ModifierService', () => {
  let component: ModifierService;
  let fixture: ComponentFixture<ModifierService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierService],
    }).compileComponents();

    fixture = TestBed.createComponent(ModifierService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
