import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenebrisPlayerComponent } from './tenebris-player.component';

describe('TenebrisPlayerComponent', () => {
  let component: TenebrisPlayerComponent;
  let fixture: ComponentFixture<TenebrisPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenebrisPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenebrisPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
