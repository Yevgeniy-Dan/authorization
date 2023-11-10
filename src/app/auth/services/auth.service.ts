import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IUserCredentials, IUser } from 'src/app/interfaces/user.interface';
import { apiUrl } from 'src/app/constants/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  /**
   * Perfoms a user login operation.
   *
   * @param user  the user login request data
   * @returns {Observable<IUser>} an Observable of type UserResponse
   */
  login(user: IUserCredentials): Observable<IUser> {
    return this.http.post<IUser>(`${apiUrl}/api/login`, user);
  }

  isAdmin(): boolean {
    return localStorage.getItem('role') === 'Admin';
  }

  isAuthorized(): boolean {
    return Boolean(localStorage.getItem('token'));
  }
}
