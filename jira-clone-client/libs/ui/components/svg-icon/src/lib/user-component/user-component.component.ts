import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '../avatar/avatar.component';
import { User } from '@jira-clone/auth/data-access';

@Component({
  selector: 'lib-user-component',
  imports: [CommonModule, AvatarComponent],
  templateUrl: './user-component.component.html',
  styleUrl: './user-component.component.scss',
})
export class UserComponentComponent {
  user = input<User | null>();
}
