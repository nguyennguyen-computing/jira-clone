import { Component, effect, inject, input, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { IssueStatus, IssueStatusDisplay } from '../../models';
import {
  ProjectDetailService,
  ProjectDetailStore,
} from '@jira-clone/project-data-access';
import { ActivatedRoute } from '@angular/router';
import { IssueCreate } from '@jira-clone/interface';
import { IssueCardComponent } from '@jira-clone/svg-icon';
import { NzModalService } from 'ng-zorro-antd/modal';
import { IssueDetailComponent } from '@jira-clone/issue-detail';
import { IssueStore } from '@jira-clone/issue-data-access';

@Component({
  selector: '[board-dnd-list]',
  standalone: true,
  imports: [CommonModule, DragDropModule, IssueCardComponent],
  providers: [NzModalService],
  templateUrl: './board-dnd-list.component.html',
  styleUrl: './board-dnd-list.component.scss',
})
export class BoardDndListComponent {
  readonly projectDetailStore = inject(ProjectDetailStore);

  private _modalService = inject(NzModalService);
  private _issueStore = inject(IssueStore);

  status = input<IssueStatus>();
  issues = input<IssueCreate[]>();

  IssueStatusDisplay = IssueStatusDisplay;
  IssueStatus = IssueStatus;

  constructor() {
    effect(() => {
      console.log(this._issueStore.issue());
    });
  }

  drop(event: CdkDragDrop<IssueCreate[]>) {
    let newIssue: IssueCreate = { ...event.item.data };
    let newIssues = [...event.container.data];

    if (event.previousContainer === event.container) {
      moveItemInArray(newIssues, event.previousIndex, event.currentIndex);
      newIssues = newIssues.map((issue, index) => ({
        ...issue,
        listPosition: index + 1,
        projectId: newIssue.projectId,
        userIds: issue.userIds.map((user) => user._id) as string[],
        reporterId: issue.reporterId._id,
      })) as unknown as IssueCreate[];

      this.projectDetailStore.updateIssuesStatus(newIssue.status, newIssues);
    } else {
      newIssue.status = event.container.id as IssueStatus;
      transferArrayItem(
        event.previousContainer.data,
        newIssues,
        event.previousIndex,
        event.currentIndex
      );

      const previousIssues = event.previousContainer.data.map(
        (issue, index) => ({
          ...issue,
          listPosition: index + 1,
          projectId: newIssue.projectId,
        })
      );

      newIssues = newIssues.map((issue, index) => ({
        ...issue,
        listPosition: index + 1,
        status: newIssue.status,
        projectId: newIssue.projectId,
        userIds: issue.userIds,
        reporterId: issue.reporterId._id,
      })) as unknown as IssueCreate[];
      newIssue = {
        ...newIssues[event.currentIndex],
        status: newIssue.status,
        listPosition: event.currentIndex + 1,
        userIds: newIssues[event.currentIndex].userIds.map(
          (user) => user._id
        ) as string[],
        reporterId: newIssues[event.currentIndex].reporterId._id,
      } as unknown as IssueCreate;
      newIssues[event.currentIndex] = newIssue;
      this.projectDetailStore.updateIssuesOrder(
        event.previousContainer.id as IssueStatus,
        previousIssues
      );
      this.projectDetailStore.updateIssuesStatus(newIssue.status, newIssues);
    }
  }

  openIssueModal(issueId: string) {
    this._issueStore.getIssueById(issueId);
    this._modalService.create({
      nzContent: IssueDetailComponent,
      nzWidth: 1040,
      nzClosable: false,
      nzFooter: null,
      nzData: {
        issue: this._issueStore.issue(),
      },
    });
  }
}
