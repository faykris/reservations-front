import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Reservation } from '../../models/reservation';
import { MatIcon } from '@angular/material/icon';
import { EditBookingModalComponent } from '../../components/edit-booking-modal/edit-booking-modal.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-reservation-card',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, NgClass, MatIcon],
  templateUrl: './reservation-card.component.html',
  styleUrl: './reservation-card.component.scss',
})
export class ReservationCardComponent {
  @Input() reservation!: Reservation;
  @Output() reservationUpdated = new EventEmitter<void>();

  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  openEditBooking(): void {
    const dialogRef = this.dialog.open(EditBookingModalComponent, {
      data: {
        checkIn: this.reservation.checkIn,
        checkOut: this.reservation.checkOut,
        guests: this.reservation.room?.maxGuests,
        price: this.reservation.room?.price,
        name: this.reservation.room?.name,
        roomId: this.reservation.room?.id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed with result:', result);

      if (result) {
        const accessToken = localStorage.getItem('authToken');

        const headers = new HttpHeaders({
          Authorization: `Bearer ${accessToken}`,
        });

        const reservation = {
          roomId: this.reservation.room?.id,
          userId: localStorage.getItem('userId'),
          checkIn: result.data.checkIn,
          checkOut: result.data.checkOut,
          status: this.reservation.status,
        };

        this.http
          .put(
            `${environment.API_URL}/reservation/${this.reservation.id}/update`,
            reservation,
            {
              headers,
            }
          )
          .subscribe({
            next: () => {
              this.reservationUpdated.emit();

              this.snackBar.open('Reservation updated successfully!', 'Close', {
                duration: 3000,
                panelClass: ['snackbar-success'],
              });
            },
            error: () => {
              this.snackBar.open(
                'Failed to update reservation. Please try again.',
                'Close',
                {
                  duration: 3000,
                  panelClass: ['snackbar-error'],
                }
              );
            },
          });
      }
    });
  }
}
