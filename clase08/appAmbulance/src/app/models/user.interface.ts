export interface User {
  name?: string;
  email?: string;
  password?: string;
  refreshToken?: string;
  photo: string;
  isActive: boolean;
  roles: any[];
}
