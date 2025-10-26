import { images } from "@/constants";
import { CustomHeaderProps } from "@/type";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const CustomHeader = ({ title }: CustomHeaderProps) => {
  return (
    <View className="flex-row justify-between items-center mb-5">
      <TouchableOpacity className="justify-center">
        <Image
          source={images.arrowBack}
          resizeMode="contain"
          className="size-5"
        />
      </TouchableOpacity>
      <Text className="base-semibold text-[#181C2E] ">{title}</Text>

      <Image source={images.search} className="size-5" resizeMode="contain" />
    </View>
  );
};

export default CustomHeader;
