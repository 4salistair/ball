import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoresCardComponent } from './scores-card.component';

describe('ScoresCardComponent', () => {
  let component: ScoresCardComponent;
  let fixture: ComponentFixture<ScoresCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoresCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoresCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
