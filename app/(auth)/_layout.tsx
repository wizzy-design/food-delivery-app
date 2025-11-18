import { images } from "@/constants";
import useAuthStore from "@/store/auth.store";
import { Redirect, Slot, usePathname } from "expo-router";
import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthLayout() {
  const { isAuthenticated } = useAuthStore();
  const pathname = usePathname();

  if (isAuthenticated) return <Redirect href="/" />;

  return (
    <SafeAreaView
      edges={["bottom"]}
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          className="bg-white"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View
            className="relative w-full"
            style={{ height: Dimensions.get("screen").height / 2.25 }}
          >
            <ImageBackground
              source={
                pathname.includes("/sign-up")
                  ? images.signupGraphic
                  : images.loginGraphic
              }
              className="size-full rounded-b-lg rounded-t-none"
              resizeMode="stretch"
            />
            <Image
              source={images.logo}
              className="absolute -bottom-4 z-10 size-48 self-center"
            />
          </View>

          <Slot />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
