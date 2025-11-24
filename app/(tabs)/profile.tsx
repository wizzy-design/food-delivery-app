import CustomHeader from "@/components/CustomHeader";
import { images } from "@/constants";
import { signOut, uploadProfilePic } from "@/lib/services";
import { supabase } from "@/lib/supabase";
import useAuthStore from "@/store/auth.store";
import { ProfileCardProps } from "@/type";
import cn from "clsx";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { user, isAuthenticated } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [profile, setProfile] = useState<any>({});
  const [avatar, setAvatar] = useState<string | null>(
    user?.user_metadata?.avatar_url || profile?.avatar_url || null
  );

  const logout = async () => {
    try {
      setIsSubmitting(true);
      await signOut();

      Alert.alert("Signed Out Successfully");
    } catch (error: any) {
      Alert.alert("Error occured:", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUploadProfilePic = async () => {
    try {
      setIsSubmitting(true);
      const url = await uploadProfilePic(user?.id!);
      if (url) {
        setAvatar(url);
        Alert.alert("Profile Picture Updated!");
      }
    } catch (error: any) {
      console.error(error);
      Alert.alert("Upload Failed", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchProfile = async () => {
    try {
      setIsFetching(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (error) throw error;

      if (data) setProfile(data);
    } catch (e: any) {
      console.error(e.message);
      Alert.alert("Error while fetching profile data", e.message);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!isAuthenticated) return null;

  return (
    <SafeAreaView className="px-5 py-5">
      <CustomHeader title="Profile" />

      <ScrollView
        contentContainerClassName="pb-32"
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center mb-[30px]">
          <TouchableOpacity
            className="relative"
            onPress={handleUploadProfilePic}
          >
            {isSubmitting && (
              <ActivityIndicator
                size={"large"}
                className="absolute z-50 top-1/2 -translate-y-1/2 left-[30px]"
                color={"#FE8C00"}
              />
            )}

            <Image
              source={avatar ? { uri: avatar } : images.avatar}
              resizeMode="cover"
              className={cn(
                isSubmitting && "opacity-20",
                "size-[100px] rounded-full"
              )}
            />
            <View className="bg-primary size-7 rounded-full items-center justify-center top-[72px] left-[72px] absolute border border-white border-1">
              <Image source={images.pencil} className="size-4" />
            </View>
          </TouchableOpacity>
        </View>

        <View className="gap-y-[30px] bg-white rounded-[20px] px-[14px] py-5">
          {[
            {
              title: "Full Name",
              value: user?.user_metadata?.full_name,
              icon: images.person,
            },
            {
              title: "Email",
              value: user?.user_metadata?.email,
              icon: images.envelope,
            },
            {
              title: "Phone Number",
              value: profile?.phone_number
                ? "+234" + profile?.phone_number
                : "--",
              icon: images.phone,
            },
            {
              title: "Address 1 - (Home)",
              value: profile?.address_1 || "--",
              icon: images.location,
            },
            {
              title: "Address 2 - (Work)",
              value: profile?.address_2 || "--",
              icon: images.location,
            },
          ].map((item, index) => (
            <View key={index}>
              <ProfileCard
                title={item.title}
                content={item.value}
                icon={item.icon}
                isFetching={isFetching}
              />
            </View>
          ))}
        </View>

        <View className="gap-y-5 mt-[30px]">
          <TouchableOpacity
            className="w-full flex-row items-center justify-center gap-2 border-solid border border-primary bg-[#FE8C000D] rounded-full py-[14px]"
            onPress={() =>
              router.push({
                pathname: "/edit-profile",
                params: { profile: JSON.stringify(profile) },
              })
            }
            disabled={isSubmitting}
          >
            <Text className="text-primary paragraph-bold ">Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="w-full flex-row items-center justify-center gap-2 border-solid border border-error bg-[#F141410D] rounded-full py-[14px]"
            onPress={logout}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Image
                source={images.logout}
                resizeMode="contain"
                className="size-6"
              />
            )}

            <Text className="text-error paragraph-bold">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const ProfileCard = ({
  icon,
  title,
  content,
  isFetching,
}: ProfileCardProps) => {
  return (
    <View className="flex-row gap-2.5 w-full">
      <View className="size-12 items-center justify-center border-[#FE8C000D] bg-[#FFF9F2] rounded-full">
        <Image
          source={icon}
          resizeMode="contain"
          className="size-5"
          tintColor={"#FE8C00"}
        />
      </View>

      <View className="gap-y-2 w-full">
        <Text className="text-[#6A6A6A] body-medium">{title}</Text>
        {isFetching ? (
          <View className="w-[80%] h-4 rounded-sm bg-gray-300/80 animate-pulse" />
        ) : (
          <Text className="body-semibold text-[#181C2E]">{content}</Text>
        )}
      </View>
    </View>
  );
};
