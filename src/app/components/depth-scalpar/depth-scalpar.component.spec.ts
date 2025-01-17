import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepthScalparComponent } from './depth-scalpar.component';

describe('DepthScalparComponent', () => {
  let component: DepthScalparComponent;
  let fixture: ComponentFixture<DepthScalparComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepthScalparComponent]
    });
    fixture = TestBed.createComponent(DepthScalparComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
