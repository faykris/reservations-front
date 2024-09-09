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
import {
  MatError,
  MatFormField,
  MatHint,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { RoomSearchService } from '../../services/room-search.service';

@Component({
  selector: 'app-edit-booking-modal',
  standalone: true,
  imports: [
    DatePipe,
    MatIcon,
    MatDialogContent,
    MatButton,
    MatDialogActions,
    CurrencyPipe,
    MatFormField,
    MatDatepickerToggle,
    FormsModule,
    MatDatepickerInput,
    MatDatepicker,
    MatInput,
    MatLabel,
    MatError,
    MatHint,
    MatSuffix,
  ],
  templateUrl: './edit-booking-modal.component.html',
  styleUrl: './edit-booking-modal.component.scss',
})
export class EditBookingModalComponent {
  errorMessage = '';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      checkIn: Date;
      checkOut: Date;
      guests: number;
      price: number;
      name: string;
      roomId: number;
    },
    private roomSearchService: RoomSearchService,
    private dialogRef: MatDialogRef<EditBookingModalComponent>
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onEditBooking(): void {
    this.roomSearchService
      .verifyAvailability(
        this.data.checkIn.toISOString(),
        this.data.checkOut.toISOString(),
        this.data.guests.toString(),
        this.data.roomId
      )
      .subscribe((isAvailable) => {
        if (isAvailable) {
          this.dialogRef.close({ confirmed: true, data: this.data });
        } else {
          this.errorMessage =
            'Room is not available. Please select other dates.';
        }
      });
  }
}
