import { Component, inject, input, OnInit } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { IssueStatus, IssueStatusDisplay } from '../../models';
import { ProjectDetailService } from '@jira-clone/project-data-access';
import { ActivatedRoute } from '@angular/router';
import { IssueCreate } from '@jira-clone/interface';
import { IssueCardComponent } from '@jira-clone/svg-icon';

@Component({
  selector: '[board-dnd-list]',
  standalone: true,
  imports: [CommonModule, DragDropModule, IssueCardComponent],
  templateUrl: './board-dnd-list.component.html',
  styleUrl: './board-dnd-list.component.scss',
})
export class BoardDndListComponent {
  status = input<IssueStatus>();
  issues = input<IssueCreate[]>();

  IssueStatusDisplay = IssueStatusDisplay;
  IssueStatus = IssueStatus;

  drop(event: CdkDragDrop<IssueCreate[]>) {
    const newIssue: IssueCreate = { ...event.item.data };
    const newIssues = [...event.container.data];
    if (event.previousContainer === event.container) {
      moveItemInArray(newIssues, event.previousIndex, event.currentIndex);
      console.log(event)
      // this.updateListPosition(newIssues);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        newIssues,
        event.previousIndex,
        event.currentIndex
      );
      console.log(event)
      // this.updateListPosition(newIssues);
      newIssue.status = event.container.id as IssueStatus;
      // this._projectService.updateIssue(newIssue);
    }
  }
}
