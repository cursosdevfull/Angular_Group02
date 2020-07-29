export interface User {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
  refreshToken?: string;
  photo: string;
  isActive: boolean;
  roles: any[];
}
