import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { signUp } from "@/lib/services";
import * as Sentry from "@sentry/react-native";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  });

  const submit = async () => {
    const { email, password, name, phone } = form;
    if (!form.email || !form.name || !form.password) {
      return Alert.alert(
        "Invalid input",
        "Input a valid Name, Email and Password"
      );
    }

    setIsSubmitting(true);

    try {
      await signUp(email, password, name, phone);

      router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error.message);
      Sentry.captureEvent(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-10 mt-3 mx-[30px] pb-10">
      <CustomInput
        label="Full Name"
        placeholder="Enter full name"
        onChangeText={(text) => {
          setForm((prev) => ({ ...prev, name: text }));
        }}
        value={form.name}
      />
      <CustomInput
        label="Email"
        keyboardType="email-address"
        placeholder="Enter email address"
        onChangeText={(text) => {
          setForm((prev) => ({ ...prev, email: text }));
        }}
        value={form.email}
      />
      <CustomInput
        label="Phone"
        keyboardType="phone-pad"
        placeholder="Enter phone number"
        onChangeText={(text) => {
          setForm((prev) => ({ ...prev, phone: text }));
        }}
        value={form.phone}
      />
      <CustomInput
        label="Password"
        placeholder="Enter password"
        onChangeText={(text) => {
          setForm((prev) => ({ ...prev, password: text }));
        }}
        value={form.password}
      />

      <CustomButton
        isLoading={isSubmitting}
        title="Sign Up"
        onPress={submit}
        disabled={isSubmitting}
      />

      <View className="flex-row items-center justify-center">
        <Text className="text-gray-100 base-regular">
          Have an existing account?{" "}
        </Text>

        <Link href={"/sign-in"} className="text-primary base-bold">
          Log in
        </Link>
      </View>
    </View>
  );
};

export default SignUp;
