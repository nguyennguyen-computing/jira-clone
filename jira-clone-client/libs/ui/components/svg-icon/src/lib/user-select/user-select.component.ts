import {
  Component,
  computed,
  effect,
  inject,
  input,
  model,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
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
  ],
  templateUrl: './user-select.component.html',
  styleUrl: './user-select.component.scss',
})
export class UserSelectComponent {
  readonly userStore = inject(UserStore);
  readonly users = this.userStore.users;

  control = model.required<FormControl>();

  constructor() {}

  searchUsers(term: string): void {
    if (term) {
      this.userStore.searchUsers(term);
    }
  }

  getUser(userId: string): User | undefined {
    return this.users().find((user) => user.id === userId);
  }
}
