import AuthStatus from "@/enum/authStatus";

interface IAuthContextType {
  user: any; //ver esto
  status: AuthStatus;
}

export default IAuthContextType;
