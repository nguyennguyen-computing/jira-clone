import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarLeftComponent } from '../navbar-left/navbar-left.component';
import { ResizerComponent } from '../resizer/resizer.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-navigation',
  imports: [
    CommonModule,
    NavbarLeftComponent,
    ResizerComponent,
    SidebarComponent,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  expanded = input.required<boolean>();

  manualToggle = output<void>();

  constructor() {}

  toggle() {
    this.manualToggle.emit();
  }
}
