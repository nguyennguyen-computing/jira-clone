import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IssueCreate,
  IssueType,
  IssueTypeWithIcon,
} from '@jira-clone/interface';
import { IssueUtil } from '@jira-clone/util';
import { ProjectDetailStore } from '@jira-clone/project-data-access';
import { ProjectConst } from '@jira-clone/config';
import { ButtonComponent, SvgIconComponent } from '@jira-clone/svg-icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'issue-type',
  imports: [CommonModule, ButtonComponent, NzDropDownModule, SvgIconComponent],
  templateUrl: './issue-type.component.html',
  styleUrl: './issue-type.component.scss',
})
export class IssueTypeComponent {
  issue = input.required<IssueCreate>();

  private _projectService = inject(ProjectDetailStore);

  issueTypes: IssueTypeWithIcon[] = ProjectConst.IssueTypesWithIcon;

  get selectedIssueTypeIcon(): string {
    return IssueUtil.getIssueTypeIcon(this.issue().type as IssueType);
  }

  updateIssue(issueType: IssueType): void {}

  isTypeSelected(type: IssueType): boolean {
    return this.issue().type === type;
  }
}
