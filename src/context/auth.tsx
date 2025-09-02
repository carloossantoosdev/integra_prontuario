"use client";

import React, { createContext } from 'react';

export type AuthContextValue = {
  user: unknown;
  signIn: (...args: unknown[]) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  signIn: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const value: AuthContextValue = {
    user: null,
    signIn: async () => {},
    signOut: async () => {},
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


