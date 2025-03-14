import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { SalasServiceService } from '../../services/salas-service.service';
import { Sala } from '../../entities/Sala';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
    standalone:true,
    selector: 'app-sala',
    imports: [CommonModule, TableModule, ButtonModule, DialogModule, FormsModule, ReactiveFormsModule],
    templateUrl: './sala.component.html',
    styleUrl: './sala.component.scss'
})
export class SalaComponent implements OnInit {
  displayDialog = false; // Controls dialog visibility
  salaForm: FormGroup; // Reactive form
  salas: Sala[] = []; // List of salas
  selectedSala: Sala | null = null; // Selected sala for editing

  constructor(
    private fb: FormBuilder,
    private salaService: SalasServiceService
  ) {
    this.salaForm = this.fb.group({
      id:[0],
      nombre: ['', Validators.required],
      descripcion: [''],
      capacidad: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.loadSalas();
  }

  

  // Load salas from the backend
  loadSalas(): void {
    this.salaService.getSalas().subscribe({
      next: (data) => (this.salas = data),
      error: (err) => console.error('Error fetching salas:', err),
    });
  }

  // Show the dialog
  showDialog(sala?: Sala): void {
    if (sala) {
      this.selectedSala = sala;
      this.salaForm.patchValue(sala); // Pre-fill the form with the selected sala
    } else {
      this.selectedSala = null;
      this.salaForm.reset(); // Reset the form for a new sala
    }
    this.displayDialog = true;
  }

  // Hide the dialog
  hideDialog(): void {
    this.displayDialog = false;
    this.salaForm.reset(); // Reset the form
  }

  // Handle form submission
  onSubmit(): void {
    if (this.salaForm.invalid) {
      return;
    }

    const salaData: Sala = this.salaForm.value;
    if (salaData.id) {
      // Update an existing sala
      this.salaService.updateSala(salaData.id, salaData).subscribe({
        next: () => {
          this.hideDialog();
          this.loadSalas(); // Refresh the table
        },
        error: (err) => console.error('Error updating sala:', err),
      });
    } else {
      // Create a new sala
      this.salaService.createSala(salaData).subscribe({
        next: () => {
          this.hideDialog();
          this.loadSalas(); // Refresh the table
        },
        error: (err) => console.error('Error creating sala:', err),
      });
    }
  }

  // Delete a sala
  deleteSala(salaId: number): void {
    if (confirm('¿Estás seguro de eliminar esta sala?')) {
      this.salaService.deleteSala(salaId).subscribe({
        next: () => {
          this.loadSalas(); // Refresh the table
        },
        error: (err) => console.error('Error deleting sala:', err),
      });
    }
  }
}