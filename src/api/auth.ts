export interface Session {
  email: string;
  password: string;
}

export interface AuthUser {
  username: string;
  email: string;
}

export interface NewUser extends Session, AuthUser {
  code: string;
}
