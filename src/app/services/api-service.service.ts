import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  IUser,
  IUserLoginRequest,
  IUserResponse,
} from '../interfaces/user.interface';
import { Observable } from 'rxjs';
import {
  IAssesmentGraphResponse,
  IAssesmentResponse,
} from '../interfaces/assesment.interface';
import { apiUrl } from '../constants/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  /**
   * Retrieves user assessments
   *
   * @returns {Observable<IAssesmentResponse>} an Observable of type AssesmentResponse
   */
  getAssesments(): Observable<IAssesmentResponse[]> {
    return this.http.get<IAssesmentResponse[]>(`${apiUrl}/api/userassessments`);
  }

  /**
   * Retrieves assesment grapg data for a specific assesment ID.
   *
   * @param id the id of the assesment
   * @returns {Observable<IAssesmentGraphResponse>} an Observable of type AssesmentGraphResponse
   */

  getAssesmentGraph(id: number): Observable<IAssesmentGraphResponse> {
    return this.http.get<IAssesmentGraphResponse>(
      `${apiUrl}/api/userassessments/graph`,
      {
        params: new HttpParams().set('id', `${id}`),
      }
    );
  }

  /**
   * Retrieves user data.
   *
   * @returns {Observable<IUser>} an Observable of type User
   */
  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${apiUrl}/api/users`);
  }
}
