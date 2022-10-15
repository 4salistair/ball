import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampCardComponent } from './champ-card.component';

describe('ChampCardComponent', () => {
  let component: ChampCardComponent;
  let fixture: ComponentFixture<ChampCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChampCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChampCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
