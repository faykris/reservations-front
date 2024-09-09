import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private baseUrl = `${environment.API_URL}/reservation/user`;

  constructor(private http: HttpClient) {}

  getReservations(): Observable<Reservation[]> {
    const userId = localStorage.getItem('userId');
    const accessToken = localStorage.getItem('authToken');

    if (!userId || !accessToken) {
      throw new Error('User not logged in');
    }

    const apiUrlWithUserId = `${this.baseUrl}/${userId}`;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });

    return this.http.get<Reservation[]>(apiUrlWithUserId, { headers });
  }
}
