import { Component } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { ReservationCardComponent } from '../../components/reservation-card/reservation-card.component';
import { Reservation } from '../../models/reservation';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [NgForOf, ReservationCardComponent, NgIf],
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.scss',
})
export class ReservationListComponent {
  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.fetchReservations();
  }

  fetchReservations(): void {
    this.reservationService.getReservations().subscribe((reservations) => {
      this.reservations = reservations;
    });
  }

  onReservationUpdated(): void {
    this.fetchReservations();
  }
}
