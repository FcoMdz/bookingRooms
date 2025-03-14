import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ReservaServiceService } from '../../services/reserva-service.service';
import { Reserva } from '../../entities/Reserva';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { Sala } from '../../entities/Sala';
import { User } from '../../entities/User';
import { SalasServiceService } from '../../services/salas-service.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-reserva',
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DialogModule,
    CalendarModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
  ],
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.scss',
})
export class ReservaComponent implements OnInit {
  displayDialog = false; // Controls dialog visibility
  reservaForm: FormGroup; // Reactive form
  reservas: Reserva[] = []; // List of reservas
  selectedReserva: Reserva | null = null; // Selected reserva for editing
  estados = [
    { label: 'Reservada', value: 'reservada' },
    { label: 'Liberada', value: 'liberada' },
    { label: 'Finalizada', value: 'finalizada' },
  ];
   // Dropdown options
   salas: Sala[] = []; // List of salas
   users: User[] = []; // List of users
  constructor(
    private fb: FormBuilder,
    private reservaService: ReservaServiceService,
    private salaService: SalasServiceService, // Inject SalaService
    private userService: UserService // Inject UserService
  ) {
    this.reservaForm = this.fb.group({
      id: [0], // Hidden field for reserva ID
      sala_id: ['', Validators.required],
      usuario_id: ['', Validators.required],
      hora_inicio: ['', Validators.required],
      hora_fin: ['', Validators.required],
      estado: ['reservada', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadReservas();
    this.loadSalas();
    this.loadUsers();
  }

  // Load reservas from the backend
  async loadReservas(): Promise<void> {
    await this.reservaService.getReservas().subscribe({
      next: (data) => (this.reservas = data),
      error: (err) => console.error('Error fetching reservas:', err),
    });
  }
  // Load salas for the dropdown
  async loadSalas(): Promise<void> {
   await this.salaService.getSalas().subscribe({
      next: (data) => (this.salas = data),
      error: (err) => console.error('Error fetching salas:', err),
    });
  }

  // Load users for the dropdown
  async loadUsers(): Promise<void> {
    await this.userService.getUsers().subscribe({
      next: (data) => (this.users = data),
      error: (err) => console.error('Error fetching users:', err),
    });
  }
   // Method to get Sala name by ID
   getSalaName(salaId: number): string {
    const sala = this.salas.find(s => s.id === salaId);
    return sala ? sala.nombre : 'Unknown Sala';
  }

  // Method to get Usuario name by ID
  getUsuarioName(usuarioId: number): string {
    const user = this.users.find(u => u.id === usuarioId);
    return user ? user.nombre : 'Unknown User';
  }
  // Show the dialog for adding/editing a reserva
  showDialog(reserva?: Reserva): void {
    if (reserva) {
      this.selectedReserva = reserva;
      this.reservaForm.patchValue(reserva); // Pre-fill the form with the selected reserva
    } else {
      this.selectedReserva = null;
      this.reservaForm.reset(); // Reset the form for a new reserva
    }
    this.displayDialog = true;
  }

  // Hide the dialog
  hideDialog(): void {
    this.displayDialog = false;
    this.reservaForm.reset(); // Reset the form
  }

  // Handle form submission
  onSubmit(): void {
    if (this.reservaForm.invalid) {
      return;
    }

    const reservaData: Reserva = this.reservaForm.value;
    if (reservaData.id) {
      // Update an existing reserva
      this.reservaService.updateReserva(reservaData.id, reservaData).subscribe({
        next: () => {
          this.hideDialog();
          this.loadReservas(); // Refresh the table
        },
        error: (err) => console.error('Error updating reserva:', err),
      });
    } else {
      // Create a new reserva
      this.reservaService.createReserva(reservaData).subscribe({
        next: () => {
          this.hideDialog();
          this.loadReservas(); // Refresh the table
        },
        error: (err) => console.error('Error creating reserva:', err),
      });
    }
  }

  // Delete a reserva
  deleteReserva(reservaId: number): void {
    if (confirm('¿Estás seguro de eliminar esta reserva?')) {
      this.reservaService.deleteReserva(reservaId).subscribe({
        next: () => {
          this.loadReservas(); // Refresh the table
        },
        error: (err) => console.error('Error deleting reserva:', err),
      });
    }
  }
  liberarReserva(reservaId: number): void {
    if (confirm('¿Estás seguro de liberar esta reserva?')) {
      this.reservaService.liberarReserva(reservaId).subscribe({
        next: () => {
          this.loadReservas(); // Refresh the table
        },
        error: (err) => console.error('Error liberando reserva:', err),
      });
    }
  }
}
