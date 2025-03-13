import { Routes } from '@angular/router';
import { SalaComponent } from './components/sala/sala.component';
import { ReservaComponent } from './components/reserva/reserva.component';

export const routes: Routes = [
    { path: 'salas', component: SalaComponent },
    { path: 'reservas', component: ReservaComponent },
    { path: '', redirectTo: '/salas', pathMatch: 'full' },
];
