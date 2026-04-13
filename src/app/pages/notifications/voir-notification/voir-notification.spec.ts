import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoirNotification } from './voir-notification';

describe('VoirNotification', () => {
  let component: VoirNotification;
  let fixture: ComponentFixture<VoirNotification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoirNotification],
    }).compileComponents();

    fixture = TestBed.createComponent(VoirNotification);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
