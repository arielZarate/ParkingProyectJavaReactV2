export interface JwtPayload {
  exp: number;
  iat: number;
  id: number;
  role: string;
  email: string;
}
