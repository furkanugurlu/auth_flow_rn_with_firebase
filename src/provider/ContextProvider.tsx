import { useState } from "react";
import AuthContext, { authContextType } from "./types";

const AuthenticatedUserProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<string>("");

  const contextValue: authContextType = {
    user,
    setUser,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthenticatedUserProvider;
