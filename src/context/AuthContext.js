import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Estado que define quem é o usuário: 'client', 'artist' ou null (ninguém)
  const [userType, setUserType] = useState(null); 

  const loginAsClient = () => setUserType('client');
  const loginAsArtist = () => setUserType('artist');
  const logout = () => setUserType(null);

  return (
    <AuthContext.Provider
      value={{
        userType,
        loginAsClient,
        loginAsArtist,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}