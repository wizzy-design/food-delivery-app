import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { signIn } from "@/lib/services";
import * as Sentry from "@sentry/react-native";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async () => {
    const { email, password } = form;

    if (!email || !password)
      return Alert.alert(
        "Error",
        "Please enter valid email address & password."
      );

    setIsSubmitting(true);

    try {
      await signIn(email, password);

      router.replace("/");
    } catch (error: any) {
      console.error("Sign in error", error);
      Alert.alert("Error", error.message);
      Sentry.captureEvent(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="mt-10 mx-[30px] gap-10 bg-white">
      <CustomInput
        label="Email address"
        placeholder="Enter email address"
        keyboardType="email-address"
        onChangeText={(value) => {
          setForm((prev) => ({ ...prev, email: value }));
        }}
        value={form.email}
      />

      <CustomInput
        label="Password"
        placeholder="Enter your password"
        onChangeText={(value) => {
          setForm((prev) => ({ ...prev, password: value }));
        }}
        value={form.password}
        secureTextEntry={true}
      />

      <CustomButton
        title="Login"
        isLoading={isSubmitting}
        onPress={submit}
        disabled={isSubmitting}
      />

      <View className="flex-row justify-center">
        <Text className="text-gray-100 base-regular">
          Don’t have an account?{" "}
        </Text>
        <Link href={"/sign-up"} className="base-bold text-primary">
          Sign up
        </Link>
      </View>
    </View>
  );
};

export default SignIn;
