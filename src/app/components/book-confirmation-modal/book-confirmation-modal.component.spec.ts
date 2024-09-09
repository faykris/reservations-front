import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookConfirmationModalComponent } from './book-confirmation-modal.component';

describe('BookConfirmationModalComponent', () => {
  let component: BookConfirmationModalComponent;
  let fixture: ComponentFixture<BookConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookConfirmationModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
