import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ListProjectResponse,
  ProjectRequest,
  ProjectResponse,
} from '../models/project.interface';
import { ApiService } from '@jira-clone/http-client';
import { HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private readonly apiService = inject(ApiService);

  createProject(project: ProjectRequest): Observable<ProjectResponse> {
    return this.apiService.post('/projects', project);
  }

  getProjects(
    userId: string,
    page: number,
    limit: number,
    name: string = '',
    status: string[] = []
  ): Observable<ListProjectResponse> {
    const params = new HttpParams()
      .set('userId', userId)
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('name', name)
      .set('status', status.join(','));
    return this.apiService.get<ListProjectResponse>('/projects', params);
  }
}
