import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { IssueStatus } from '../../models';
import { BreadcrumbsComponent, ButtonComponent } from '@jira-clone/svg-icon';
import { FilterBoardComponent } from '../../components/filter-board/filter-board.component';
import { BoardDndListComponent } from '../../components/board-dnd-list/board-dnd-list.component';
import {
  ProjectDetailService,
  ProjectDetailStore,
} from '@jira-clone/project-data-access';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'board-dnd',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    ButtonComponent,
    BreadcrumbsComponent,
    FilterBoardComponent,
    BoardDndListComponent,
  ],
  templateUrl: `./kanban-board.component.html`,
  styleUrls: ['./kanban-board.component.scss'],
})
export class KanbanBoardComponent {
  readonly projectDetailStore = inject(ProjectDetailStore);

  breadcrumbs: string[] = ['Projects', 'Angular Jira Clone', 'Kanban Board'];

  private readonly route = inject(ActivatedRoute);

  issueStatuses = signal<IssueStatus[]>([
    IssueStatus.BACKLOG,
    IssueStatus.SELECTED,
    IssueStatus.IN_PROGRESS,
    IssueStatus.DONE,
  ]);

  get issues$() {
    return this.projectDetailStore.issues;
  }

  constructor() {
    const projectId = this.route.snapshot.paramMap.get('id') || '';
    this.projectDetailStore.fetchProject(projectId);

    this.projectDetailStore.getIssuesByProjectId(projectId);
  }
}
