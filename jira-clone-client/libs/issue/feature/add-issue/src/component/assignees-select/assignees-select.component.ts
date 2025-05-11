import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { UserComponentComponent } from 'libs/ui/components/svg-icon/src/lib/user-component/user-component.component';
import { User } from '@jira-clone/interface';

@Component({
  selector: 'lib-assignees-select',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzSelectModule,
    UserComponentComponent,
  ],
  template: `
    <nz-select
      class="w-full"
      [formControl]="control()"
      nzMode="multiple"
      [nzCustomTemplate]="assigneesSelectedTmpl"
      [nzNotFoundContent]="noUserFoundTmpl"
      nzNoAnimation
    >
      @for (user of users(); track user.id) {
      <nz-option nzCustomContent [nzValue]="user.id" [nzLabel]="user.name">
        <lib-user-component [user]="user"></lib-user-component>
      </nz-option>
      }
    </nz-select>

    <ng-template #assigneesSelectedTmpl let-selected>
      <lib-user-component
        [user]="getUser(selected.nzValue)"
      ></lib-user-component>
    </ng-template>

    <ng-template #noUserFoundTmpl> No user found. </ng-template>
  `,
  styleUrl: './assignees-select.component.scss',
})
export class AssigneesSelectComponent {
  control = input.required<FormControl>();
  users = input<User[]>([]);

  getUser(userId: string): User | undefined {
    return this.users().find((user) => user.id === userId);
  }
}
