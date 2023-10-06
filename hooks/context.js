'use client'
import { createContext, useContext, useState } from "react";

const userContext = createContext();

export function UserContextProvider({ children }) {
  const [redirectUrl, setRedirectUrl] = useState(false);

  return (
    <userContext.Provider
      value={{ redirectUrl, setRedirectUrl}}
    >
      {children}
    </userContext.Provider>
  );
}

export function useUserContext() {
  return useContext(userContext);
}
