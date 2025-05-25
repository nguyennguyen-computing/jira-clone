import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';
import { DeleteIssueModel, IssuePriority } from '@jira-clone/interface';
import { IssueTypeComponent } from '../../component/issue-type/issue-type.component';
import { ProjectDetailStore } from '@jira-clone/project-data-access';
import { IssueStore } from '@jira-clone/issue-data-access';
import { ButtonComponent } from '@jira-clone/svg-icon';
import { IssueTitleComponent } from '../../component/issue-title/issue-title.component';
import { IssueDescriptionComponent } from '../../component/issue-description/issue-description.component';
import { IssueCommentsComponent } from '../../component/issue-comments/issue-comments.component';
import { IssueStatusComponent } from '../../component/issue-status/issue-status.component';
import { IssueReporterComponent } from '../../component/issue-reporter/issue-reporter.component';
import { IssueAssigneesComponent } from '../../component/issue-assignees/issue-assignees.component';
import { IssuePriorityComponent } from '../../component/issue-priority/issue-priority.component';

@Component({
  selector: 'lib-issue-detail',
  imports: [
    CommonModule,
    IssueTypeComponent,
    ButtonComponent,
    IssueTitleComponent,
    IssueDescriptionComponent,
    IssueCommentsComponent,
    IssueStatusComponent,
    IssueReporterComponent,
    IssueAssigneesComponent,
    IssuePriorityComponent,
    IssuePriorityComponent,
  ],
  templateUrl: './issue-detail.component.html',
  styleUrl: './issue-detail.component.scss',
})
export class IssueDetailComponent {
  private _modal = inject(NzModalRef);
  private _router = inject(Router);
  private _projectStore = inject(ProjectDetailStore);
  private _issueStore = inject(IssueStore);

  readonly issue = this._issueStore.issue;

  closeModal() {
    this._modal.close();
  }

  openIssuePage(issueId: string) {
    this.closeModal();
    this._router.navigate(['project', 'issue', issueId]);
  }

  deleteIssue({ issueId, deleteModalRef }: DeleteIssueModel) {}
}
