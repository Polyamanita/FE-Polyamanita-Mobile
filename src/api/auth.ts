export interface Session {
  email: string;
  password: string;
}

export interface NewUser extends Session {
  username: string;
}
