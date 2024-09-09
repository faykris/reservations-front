import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Room } from '../../models/room';
import { RoomSearchService } from '../../services/room-search.service';
import { CurrencyPipe, NgForOf } from '@angular/common';
import { RoomCardComponent } from '../../components/room-card/room-card.component';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [NgForOf, CurrencyPipe, RoomCardComponent],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.scss',
})
export class RoomListComponent implements OnInit {
  rooms: Room[] = [];
  @Input() checkInDate: string | undefined;
  @Input() checkOutDate: string | undefined;
  @Input() guests: string | undefined;
  @Output() openReservationsTab = new EventEmitter<void>();

  constructor(private roomSearchService: RoomSearchService) {}

  ngOnInit(): void {
    this.roomSearchService.fetchAllRooms();

    this.roomSearchService.rooms$.subscribe((rooms) => {
      this.rooms = rooms;
    });
  }

  ngOnChanges(): void {
    if (this.checkInDate && this.checkOutDate && this.guests) {
    }
  }

  onOpenReservationsTab(): void {
    this.openReservationsTab.emit();
  }
}
