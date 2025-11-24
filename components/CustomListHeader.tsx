import { images } from "@/constants";
import cn from "clsx";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import ButtonBadge from "./ButtonBadge";

const CustomListHeader = ({
  subtitle,
  title,
  className,
}: {
  subtitle: string;
  title: string;
  className?: string;
}) => {
  return (
    <View
      className={cn(className, "flex-row justify-between items-center my-5")}
    >
      <View className="gap-1.5">
        <Text className="small-bold uppercase text-primary">{subtitle}</Text>

        <TouchableOpacity className="flex-row items-center gap-1">
          <Text className="font-quicksand-bold text-base text-[#181C2E]">
            {title}
          </Text>
          <Image
            source={images.arrowDown}
            resizeMode="contain"
            className="w-[14px] h-[8px]"
            tintColor={"#181C2E"}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity className="bg-[#181C2E] size-10 rounded-full items-center justify-center relative">
        <Image source={images.bag} resizeMode="contain" className="size-5" />

        <ButtonBadge count={20} />
      </TouchableOpacity>
    </View>
  );
};

export default CustomListHeader;
