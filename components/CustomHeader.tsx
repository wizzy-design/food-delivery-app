import { images } from "@/constants";
import { CustomHeaderProps } from "@/type";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const CustomHeader = ({ title }: CustomHeaderProps) => {
  return (
    <View className="mb-5 flex-row items-center justify-between">
      <TouchableOpacity className="justify-center" onPress={router.back}>
        <Image
          source={images.arrowBack}
          resizeMode="contain"
          className="size-5"
        />
      </TouchableOpacity>
      <Text className="base-semibold text-[#181C2E]">{title}</Text>

      <Image source={images.search} className="size-5" resizeMode="contain" />
    </View>
  );
};

export default CustomHeader;
