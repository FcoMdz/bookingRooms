import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-sala',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './sala.component.html',
  styleUrl: './sala.component.scss'
})
export class SalaComponent {
  salas = [
    { id: 1, nombre: 'Sala 1', descripcion: 'Sala de reuniones grande', capacidad: 20 },
    { id: 2, nombre: 'Sala 2', descripcion: 'Sala de reuniones pequeña', capacidad: 10 },
  ];
}
