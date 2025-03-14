import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [RouterModule,FormsModule,ReactiveFormsModule, CardModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Initialize the form
    this.signUpForm = this.fb.group({
      nombre: ['', [Validators.required]], 
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Getter for easy access to form fields
  get nombre() {
    return this.signUpForm.get('nombre');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  onSubmit(): void {
    if (this.signUpForm.invalid) {
      return; // Stop if the form is invalid
    }
  
    const userData = this.signUpForm.value;
    console.log('Sending data to backend:', userData); // Debugging: Log the data
  
    this.authService.register(userData).subscribe({
      next: (response) => {
        alert('Registration successful! Please log in.');
        this.router.navigate(['/login']); // Redirect to the login page
      },
      error: (err) => {
        console.error('Registration failed:', err);
        alert('Registration failed. Please try again.');
      },
    });
  }
}
