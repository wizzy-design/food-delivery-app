import useAuthStore from "@/store/auth.store";
import {
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_700Bold,
  Rubik_900Black,
} from "@expo-google-fonts/rubik";
import { useFonts } from "expo-font";
import { Redirect, SplashScreen, Stack } from "expo-router";
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

  // 🛠️ DEV SHORTCUT: Set your current food ID here to auto-jump to the details page on reload
  const DEV_ID = "9575f303-c01d-4956-9f1c-1b215eb62527";
  if (__DEV__ && DEV_ID !== "9575f303-c01d-4956-9f1c-1b215eb62527")
    return <Redirect href={`/(pages)/food-details/${DEV_ID}`} />;

  return <Stack screenOptions={{ headerShown: false }} />;
}
