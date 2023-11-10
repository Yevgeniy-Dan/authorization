import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  UserLoginRequest,
  UserResponse,
} from 'src/app/interfaces/user.interface';
import { apiUrl } from 'src/app/constants/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  /**
   * Perfoms a user login operation.
   *
   * @param user  the user login request data
   * @returns {Observable<UserResponse>} an Observable of type UserResponse
   */
  login(user: UserLoginRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${apiUrl}/api/login`, user);
  }
}
