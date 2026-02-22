import { images } from "@/constants";
import { Topping } from "@/type";
import { Image } from "expo-image";
import React from "react";
import { Image as RnImage, Text, TouchableOpacity, View } from "react-native";

interface ToppingsCardProps {
  item: Topping;
  selected?: boolean;
  onPress?: () => void;
}

/** For toppings and side dishes */
const ToppingsCard = ({ item, selected, onPress }: ToppingsCardProps) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      className={`mr-[30px] w-[84px]`}
    >
      <View
        className="z-50 w-full h-[78px] bg-white rounded-[15px] py-4"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 15,
          elevation: 5,
        }}
      >
        <Image
          source={{ uri: item.image_url }}
          contentFit="contain"
          className="w-full h-full"
        />
      </View>

      <View
        className="bg-[#3C2F2F] w-full rounded-[15px] mt-[-34px] pt-[42px] px-[6px] pb-[14px]"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.4,
          shadowRadius: 15,
          elevation: 8,
        }}
      >
        <View className="flex-row gap-2 justify-between">
          <Text
            numberOfLines={1}
            className={`font-quicksand-bold text-xs flex-1 ${
              selected ? "text-primary" : "text-white"
            }`}
          >
            {item.name}
          </Text>

          <View className="bg-white rounded-full p-1 items-center justify-center">
            <RnImage
              source={selected ? images.check : images.plus}
              className="size-2"
              resizeMode="contain"
              tintColor={selected ? "#FE8C00" : "#3C2F2F"}
            />
          </View>
        </View>
        <Text className="font-quicksand-semibold text-xs text-white/80 mt-1">
          ₦{item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ToppingsCard;
