import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './layout/navigation-workspace/navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { SvgDefinitionComponent } from '@jira-clone/svg-icon';

@Component({
  selector: 'lib-shell',
  imports: [CommonModule, NavigationComponent, RouterModule, SvgDefinitionComponent],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss'
})
export class ShellComponent {
  expanded = signal<boolean>(true);

  constructor() {
    effect(() => {
      console.log('Expanded state changed:', this.expanded());
    });

    this.handleResize();
  }

  handleResize() {
    const match = window.matchMedia('(min-width: 1024px)');

    this.expanded.set(match.matches);

    const handler = (e: MediaQueryListEvent) => {
      this.expanded.set(e.matches);
    };

    match.addEventListener('change', handler);

    return () => match.removeEventListener('change', handler);
  }

  manualToggle() {
    this.expanded.update((current) => !current);
  }
}
