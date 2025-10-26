import React from "react";
import { Text, View } from "react-native";

const ButtonBadge = ({ count }: { count: number }) => {
  return (
    <View className="cart-badge">
      <Text className="justify-center small-bold text-white">{count}</Text>
    </View>
  );
};

export default ButtonBadge;
