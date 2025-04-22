import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@jira-clone/http-client';
import { AuthModel, AuthResponse, RegisterResponse } from '../auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiService = inject(ApiService);

  register(credentials: AuthModel): Observable<RegisterResponse> {
    return this.apiService.post('/auth/register', credentials);
  }

  login(credentials: AuthModel): Observable<AuthResponse> {
    return this.apiService.post('/auth/login', credentials);
  }
}
