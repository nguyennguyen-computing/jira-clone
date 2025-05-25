import { Component, input, signal, computed } from '@angular/core';
import { ProjectConst } from '@jira-clone/config';
import { IssueCreate, IssuePriority, IssuePriorityIcon } from '@jira-clone/interface';
import { ButtonComponent, SvgIconComponent } from '@jira-clone/svg-icon';
import { IssueUtil } from '@jira-clone/util';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';


@Component({
  selector: 'issue-priority',
  standalone: true,
  imports: [NzDropDownModule, NzMenuModule, ButtonComponent, SvgIconComponent],
  templateUrl: './issue-priority.component.html',
  styleUrls: ['./issue-priority.component.scss'],
})
export class IssuePriorityComponent {
  issue = input.required<IssueCreate>();

  priorities = signal<IssuePriorityIcon[]>(ProjectConst.PrioritiesWithIcon);

  selectedPriority = computed(() => this.issue().priority);
  selectedPriorityIcon = computed(() =>
    IssueUtil.getIssuePriorityIcon(this.selectedPriority())
  );

  constructor() {}

  isPrioritySelected(priority: IssuePriority): boolean {
    return priority === this.selectedPriority();
  }

  updateIssue(priority: IssuePriority): void {}
}
