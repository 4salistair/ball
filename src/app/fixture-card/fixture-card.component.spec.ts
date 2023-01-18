import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremCardComponent } from './fixture-card.component';

describe('PremCardComponent', () => {
  let component: PremCardComponent;
  let fixture: ComponentFixture<PremCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PremCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PremCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
