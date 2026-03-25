import useAuthStore from "@/store/auth.store";
import {
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_700Bold,
  Rubik_900Black,
} from "@expo-google-fonts/rubik";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import "./globals.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { fetchAuthenticatedUser, initializeAuthListener, isLoading } =
    useAuthStore();

  const [fontsLoaded, error] = useFonts({
    "QuickSand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "QuickSand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "QuickSand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "QuickSand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
    "QuickSand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_700Bold,
    Rubik_900Black,
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [error, fontsLoaded]);

  useEffect(() => {
    // Fetch initial session
    fetchAuthenticatedUser();
    // Start listening to auth changes
    const cleanup = initializeAuthListener();
    return cleanup;
  }, []);

  if (isLoading || !fontsLoaded) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}
