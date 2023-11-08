import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  User,
  UserLoginRequest,
  UserResponse,
} from '../interfaces/user.interface';
import { Observable } from 'rxjs';
import {
  IAssesmentGraphResponse,
  IAssesmentResponse,
} from '../interfaces/assesment.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://user-assessment-api.vercel.app';
  constructor(private http: HttpClient) {}

  /**
   * Perfoms a user login operation.
   *
   * @param user  the user login request data
   * @returns {Observable<UserResponse>} an Observable of type UserResponse
   */
  login(user: UserLoginRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.apiUrl}/api/login`, user);
  }

  /**
   * Retrieves user assessments
   *
   * @returns {Observable<IAssesmentResponse>} an Observable of type AssesmentResponse
   */
  getAssesments(): Observable<IAssesmentResponse[]> {
    return this.http.get<IAssesmentResponse[]>(
      `${this.apiUrl}/api/userassessments`
    );
  }

  /**
   * Retrieves assesment grapg data for a specific assesment ID.
   *
   * @param id the id of the assesment
   * @returns {Observable<IAssesmentGraphResponse>} an Observable of type AssesmentGraphResponse
   */

  getAssesmentGraph(id: number): Observable<IAssesmentGraphResponse> {
    return this.http.get<IAssesmentGraphResponse>(
      `${this.apiUrl}/api/userassessments/graph`,
      {
        params: new HttpParams().set('id', `${id}`),
      }
    );
  }

  /**
   * Retrieves user data.
   *
   * @returns {Observable<User>} an Observable of type User
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/api/users`);
  }
}
