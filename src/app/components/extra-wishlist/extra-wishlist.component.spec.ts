import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraWishlistComponent } from './extra-wishlist.component';

describe('ExtraWishlistComponent', () => {
  let component: ExtraWishlistComponent;
  let fixture: ComponentFixture<ExtraWishlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExtraWishlistComponent]
    });
    fixture = TestBed.createComponent(ExtraWishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
