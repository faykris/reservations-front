import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../models/room';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private apiUrl = `${environment.API_URL}/room`;

  constructor(private http: HttpClient) {}

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.apiUrl}`);
  }

  getRoomsBetweenDates(
    checkIn: string,
    checkOut: string,
    guests: string
  ): Observable<Room[]> {
    const params = new HttpParams()
      .set('checkIn', checkIn)
      .set('checkOut', checkOut)
      .set('guests', guests);

    return this.http.get<Room[]>(`${this.apiUrl}/search`, { params });
  }
}
