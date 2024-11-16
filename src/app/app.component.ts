import { Component } from '@angular/core';
import { SidebarComponent } from './shared/components/Navbar/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'POS-frontend';
}
