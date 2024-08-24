import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  id: number;
  sub: string;
  role: string;
  email: string;
  phone: string;
}

export const decodeToken = (token: string): TokenPayload => {
  return jwtDecode<TokenPayload>(token);
};
