import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Room } from '../../models/room';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { BookConfirmationModalComponent } from '../../components/book-confirmation-modal/book-confirmation-modal.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginModalComponent } from '../../components/login-modal/login-modal.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-room-card',
  standalone: true,
  imports: [CurrencyPipe, NgOptimizedImage, MatIcon, MatButton],
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.scss',
})
export class RoomCardComponent {
  isLoggedIn = false;
  @Input() room!: Room;
  @Input() checkInDate: string | undefined;
  @Input() checkOutDate: string | undefined;
  @Input() guests: string | undefined;
  @Output() openReservationsTab = new EventEmitter<void>();

  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('authToken');
  }

  confirmBooking(): void {
    if (!this.isLoggedIn) {
      this.openLoginDialog();
    } else {
      this.openBookingConfirmation();
    }
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginModalComponent, {
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.token) {
        this.isLoggedIn = true;
        this.openBookingConfirmation();
      }
    });
  }

  openBookingConfirmation(): void {
    const checkInDate = this.checkInDate
      ? new Date(this.checkInDate)
      : undefined;
    const checkOutDate = this.checkOutDate
      ? new Date(this.checkOutDate)
      : undefined;
    const dateDifference =
      (checkOutDate?.getTime() ?? 0) - (checkInDate?.getTime() ?? 0);

    const totalNights = Math.ceil(dateDifference / (1000 * 60 * 60 * 24));
    const dialogRef = this.dialog.open(BookConfirmationModalComponent, {
      data: {
        checkIn: this.checkInDate,
        checkOut: this.checkOutDate,
        guests: this.room.maxGuests,
        price: this.room.price,
        name: this.room.name,
        totalPrice: this.room.price * totalNights,
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
          roomId: this.room.id,
          userId: localStorage.getItem('userId'),
          checkIn: this.checkInDate,
          checkOut: this.checkOutDate,
          status: 'PENDING',
          totalPrice: this.room.price * totalNights,
        };

        this.http
          .post(`${environment.API_URL}/reservation/create`, reservation, {
            headers,
          })
          .subscribe({
            next: () => {
              this.snackBar.open('Reservation created successfully!', 'Close', {
                duration: 3000,
                panelClass: ['snackbar-success'],
              });
              this.openReservationsTab.emit();
            },
            error: (error) => {
              this.snackBar.open(
                'Failed to create reservation. Please try again.',
                'Close',
                {
                  duration: 3000,
                  panelClass: ['snackbar-error'],
                }
              );
              console.error('Error creating reservation:', error);
            },
          });
      }
    });
  }
}
