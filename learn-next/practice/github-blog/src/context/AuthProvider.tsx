"use client";
import { User } from "@supabase/supabase-js";
import { createContext, useContext } from "react";

export const SupabaseContext = createContext<{ user: User | null } | null>(
  null
);
export default function AuthProvider({
  user,
  children,
}: {
  user: User | null;
  children: React.ReactNode;
}) {
  return (
    <>
      <SupabaseContext value={{ user }}>{children}</SupabaseContext>
    </>
  );
}

export const useAuth = () => {
  const context = useContext(SupabaseContext);
  if (!context) throw new Error("useAuth must be used inside <AuthProvider>");
  return context;
};
