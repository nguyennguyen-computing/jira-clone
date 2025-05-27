import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '@jira-clone/http-client';
import { IssueCreate } from '@jira-clone/interface';

@Injectable({ providedIn: 'root' })
export class IssuesService {
  private readonly apiService = inject(ApiService);

  createIssue(body: IssueCreate): Observable<IssueCreate> {
    return this.apiService.post(`/issues`, body);
  }

  getIssueById(issueId: string): Observable<IssueCreate> {
    return this.apiService.get(`/issues/${issueId}`);
  }

  updateIssue(
    issueId?: string,
    body?: { status?: string; listPosition?: number; [key: string]: any }
  ): Observable<IssueCreate> {
    return this.apiService.patch(`/issues/${issueId}`, body);
  }
}
