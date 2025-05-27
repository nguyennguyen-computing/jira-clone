import {
  Component,
  effect,
  inject,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ButtonComponent } from '@jira-clone/svg-icon';
import { IssueCreate } from '@jira-clone/interface';
import { quillConfiguration } from '@jira-clone/config';
import { IssueStore } from '@jira-clone/issue-data-access';

@Component({
  selector: 'issue-description',
  standalone: true,
  imports: [ReactiveFormsModule, QuillModule, NzIconModule, ButtonComponent],
  templateUrl: './issue-description.component.html',
  styleUrls: ['./issue-description.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class IssueDescriptionComponent {
  private readonly _issueStore = inject(IssueStore);
  issue = input.required<IssueCreate>();

  descriptionControl = new FormControl<string>('');

  editorOptions = quillConfiguration;

  isEditing = signal<boolean>(false);
  isWorking = signal<boolean>(false);

  constructor() {
    effect(() => {
      this.descriptionControl.setValue(this.issue().description ?? '');
    });
  }

  setEditMode(mode: boolean): void {
    this.isEditing.set(mode);
  }

  editorCreated(editor: any): void {
    if (editor?.focus) {
      editor.focus();
    }
  }

  save(): void {
    this.isWorking.set(true);
    this.isWorking.set(false);
    this._issueStore.updateIssue({
      issueId: this.issue()._id,
      updateData: {
        description: this.descriptionControl.value,
      },
    });
    this.setEditMode(false);
  }

  cancel(): void {
    this.descriptionControl.setValue(this.issue().description ?? '');
    this.setEditMode(false);
  }
}
