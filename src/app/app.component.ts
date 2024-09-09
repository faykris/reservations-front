import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NavigationTabsComponent } from './components/navigation-tabs/navigation-tabs.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatSlideToggleModule, RouterOutlet, NavigationTabsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'reservations';
}
