import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { RoomService } from './room.service';
import { Room } from '../models/room';

@Injectable({
  providedIn: 'root',
})
export class RoomSearchService {
  private roomsSubject = new BehaviorSubject<Room[]>([]);
  rooms$: Observable<Room[]> = this.roomsSubject.asObservable();

  constructor(private roomService: RoomService) {}

  searchRooms(checkIn: string, checkOut: string, guests: string): void {
    this.roomService
      .getRoomsBetweenDates(checkIn, checkOut, guests)
      .subscribe((rooms) => {
        this.roomsSubject.next(rooms);
      });
  }

  verifyAvailability(
    checkIn: string,
    checkOut: string,
    guests: string,
    roomId: number
  ): Observable<boolean> {
    return this.roomService
      .getRoomsBetweenDates(checkIn, checkOut, guests)
      .pipe(
        map((rooms) => {
          return rooms.some((room) => room.id === roomId);
        }),
        catchError(() => {
          return of(false);
        })
      );
  }

  fetchAllRooms(): void {
    this.roomService.getRooms().subscribe((rooms) => {
      this.roomsSubject.next(rooms);
    });
  }
}
