export interface Session {
  email: string;
  password: string;
}

export interface AuthUser extends Session {
  username: string;
  code: string;
}
