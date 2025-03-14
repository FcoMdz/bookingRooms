import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reserva } from '../entities/Reserva';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaServiceService {
  private apiUrl = 'http://localhost:3010/api/reservas'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  // Get all reservas
  getReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.apiUrl);
  }

  // Get a reserva by ID
  getReservaById(id: number): Observable<Reserva> {
    return this.http.get<Reserva>(`${this.apiUrl}/${id}`);
  }

  // Create a new reserva
  createReserva(reserva: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(this.apiUrl, reserva);
  }

  // Update a reserva
  updateReserva(id: number, reserva: Partial<Reserva>): Observable<Reserva> {
    return this.http.put<Reserva>(`${this.apiUrl}/${id}`, reserva);
  }

  // Delete a reserva
  deleteReserva(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Check room availability
  checkAvailability(salaId: number, start: Date, end: Date): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/check-availability`, {
      salaId,
      start,
      end,
    });
  }

  // Liberar (release) a reserva
  liberarReserva(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/liberar`, {});
  }
}
