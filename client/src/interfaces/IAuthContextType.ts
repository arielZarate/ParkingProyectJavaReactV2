interface IAuthContextType {
  user: any; //ver esto
  status: "loading" | "authenticated" | "unauthenticated";
}

export default IAuthContextType;
