import { CustomButtonProps } from "@/type";
import cn from "clsx";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

const CustomButton = ({
  isLoading = false,
  onPress,
  title = "Click Me",
  style,
  leftIcon,
  textStyle,
  disabled = false,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      className={cn("custom-btn", style)}
      onPress={onPress}
      disabled={disabled}
    >
      {leftIcon}

      <View className="flex-center flex-row gap-4">
        {isLoading && <ActivityIndicator size="small" color="white" />}

        <Text className={cn("text-white-100 paragraph-semibold", textStyle)}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
