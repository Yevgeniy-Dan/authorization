import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  User,
  UserLoginRequest,
  UserResponse,
} from '../interfaces/user.interface';
import { Observable } from 'rxjs';
import {
  AssesmentGraphResponse,
  AssesmentResponse,
} from '../interfaces/assesment.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  private apiUrl = 'https://user-assessment-api.vercel.app';
  constructor(private http: HttpClient) {}

  login(user: UserLoginRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.apiUrl}/api/login`, user);
  }

  getAssesments(): Observable<AssesmentResponse> {
    return this.http.get<AssesmentResponse>(
      `${this.apiUrl}/api/userassessments`
    );
  }

  getAssesmentGraph(id: number): Observable<AssesmentGraphResponse> {
    return this.http.get<AssesmentGraphResponse>(
      `${this.apiUrl}/api/userassessments`,
      {
        params: new HttpParams().set('id', id),
      }
    );
  }

  getUsers(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/api/users`);
  }
}
