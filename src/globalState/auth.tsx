import React, { createContext, useMemo } from "react";
import { IAuth, IAuthContext, Props } from "../types/components/auth";

export const AuthContext = createContext<IAuthContext | null>(null);

const UserProvider = ({ children }: Props) => {
  const [user] = React.useState<IAuth | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [isLoggedIn] = React.useState<boolean>(false);

  const obj = useMemo(
    () => ({ loading, isLoggedIn, user, getUser }),
    [isLoggedIn, loading, user]
  );

  const getUser = () => {
    setLoading(true);
    setLoading(false);
  };

  return <AuthContext.Provider value={obj}>{children}</AuthContext.Provider>;
};
export default UserProvider;
