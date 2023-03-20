export interface UserData {
  TotalCaptures: number;
  colors: [color1: string, color2: string];
  iconName: string;
  userName: string;
  userID: string;
}

export interface UpdateUserData {
  username: string;
  email: string;
  color1: string;
  color2: string;
}
