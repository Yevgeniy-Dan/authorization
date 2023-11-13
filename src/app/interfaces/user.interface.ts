export interface IUserTableEntity {
  name: string;
  lastName: string;
  dateOfBirth: string;
  education: string;
  role: string;
  position: string;
}

export interface IUserCredentials {
  email: string;
  password: string;
}

export interface IUser {
  first_name: string;
  last_name: string;
  readonly role: string;
  readonly token: string;
}
