export interface IUser {
  name: string;
  lastName: string;
  dateOfBirth: string;
  education: string;
  role: string;
  position: string;
}

export interface IUserLoginRequest {
  email: string;
  password: string;
}

export interface IUserResponse {
  first_name: string;
  last_name: string;
  readonly role: string;
  readonly token: string;
}
