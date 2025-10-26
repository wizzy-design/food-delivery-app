import CustomHeader from "@/components/CustomHeader";
import { images } from "@/constants";
import { signOut } from "@/lib/services";
import useAuthStore from "@/store/auth.store";
import { ProfileCardProps } from "@/type";
import React, { useState } from "react";
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

  if (!isAuthenticated) return null;

  console.log("User:", JSON.stringify(user, null, 2));

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

  return (
    <SafeAreaView className="px-5 py-5">
      <CustomHeader title="Profile" />

      <ScrollView>
        <View className="gap-y-[30px] bg-white rounded-[20px] px-[14px] py-5">
          {[
            {
              title: "Full Name",
              value: user?.user_metadata?.name,
              icon: images.person,
            },
            {
              title: "Email",
              value: user?.user_metadata?.email,
              icon: images.envelope,
            },
            {
              title: "Phone Number",
              value: user?.phone || "+1 555 123 4567",
              icon: images.phone,
            },
            {
              title: "Address 1 - (Home)",
              value: "123 Main Street, Springfield, IL 62704",
              icon: images.location,
            },
            {
              title: "Address 2 - (Work)",
              value: "221B Rose Street, Foodville, FL 12345",
              icon: images.location,
            },
          ].map((item, index) => (
            <View key={index}>
              <ProfileCard
                title={item.title}
                content={item.value}
                icon={item.icon}
              />
            </View>
          ))}
        </View>

        <View className="gap-y-5 mt-[30px]">
          <TouchableOpacity
            className="w-full flex-row items-center justify-center gap-2 border-solid border border-primary bg-[#FE8C000D] rounded-full py-[14px]"
            onPress={logout}
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

const ProfileCard = ({ icon, title, content }: ProfileCardProps) => {
  return (
    <View className="flex-row gap-2.5">
      <View className="size-12 items-center justify-center border-[#FE8C000D] bg-[#FFF9F2] rounded-full">
        <Image
          source={icon}
          resizeMode="contain"
          className="size-5"
          tintColor={"#FE8C00"}
        />
      </View>

      <View className="gap-y-1">
        <Text className="text-[#6A6A6A] body-medium">{title}</Text>
        <Text className="body-semibold text-[#181C2E]">{content}</Text>
      </View>
    </View>
  );
};
