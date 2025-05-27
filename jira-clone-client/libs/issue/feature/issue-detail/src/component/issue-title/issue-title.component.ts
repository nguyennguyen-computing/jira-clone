import { Component, effect, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueCreate } from '@jira-clone/interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';
import { IssueStore } from '@jira-clone/issue-data-access';

@Component({
  selector: 'issue-title',
  imports: [CommonModule, ReactiveFormsModule, TextFieldModule],
  templateUrl: './issue-title.component.html',
  styleUrl: './issue-title.component.scss',
})
export class IssueTitleComponent {
  private readonly _issueStore = inject(IssueStore);

  issue = input.required<IssueCreate>();
  titleControl!: FormControl;

  constructor() {
    effect(() => {
      this.titleControl = new FormControl(this.issue().title);
    });
  }

  onBlur(): void {
    if (!this.issue()._id) {
      return;
    }
    const issueId = this.issue()._id;
    if (issueId) {
      this._issueStore.updateIssue({
        issueId,
        updateData: {
          title: this.titleControl.value,
        },
      });
    }
  }
}
