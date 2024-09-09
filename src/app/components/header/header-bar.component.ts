import { Component, Input } from '@angular/core';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { MatInput, MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RoomSearchService } from '../../services/room-search.service';

@Component({
  selector: 'app-header-bar',
  standalone: true,
  imports: [
    MatFormField,
    MatDatepickerInput,
    MatInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatLabel,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    FormsModule,
    MatFabButton,
    MatIcon,
  ],
  templateUrl: './header-bar.component.html',
  styleUrl: './header-bar.component.scss',
})
export class HeaderBarComponent {
  checkInDate: Date | undefined;
  checkOutDate: Date | undefined;
  guests: number | undefined;
  @Input() onSearch!: (
    checkInDate: string,
    checkOutDate: string,
    guests: string
  ) => void;

  constructor(private roomSearchService: RoomSearchService) {}

  searchRooms(): void {
    if (!this.checkInDate || !this.checkOutDate || !this.guests) {
      console.error('Please select both check-in and check-out dates.');
      return;
    }

    const checkIn = this.checkInDate.toISOString();
    const checkOut = this.checkOutDate.toISOString();
    const guests = this.guests.toString();

    this.onSearch(checkIn, checkOut, guests);
    this.roomSearchService.searchRooms(checkIn, checkOut, guests);
  }
}
