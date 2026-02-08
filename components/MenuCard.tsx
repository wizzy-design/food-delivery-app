import { MenuItem } from "@/type";
import { Image } from "expo-image";
import { router } from "expo-router";
import { cssInterop } from "nativewind";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

cssInterop(Image, {
  className: {
    target: "style",
  },
});

const MenuCard = ({
  item: { id, name, price, image_url },
}: {
  item: MenuItem;
}) => {
  return (
    <TouchableOpacity
      className="menu-card"
      onPress={() =>
        router.push({ pathname: "/food-details/[id]", params: { id } })
      }
    >
      <Image
        source={{ uri: image_url }}
        className="size-32 absolute -top-10"
        style={{ width: 128, height: 128 }}
        contentFit="contain"
        transition={500}
        cachePolicy="disk"
      />

      <Text
        className="text-center base-bold text-dark-100 mb-2"
        numberOfLines={2}
      >
        {name}
      </Text>
      <Text className="body-regular font-quicksand-semibold text-gray-100 mb-4">
        From ${price}
      </Text>

      <TouchableOpacity className="">
        <Text className="text-primary font-quicksand-bold">Add to Cart +</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default MenuCard;
