import useCartStore from "@/store/cart.store";
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

const MenuCard = ({ item }: { item: MenuItem }) => {
  const { items, addToCart, removeFromCart } = useCartStore();
  const isInCart = items.some((i) => i.id === item?.id);

  return (
    <TouchableOpacity
      className="menu-card"
      onPress={() =>
        router.push({
          pathname: "/food-details/[id]",
          params: { id: item?.id },
        })
      }
    >
      <Image
        source={{ uri: item?.image_url }}
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
        {item?.name}
      </Text>
      <Text className="body-regular font-quicksand-semibold text-gray-100 mb-4">
        From ${item?.price}
      </Text>

      <TouchableOpacity
        className=""
        onPress={() => {
          if (isInCart) {
            removeFromCart(item?.id!);
          } else {
            addToCart({
              id: item?.id!,
              name: item?.name!,
              price: item?.price!,
              quantity: 1,
              image_url: item?.image_url!,
            });
          }
        }}
      >
        <Text className="text-primary font-quicksand-bold">
          {isInCart ? "Remove from cart" : "Add to Cart +"}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default MenuCard;
