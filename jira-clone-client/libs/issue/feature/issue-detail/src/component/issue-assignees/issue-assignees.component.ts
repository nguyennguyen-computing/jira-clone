import { Component, input, effect } from '@angular/core';

import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IssueCreate, User } from '@jira-clone/interface';
import { UserComponentComponent } from 'libs/ui/components/svg-icon/src/lib/user-component/user-component.component';
import { ButtonComponent, SvgIconComponent } from '@jira-clone/svg-icon';

@Component({
  selector: 'issue-assignees',
  standalone: true,
  imports: [
    NzDropDownModule,
    NzMenuModule,
    NzIconModule,
    UserComponentComponent,
    ButtonComponent,
    SvgIconComponent,
  ],
  templateUrl: './issue-assignees.component.html',
  styleUrls: ['./issue-assignees.component.scss'],
})
export class IssueAssigneesComponent {
  issue = input.required<IssueCreate>();
  users = input.required<User[]>();

  constructor() {
    effect(() => {
      console.log('Issue or users changed:', this.issue(), this.users());
    });
  }

  removeUser(userId: string): void {
    const newUserIds = this.issue().userIds.filter((id) => id._id !== userId);
  }

  addUserToIssue(user: User): void {}

  isUserSelected(user: User): boolean {
    return this.issue().userIds.find((id) => id._id === user._id) !== undefined;
  }
}
