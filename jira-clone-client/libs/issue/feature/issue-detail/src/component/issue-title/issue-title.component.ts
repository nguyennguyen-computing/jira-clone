import { Component, effect, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueCreate } from '@jira-clone/interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';

@Component({
  selector: 'issue-title',
  imports: [CommonModule, ReactiveFormsModule, TextFieldModule],
  templateUrl: './issue-title.component.html',
  styleUrl: './issue-title.component.scss',
})
export class IssueTitleComponent {
  issue = input.required<IssueCreate>();
  titleControl!: FormControl;

  constructor() {
    effect(() => {
      this.titleControl = new FormControl(this.issue().title)
    })
  }


  onBlur() {}
}
