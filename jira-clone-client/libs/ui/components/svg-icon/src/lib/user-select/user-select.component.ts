import {
  Component,
  effect,
  inject,
  model,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { User } from '@jira-clone/auth/data-access';
import { UserStore } from '@jira-clone/home-data-access';
import { UserComponentComponent } from '../user-component/user-component.component';

@Component({
  selector: 'lib-user-select',
  imports: [
    CommonModule,
    NzSelectModule,
    ReactiveFormsModule,
    UserComponentComponent,
    NzIconModule,
  ],
  templateUrl: './user-select.component.html',
  styleUrl: './user-select.component.scss',
})
export class UserSelectComponent {
  readonly userStore = inject(UserStore);
  readonly users = this.userStore.users;
  readonly isLoading = this.userStore.isLoading;

  control = model.required<FormControl>();

  constructor() {
    effect(() => {
      console.log('Users updated:', this.users());
    });
  }

  searchUsers(term: string): void {
    if (term) {
      this.userStore.searchUsers(term);
    }
  }

  getUser(userId: string): User | undefined {
    return this.users().find((user) => user.id === userId);
  }
}
