import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ListProjectResponse,
  ProjectRequest,
  ProjectResponse,
} from '../models/project.interface';
import { ApiService } from '@jira-clone/http-client';
import { HttpParams } from '@angular/common/http';
import { User } from '@jira-clone/auth/data-access';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly apiService = inject(ApiService);

  searchUser(name: string): Observable<User[]> {
    const params = new HttpParams().set('name', name);

    return this.apiService.get('/users/search', params);
  }
}
