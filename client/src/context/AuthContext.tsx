import { createContext } from "react";
import { IAuthContext } from "../interfaces/common";

export const AuthContext = createContext<IAuthContext>({
  token: null,
  userId: null,
  login: (jwtToken: string, id: string) => {},
  logout: () => {},
  isAuthenticated: false,
});