import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ButtonComponent,
  PrioritySelectComponent,
  UserSelectComponent,
} from '@jira-clone/svg-icon';
import { NzModalRef } from 'ng-zorro-antd/modal';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IssuePriority, IssueType, User } from '@jira-clone/interface';
import { quillConfiguration } from '@jira-clone/config';
import { TypeSelectComponent } from '../../component/type-select/type-select.component';
import { QuillModule } from 'ngx-quill';
import { AssigneesSelectComponent } from '../../component/assignees-select/assignees-select.component';
import { UserStore } from '@jira-clone/home-data-access';

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
  private fb = inject(FormBuilder);
  private modalRef = inject(NzModalRef);
  private readonly userStore = inject(UserStore);
  readonly users = this.userStore.users;

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

  constructor() {
    this.initForm();

    effect(() => {});
  }

  initForm() {
    this.issueForm = this.fb.group({
      type: [IssueType.TASK, Validators.required],
      priority: [IssuePriority.MEDIUM, Validators.required],
      title: ['', [Validators.required]],
      description: [''],
      reporterId: [''],
      userIds: [[]],
    });
  }

  submitForm() {}

  cancel() {
    this.closeModal();
  }

  closeModal() {
    this.modalRef.close();
  }
}
