import AuthStatus from "@/enum/authStatus";
import { JwtPayload } from "./IJwtPayload";

export interface IAuthContextType {
  user: AuthLogin | null; //ver esto
  // setUser:React.Dispatch<React.SetStateAction<any>>
  handleLogin: (data: loginProp) => Promise<AuthLogin | null>;
  status: AuthStatus | null;
  handleLogout: () => void;
  getDecodedToken: () => JwtPayload;
}

export interface AuthLogin {
  token: string;
}

export interface loginProp {
  email: string;
  password: string;
}
