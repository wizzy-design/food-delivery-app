import { MenuItem } from "@/type";
import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";

const MenuCard = ({
  item: { id, name, price, image_url },
}: {
  item: MenuItem;
}) => {
  return (
    <TouchableOpacity className="menu-card">
      <Image
        source={{ uri: image_url }}
        className="size-32 absolute -top-10"
        resizeMode="contain"
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
