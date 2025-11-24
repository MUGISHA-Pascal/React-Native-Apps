// context/AuthContext.tsx
import React from "react";

export const AuthContext = React.createContext<{
  signIn: (data: any) => void;
  signOut: () => void;
  signUp: () => void;
}>({
  signIn: () => {},
  signOut: () => {},
  signUp: () => {},
});
