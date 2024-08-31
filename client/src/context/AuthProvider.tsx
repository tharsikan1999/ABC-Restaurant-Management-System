import React, { createContext, useState, ReactNode } from "react";

interface AuthState {
  role: string;
  accessToken: string;
  userId: number;
  userName: string;
  email: string;
  phone?: string;
  userDbId: number;
}

interface AuthContextType {
  auth: AuthState;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({
    role: "",
    accessToken: "",
    userId: 0,
    userName: "",
    email: "",
    phone: "",
    userDbId: 0,
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
