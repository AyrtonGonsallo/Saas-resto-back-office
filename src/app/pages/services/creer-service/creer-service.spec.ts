import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerService } from './creer-service';

describe('CreerService', () => {
  let component: CreerService;
  let fixture: ComponentFixture<CreerService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreerService],
    }).compileComponents();

    fixture = TestBed.createComponent(CreerService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
