import { Component, input } from '@angular/core';
import { IssueCommentComponent } from '../issue-comment/issue-comment.component';
import { IssueCreate } from '@jira-clone/interface';

@Component({
  selector: 'issue-comments',
  standalone: true,
  imports: [IssueCommentComponent],
  templateUrl: './issue-comments.component.html',
  styleUrls: ['./issue-comments.component.scss'],
})
export class IssueCommentsComponent {
  issue = input<IssueCreate | null>(null);
}
