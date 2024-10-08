import AuthStatus from "@/enum/authStatus";

 export interface IAuthContextType {
  user: AuthLogin | null; //ver esto
 // setUser:React.Dispatch<React.SetStateAction<any>>
  handleLogin:(data:loginProp)=>Promise<AuthLogin| null>
  status:AuthStatus | null ;
  handleLogout:()=>void
}


export interface AuthLogin {
  id: number;
  role: string;
  email: string;
  token: string;
}


export interface loginProp {
  email: string;
  password: string;
}




 
