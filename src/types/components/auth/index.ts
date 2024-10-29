export interface IAuth {
    email: string;
    password: string;
  }
  
  export interface IAuthContext {
    user: IAuth | null;
    isLoggedIn: boolean;
    loading: boolean;
    getUser: () => IAuth | void;
  }
  
  export interface Props {
    children?: React.ReactNode;
  }