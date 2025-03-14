import { Routes } from '@angular/router';
import { SalaComponent } from './components/sala/sala.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'salas', component: SalaComponent , canActivate: [AuthGuard]},
    { path: 'reservas', component: ReservaComponent , canActivate: [AuthGuard]},
    { path: '', redirectTo: '/salas', pathMatch: 'full' },
];
