import useAuthStore from "@/store/auth.store";
import { Slot } from "expo-router";
import { useEffect } from "react";
import "./globals.css";

export default function RootLayout() {
  const { fetchAuthenticatedUser, initializeAuthListener } = useAuthStore();

  useEffect(() => {
    // Fetch initial session
    fetchAuthenticatedUser();
    // Start listening to auth changes
    const cleanup = initializeAuthListener();
    return cleanup;
  }, []);

  return <Slot />;
}
