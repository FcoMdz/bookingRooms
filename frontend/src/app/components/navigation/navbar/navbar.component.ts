import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PrimeNGConfigType } from 'primeng/config';
import { MenubarModule } from 'primeng/menubar';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  imports: [CommonModule, MenubarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  items: MenuItem[] | undefined;
  isDarkMode = false;
  
  constructor(public authService: AuthService, private router: Router) {}
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  // Logout the user
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
  ngOnInit() {
    this.items = [
      {
        label: 'Reservations',
        icon: 'pi pi-calendar',
        routerLink: '/reservas', // Add routerLink for navigation
      },
      {
        label: 'Tables',
        icon: 'pi pi-table',
        routerLink: '/salas', // Add routerLink for navigation
      },
      {
        label: 'login',
        icon: 'pi pi-table',
        routerLink: '/login', // Add routerLink for navigation
      },
    ];
}
}
