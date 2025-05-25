import { Component, input, signal, computed } from '@angular/core';

import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { UserComponentComponent } from 'libs/ui/components/svg-icon/src/lib/user-component/user-component.component';
import { ButtonComponent } from '@jira-clone/svg-icon';
import { IssueCreate, User } from '@jira-clone/interface';

@Component({
  selector: 'issue-reporter',
  standalone: true,
  imports: [
    NzDropDownModule,
    NzMenuModule,
    UserComponentComponent,
    ButtonComponent,
  ],
  templateUrl: './issue-reporter.component.html',
  styleUrls: ['./issue-reporter.component.scss'],
})
export class IssueReporterComponent {
  issue = input.required<IssueCreate>();
  users = input.required<User[]>();

  reporter = computed(() => {
    return (
      this.users().find((user) => user._id === this.issue().reporterId._id) ||
      null
    );
  });

  constructor() {}

  isUserSelected(user: User): boolean {
    return user._id === this.issue().reporterId._id;
  }

  updateIssue(user: User): void {}
}
