import { Component, input, signal } from '@angular/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { ButtonComponent } from '@jira-clone/svg-icon';
import {
  IssueCreate,
  IssueStatus,
  IssueStatusDisplay,
} from '@jira-clone/interface';

interface IssueStatusValueTitle {
  value: IssueStatus;
  label: string;
}

@Component({
  selector: 'issue-status',
  standalone: true,
  imports: [NzDropDownModule, NzMenuModule, ButtonComponent],
  templateUrl: './issue-status.component.html',
  styleUrls: ['./issue-status.component.scss'],
})
export class IssueStatusComponent {
  issue = input.required<IssueCreate>();

  issueStatuses = signal<IssueStatusValueTitle[]>([
    {
      value: IssueStatus.BACKLOG,
      label: IssueStatusDisplay[IssueStatus.BACKLOG],
    },
    {
      value: IssueStatus.SELECTED,
      label: IssueStatusDisplay[IssueStatus.SELECTED],
    },
    {
      value: IssueStatus.IN_PROGRESS,
      label: IssueStatusDisplay[IssueStatus.IN_PROGRESS],
    },
    { value: IssueStatus.DONE, label: IssueStatusDisplay[IssueStatus.DONE] },
  ]);

  IssueStatusDisplay = IssueStatusDisplay;
  variants = {
    [IssueStatus.BACKLOG]: 'btn-secondary',
    [IssueStatus.SELECTED]: 'btn-secondary',
    [IssueStatus.IN_PROGRESS]: 'btn-primary',
    [IssueStatus.DONE]: 'btn-success',
  };

  constructor() {}

  updateIssue(status: IssueStatus): void {}

  isStatusSelected(status: IssueStatus): boolean {
    return this.issue().status === status;
  }
}
