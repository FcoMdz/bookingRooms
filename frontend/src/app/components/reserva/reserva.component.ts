import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, DialogModule, CalendarModule, ToastModule],
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.scss'
})
export class ReservaComponent {
  reservas = [
    {
      id: 1,
      sala_id: 1,
      usuario_id: 1,
      hora_inicio: new Date('2023-10-01T10:00:00'),
      hora_fin: new Date('2023-10-01T12:00:00'),
      estado: 'reservada',
    },
  ];
  displayDialog = false;
}
