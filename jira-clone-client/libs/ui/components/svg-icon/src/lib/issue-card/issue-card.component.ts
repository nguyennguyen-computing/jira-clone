import { Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IssueCreate,
  IssuePriority,
  IssueType,
  User,
} from '@jira-clone/interface';
import { AvatarComponent } from '../avatar/avatar.component';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzModalService } from 'ng-zorro-antd/modal';
import { IssueUtil } from '@jira-clone/util';

@Component({
  selector: 'issue-card',
  imports: [CommonModule, AvatarComponent, SvgIconComponent, NzToolTipModule],
  providers: [NzModalService],
  templateUrl: './issue-card.component.html',
  styleUrl: './issue-card.component.scss',
})
export class IssueCardComponent {
  issue = input.required<IssueCreate>();

  private modalService = inject(NzModalService);

  // Computed signals for reactive state
  // assignees = computed(() => {
  //   const users = this.projectService.users();
  //   return this.issue()
  //     .userIds.map((userId) => users.find((user: string) => user.id === userId))
  //     .filter((user): user is User => !!user);
  // });

  issueTypeIcon = computed(() =>
    IssueUtil.getIssueTypeIcon(this.issue().type as IssueType)
  );
  priorityIcon = computed(() =>
    IssueUtil.getIssuePriorityIcon(this.issue().priority as IssuePriority)
  );

  // openIssueModal(issueId: string) {
  //   this.modalService.create({
  //     nzContent: IssueModalComponent,
  //     nzWidth: 1040,
  //     nzClosable: false,
  //     nzFooter: null,
  //     nzComponentParams: {
  //       issue$: this.projectService.issueById$(issueId), // Assuming this returns an observable or signal
  //     },
  //   });
  // }
}
