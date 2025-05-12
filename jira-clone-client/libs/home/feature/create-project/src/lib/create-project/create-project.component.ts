import {
  Component,
  effect,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
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
import { ProjectStore, UserStore } from '@jira-clone/home-data-access';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { format } from 'date-fns';
import { AuthStore } from '@jira-clone/auth/data-access';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'lib-create-project',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    PrioritySelectComponent,
    QuillModule,
    UserSelectComponent,
    NzDatePickerModule,
    NzInputNumberModule,
    NzSelectModule,
  ],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.scss',
})
export class CreateProjectComponent {
  private readonly fb = inject(FormBuilder);
  private readonly _modalRef = inject(NzModalRef);
  private readonly userStore = inject(UserStore);
  private readonly authStore = inject(AuthStore);
  private readonly projectStore = inject(ProjectStore);
  private readonly _notification = inject(NzNotificationService);

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
  formatterDollar = (value: number): string =>
    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  parserDollar = (value: string): number =>
    parseFloat(value?.replace(/\$\s?|(,*)/g, ''));

  get priority(): FormControl {
    return this.projectForm.get('priority') as FormControl;
  }

  get owner(): FormControl {
    return this.projectForm.get('owner') as FormControl;
  }

  constructor() {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      owner: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      users: [[]],
      issues: [[]],
      status: ['READY', Validators.required],
      priority: ['Medium', Validators.required],
      budget: [0, [Validators.required]],
      endDate: ['', Validators.required],
    });

    effect(() => {
      if (this.projectStore.projectCreated()) {
        this._modalRef?.close();
        this.projectStore.resetProjectCreated();
        this._notification.create(
          'success',
          'Created project successfully.',
          ''
        );
      }
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleSubmit(): void {
    if (this.projectForm.valid) {
      const users = this.projectForm.value.users;
      users.push(this.authStore.currentUser()?._id);
      const projectData = {
        ...this.projectForm.value,
        endDate: format(new Date(this.projectForm.value.endDate), 'dd/MM/yyyy'),
        budget: String(this.projectForm.value.budget),
        users: users,
      };

      this.projectStore.createProject(projectData);
      this.projectForm.reset();
      this._modalRef.close();
    } else {
      Object.values(this.projectForm.controls).forEach((control) => {
        control.markAsDirty();
        control.updateValueAndValidity();
      });
    }
  }

  handleCancel(): void {
    this._modalRef.close();
    this.projectForm.reset();
  }

  closeModal(): void {
    this._modalRef.close();
  }
}
