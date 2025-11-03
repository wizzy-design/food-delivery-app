import CustomInput from "@/components/CustomInput";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EditProfile = () => {
  const { control } = useForm();
  return (
    <SafeAreaView>
      <Text>EditProfile</Text>

      <View>
        <Controller
          control={control}
          name="name"
          defaultValue={""}
          render={({ field }) => (
            <CustomInput
              label="Full Name"
              placeholder="Enter Full Name"
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          defaultValue={""}
          render={({ field }) => (
            <CustomInput
              label="Email"
              placeholder="Enter email"
              keyboardType="email-address"
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="phone"
          defaultValue={""}
          render={({ field }) => (
            <CustomInput
              label="Phone Number"
              value={field.value}
              placeholder="Enter Phone Number"
              keyboardType="phone-pad"
              onChangeText={field.onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="address1"
          defaultValue={""}
          render={({ field }) => (
            <CustomInput
              label="Address 1 - (Home)"
              placeholder="Enter Home Address"
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="address2"
          defaultValue={""}
          render={({ field }) => (
            <CustomInput
              label="Address 2 - (Work)"
              placeholder="Enter Work Address"
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
