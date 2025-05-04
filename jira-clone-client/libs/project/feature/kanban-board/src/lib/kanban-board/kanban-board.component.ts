import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from '@jira-clone/svg-icon';

@Component({
  selector: 'lib-kanban-board',
  imports: [CommonModule, BreadcrumbsComponent],
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.scss',
})
export class KanbanBoardComponent {
  breadcrumbs: string[] = ['Projects', 'Angular Jira Clone', 'Kanban Board'];
}
