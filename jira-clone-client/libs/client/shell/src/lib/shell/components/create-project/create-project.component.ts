import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-create-project',
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.scss',
})
export class CreateProjectComponent {
  @Output() createProject = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  @Input() isVisible = true;

  projectForm: FormGroup;

  categories = ['Software Project', 'Business Project', 'Marketing Project'];
  constructor(private fb: FormBuilder) {
    this.projectForm = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      url: [''],
      description: [''],
      category: ['Software Project'],
      users: [[]],
      issues: [[]],
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
}
