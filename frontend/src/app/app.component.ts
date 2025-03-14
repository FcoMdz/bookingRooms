import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navigation/navbar/navbar.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, CommonModule, NavbarComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Book Rooms';
  
}
