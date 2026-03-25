import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import CustomInput from "@/components/CustomInput";
import { supabase } from "@/lib/supabase";
import useAuthStore from "@/store/auth.store";
import useDataStore from "@/store/data.store";
import { UpdateProfileParams, User } from "@/type";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EditProfile = () => {
  const { control, handleSubmit, reset, formState } = useForm({
    mode: "onChange",
  });
  const { user } = useAuthStore();
  const { clearProfileCache } = useDataStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { profile } = useLocalSearchParams();

  const parsedProfile = React.useMemo(() => {
    return {
      email: user?.email,
      ...JSON.parse(profile as string),
    };
  }, [profile, user?.email]);

  const submit = async (data: UpdateProfileParams) => {
    setIsSubmitting(true);

    try {
      // 1. AUTH UPDATE (email + metadata only)
      const metadata: any = {};

      if (data.full_name) metadata.full_name = data.full_name;
      if (data.avatar_url) metadata.avatar_url = data.avatar_url;

      const authPayload: any = {};

      if (data.email) authPayload.email = data.email;
      if (Object.keys(metadata).length > 0) authPayload.data = metadata;

      const { error: authError } = await supabase.auth.updateUser(authPayload);
      if (authError) throw authError;

      // 2. PROFILES UPDATE (actual columns)
      const profilePayload = {
        ...(data.full_name && { full_name: data.full_name }),
        ...(data.phone_number && { phone_number: data.phone_number }),
        ...(data.address_1 && { address_1: data.address_1 }),
        ...(data.address_2 && { address_2: data.address_2 }),
        ...(data.avatar_url && { avatar_url: data.avatar_url }),
      };

      const { data: existing } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user?.id)
        .single();

      if (existing) {
        const { error: updateError } = await supabase
          .from("profiles")
          .update(profilePayload)
          .eq("id", user?.id);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from("profiles")
          .insert([{ id: user?.id, ...profilePayload }]);

        if (insertError) throw insertError;
      }

      // 3. Refresh auth store
      const { data: refreshed } = await supabase.auth.getUser();
      useAuthStore.getState().setUser(refreshed.user as User);

      // 4. Clear profile cache so it re-fetches fresh data
      if (user?.id) clearProfileCache(user.id);

      // 5. Success message
      Alert.alert("Profile Updated Successfully");

      // 6. Navigate after finishing everything
      router.navigate("/profile");
    } catch (error: any) {
      Alert.alert("Update Failed", error.message);
      console.error("PROFILE UPDATE ERROR:", error);
    } finally {
      // Always runs — even if the code throws an error
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (parsedProfile) {
      reset({
        full_name: parsedProfile?.full_name,
        email: parsedProfile?.email,
        phone_number: String(parsedProfile?.phone_number),
        address_1: parsedProfile?.address_1,
        address_2: parsedProfile?.address_2,
      });
    }
  }, [parsedProfile, reset]);

  return (
    <SafeAreaView
      style={{ padding: 16, backgroundColor: "white", flex: 1 }}
      className=""
    >
      <CustomHeader title="Edit Profile" />

      <View className="mt-10 gap-4">
        <Controller
          rules={{ required: true }}
          control={control}
          name="full_name"
          render={({ field }) => (
            <CustomInput
              required
              label="Full Name"
              placeholder="Enter Full Name"
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
        />
        <Controller
          rules={{ required: true }}
          control={control}
          name="email"
          defaultValue={""}
          render={({ field }) => (
            <CustomInput
              required
              label="Email"
              placeholder="Enter email"
              keyboardType="email-address"
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
        />
        <Controller
          rules={{ required: true }}
          control={control}
          name="phone_number"
          defaultValue={""}
          render={({ field }) => (
            <CustomInput
              required
              label="Phone Number"
              value={field.value}
              placeholder="Enter Phone Number"
              keyboardType="phone-pad"
              onChangeText={field.onChange}
            />
          )}
        />
        <Controller
          rules={{ required: true }}
          control={control}
          name="address_1"
          defaultValue={""}
          render={({ field }) => (
            <CustomInput
              required
              label="Address 1 - (Home)"
              placeholder="Enter Home Address"
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
        />
        <Controller
          rules={{ required: true }}
          control={control}
          name="address_2"
          defaultValue={""}
          render={({ field }) => (
            <CustomInput
              required
              label="Address 2 - (Work)"
              placeholder="Enter Work Address"
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
        />
      </View>

      <View className="mt-10 gap-4">
        <TouchableOpacity
          className="flex w-full flex-row justify-center rounded-full border border-primary bg-white p-3"
          onPress={router.back}
        >
          <Text className="text-primary">Cancel</Text>
        </TouchableOpacity>
        <CustomButton
          title="Submit"
          isLoading={isSubmitting}
          onPress={handleSubmit(submit)}
          disabled={isSubmitting || !formState.isValid}
        />
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
