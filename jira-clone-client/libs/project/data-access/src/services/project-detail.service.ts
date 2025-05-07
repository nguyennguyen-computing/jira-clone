import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '@jira-clone/http-client';
import { HttpParams } from '@angular/common/http';
import { Project } from '../project.model';

@Injectable({ providedIn: 'root' })
export class ProjectDetailService {
  private readonly apiService = inject(ApiService);

  getProject(id: string): Observable<Project> {
    return this.apiService.get<Project>(`/projects/${id}`);
  }
}
