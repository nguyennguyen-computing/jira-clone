import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  ButtonComponent,
  PrioritySelectComponent,
  UserSelectComponent,
} from '@jira-clone/svg-icon';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { QuillModule } from 'ngx-quill';
import { quillConfiguration } from '@jira-clone/config';
import { UserStore } from '@jira-clone/home-data-access';

@Component({
  selector: 'lib-create-project',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    PrioritySelectComponent,
    QuillModule,
    UserSelectComponent,
  ],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.scss',
})
export class CreateProjectComponent {
  private readonly fb = inject(FormBuilder);
  private readonly _modalRef = inject(NzModalRef);
  private readonly userStore = inject(UserStore);
  readonly editorOptions = quillConfiguration;
  readonly listUsers = this.userStore.users;
  readonly categories = [
    'Software Project',
    'Business Project',
    'Marketing Project',
  ];

  @Output() createProject = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  @Input() isVisible = true;

  projectForm: FormGroup;
  searchControl = new FormControl<string | null>('', { nonNullable: true });

  get priority(): FormControl {
    return this.projectForm.get('priority') as FormControl;
  }

  constructor() {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      category: ['Software Project'],
      users: [[]],
      issues: [[]],
      searchOwnerTerm: [''],
      priority: [''],
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    if (this.projectForm.valid) {
      const projectData = {
        ...this.projectForm.value,
        users: this.projectForm.value.users.map((userId: string) => userId),
        issues: this.projectForm.value.issues.map((issueId: string) => issueId),
      };
      this.createProject.emit(projectData);
      this.isVisible = false;
      this.projectForm.reset();
    } else {
      Object.values(this.projectForm.controls).forEach((control) => {
        control.markAsDirty();
        control.updateValueAndValidity();
      });
    }
  }

  handleCancel(): void {
    this.isVisible = false;
    this.cancel.emit();
    this.projectForm.reset();
  }

  closeModal(): void {
    this._modalRef.close();
  }
}
