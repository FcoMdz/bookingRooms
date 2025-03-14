import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sala } from '../entities/Sala';

@Injectable({
  providedIn: 'root'
})
export class SalasServiceService {
  private apiUrl = 'http://localhost:3010/api/salas'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  // Get all salas
  getSalas(): Observable<Sala[]> {
    return this.http.get<Sala[]>(this.apiUrl+"/");
  }

  // Create a new sala
  createSala(sala: Sala): Observable<Sala> {
    return this.http.post<Sala>(this.apiUrl+"/", sala);
  }

  // Get a sala by ID
  getSalaById(id: number): Observable<Sala> {
    return this.http.get<Sala>(`${this.apiUrl}/${id}`);
  }

  // Update a sala
  updateSala(id: number, sala: Partial<Sala>): Observable<Sala> {
    return this.http.put<Sala>(`${this.apiUrl}/${id}`, sala);
  }

  // Delete a sala
  deleteSala(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
