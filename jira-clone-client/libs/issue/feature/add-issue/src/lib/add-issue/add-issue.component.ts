import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ButtonComponent,
  PrioritySelectComponent,
  UserSelectComponent,
} from '@jira-clone/svg-icon';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IssuePriority,
  IssueStatus,
  IssueType,
  User,
} from '@jira-clone/interface';
import { quillConfiguration } from '@jira-clone/config';
import { TypeSelectComponent } from '../../component/type-select/type-select.component';
import { QuillModule } from 'ngx-quill';
import { AssigneesSelectComponent } from '../../component/assignees-select/assignees-select.component';
import { ProjectDetailStore } from '@jira-clone/project-data-access';
import { IssueStore } from '@jira-clone/issue-data-access';

@Component({
  selector: 'lib-add-issue',
  imports: [
    CommonModule,
    ButtonComponent,
    ReactiveFormsModule,
    TypeSelectComponent,
    PrioritySelectComponent,
    QuillModule,
    UserSelectComponent,
    AssigneesSelectComponent,
  ],
  templateUrl: './add-issue.component.html',
  styleUrl: './add-issue.component.scss',
})
export class AddIssueComponent {
  private readonly _modalRef = inject(NzModalRef);
  private readonly _notification = inject(NzNotificationService);
  private fb = inject(FormBuilder);
  private modalRef = inject(NzModalRef);
  private readonly projectStore = inject(ProjectDetailStore);
  private readonly issueStore = inject(IssueStore);
  readonly usersInProject = this.projectStore.usersInProject;

  isVisible = signal(true);
  issueForm!: FormGroup;
  reporterUsers = signal<User[]>([]);
  assignees = signal<User[]>([]);
  priorities = signal(Object.values(IssuePriority));
  editorOptions = quillConfiguration;

  get f() {
    return this.issueForm.controls;
  }

  get type(): FormControl {
    return this.issueForm.get('type') as FormControl;
  }

  get priority(): FormControl {
    return this.issueForm.get('priority') as FormControl;
  }

  get reporterId(): FormControl {
    return this.issueForm.get('reporterId') as FormControl;
  }

  get userIds(): FormControl {
    return this.issueForm.get('userIds') as FormControl;
  }

  constructor() {
    this.initForm();

    effect(() => {
      if (this.issueStore.issueCreated()) {
        this._modalRef?.close();
        this.issueStore.resetIssueCreated();
        this._notification.create('success', 'Created issue successfully.', '');
      }
    });
  }

  initForm() {
    this.issueForm = this.fb.group({
      type: [IssueType.TASK, Validators.required],
      priority: [IssuePriority.MEDIUM, Validators.required],
      status: [IssueStatus.BACKLOG, Validators.required],
      title: ['', [Validators.required]],
      projectId: [this.projectStore.project()?._id, Validators.required],
      description: [''],
      reporterId: [''],
      userIds: [[]],
    });
  }

  submitForm() {
    this.issueStore.createIssue(this.issueForm.value);
  }

  cancel() {
    this.closeModal();
  }

  closeModal() {
    this.modalRef.close();
  }
}
