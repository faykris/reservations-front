import { Component, Inject } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-book-confirmation-modal',
  standalone: true,
  imports: [
    DatePipe,
    MatIcon,
    MatDialogContent,
    MatButton,
    MatDialogActions,
    CurrencyPipe,
  ],
  templateUrl: './book-confirmation-modal.component.html',
  styleUrl: './book-confirmation-modal.component.scss',
})
export class BookConfirmationModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      checkIn: Date;
      checkOut: Date;
      guests: number;
      price: number;
      name: string;
      totalPrice: number;
    },
    private dialogRef: MatDialogRef<BookConfirmationModalComponent>
  ) {}

  onCancelBooking(): void {
    this.dialogRef.close();
  }

  onBooking(): void {
    this.dialogRef.close({ confirmed: true });
  }
}
