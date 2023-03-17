export interface Session {
  email: string;
  password: string;
}

export interface AuthUser extends Session {
  username: string;
}

export interface NewUser extends Session, AuthUser {
  code: string;
}
