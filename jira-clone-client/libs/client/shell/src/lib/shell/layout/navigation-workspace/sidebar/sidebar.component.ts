import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SideBarLink } from '../../models/sidebar-link.interface';
import { SideBarLinks } from '../../models/sidebar-link.const';
import { SvgIconComponent } from '@jira-clone/svg-icon';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule, SvgIconComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  expanded = input.required<boolean>();

  sidebarWidth = computed(() => (this.expanded() ? 240 : 15));

  sideBarLinks: SideBarLink[] = [];

  constructor() {}

  ngOnInit(): void {
    // Initialize sideBarLinks
    this.sideBarLinks = SideBarLinks;
  }
}
