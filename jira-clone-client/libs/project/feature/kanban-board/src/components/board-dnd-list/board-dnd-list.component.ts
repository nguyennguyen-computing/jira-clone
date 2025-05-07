import { Component, inject, input, OnInit } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { IssueStatus, IssueStatusDisplay } from '../../models';
import { ProjectDetailService } from '@jira-clone/project-data-access';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: '[board-dnd-list]',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './board-dnd-list.component.html',
  styleUrl: './board-dnd-list.component.scss',
})
export class BoardDndListComponent {
  status = input<IssueStatus>();

  IssueStatusDisplay = IssueStatusDisplay;
  IssueStatus = IssueStatus;
}
