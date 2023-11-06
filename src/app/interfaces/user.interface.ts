export interface User {
  name: string;
  lastName: string;
  dateOfBirth: string;
  education: string;
  role: string;
  position: string;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface UserResponse {
  first_name: string;
  last_name: string;
  readonly role: string;
  readonly token: string;
}
