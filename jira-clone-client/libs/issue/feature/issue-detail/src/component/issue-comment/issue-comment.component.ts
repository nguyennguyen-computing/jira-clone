import {
  Component,
  input,
  signal,
  viewChild,
  ElementRef,
  inject,
  effect,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';
import { AsyncPipe, DatePipe } from '@angular/common';
import { AvatarComponent, ButtonComponent } from '@jira-clone/svg-icon';
import { User } from '@jira-clone/interface';
import { AuthStore } from '@jira-clone/auth/data-access';

interface CommentHistory {
  id: string;
  body: string;
  updatedAt: string;
}

interface Comment {
  id: string;
  issueId: string;
  user: User;
  body: string;
  createdAt: string;
  updatedAt: string;
  history?: CommentHistory[]; // Optional for @for example
}

@Component({
  selector: 'issue-comment',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TextFieldModule,
    AsyncPipe,
    DatePipe,
    AvatarComponent,
    ButtonComponent,
  ],
  templateUrl: './issue-comment.component.html',
  styleUrls: ['./issue-comment.component.scss'],
})
export class IssueCommentComponent {
  private readonly _authStore = inject(AuthStore);
  issueId = input<string>();
  comment = input<Comment | null>(null);
  createMode = input<boolean>(false);

  user = this._authStore.user;
  isEditing = signal<boolean>(false);

  commentControl = new FormControl<string>('');

  commentBoxRef = viewChild<ElementRef>('commentBoxRef');

  constructor() {
    effect(() => {
      if (this.createMode()) {
        const user = this.user();
      }
    });

    window.addEventListener('keyup', this.handleKeyUp.bind(this));
  }

  private handleKeyUp(event: KeyboardEvent): void {
    if (!this.createMode() || this.isEditing()) return;
    if (event.key === 'M') {
      this.commentBoxRef()?.nativeElement.focus();
      this.isEditing.set(true);
    }
  }

  setCommentEdit(mode: boolean): void {
    this.isEditing.set(mode);
  }

  addComment(): void {
    const now = new Date();
    const commentData = {
      ...this.comment()!,
      id: `${now.getTime()}`,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      body: this.commentControl.value ?? '',
      history: [
        ...(this.comment()?.history ?? []),
        {
          id: crypto.randomUUID(),
          body: this.commentControl.value ?? '',
          updatedAt: now.toISOString(),
        },
      ],
    };
    this.cancelAddComment();
  }

  cancelAddComment(): void {
    this.commentControl.setValue('');
    this.setCommentEdit(false);
  }

  ngOnDestroy(): void {
    window.removeEventListener('keyup', this.handleKeyUp.bind(this));
  }
}
