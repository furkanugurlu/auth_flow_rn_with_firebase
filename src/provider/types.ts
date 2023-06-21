import React from "react";

export type authContextType = {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
};

const initialAuthState: authContextType = {
  user: "",
  setUser: () => {},
};
const AuthContext = React.createContext<authContextType>(initialAuthState);

export default AuthContext;
