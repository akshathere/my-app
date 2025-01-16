import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketModalComponent } from './market-modal.component';

describe('MarketModalComponent', () => {
  let component: MarketModalComponent;
  let fixture: ComponentFixture<MarketModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarketModalComponent]
    });
    fixture = TestBed.createComponent(MarketModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
