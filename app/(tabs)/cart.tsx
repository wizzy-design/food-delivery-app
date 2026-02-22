import CustomHeader from "@/components/CustomHeader";
import { images } from "@/constants";
import useCartStore from "@/store/cart.store";
import cn from "clsx";
import { Image } from "expo-image";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Cart = () => {
  const { items, removeFromCart } = useCartStore();

  const totalItemPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const deliveryFee = 500;
  const discount = 0;
  const totalAmount = totalItemPrice + deliveryFee - discount;

  return (
    <SafeAreaView className="px-5 flex-1 bg-[#FAFAFA]">
      <FlatList
        data={items}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <CustomHeader title="Cart" />

            <View className="flex-row items-center justify-between mt-[15px]">
              <View className="gap-1.5">
                <Text className="small-bold uppercase text-primary">
                  Delivery location
                </Text>

                <TouchableOpacity className="flex-row items-center gap-1">
                  <Text className="font-quicksand-bold text-base text-[#181C2E]">
                    Home
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => {}}
                className="bg-transparent border border-primary w-[130px] h-[40px] rounded-full items-center justify-center"
              >
                <Text className="text-primary font-quicksand-bold text-sm">
                  Change Location
                </Text>
              </TouchableOpacity>
            </View>

            <Text className="text-dark-100 font-quicksand-bold text-lg mt-8 mb-4">
              Your Orders
            </Text>
          </>
        }
        renderItem={({ item }) => (
          <View className="bg-white h-[106px] w-full rounded-xl flex-row gap-4 py-[13px] px-[12px] mb-4">
            {/* Checkbox */}
            <View className="items-center justify-center">
              <TouchableOpacity className="bg-primary size-5 items-center justify-center rounded-[4px]">
                <Image
                  source={images.check}
                  contentFit="contain"
                  className="size-3"
                  tintColor={"#fff"}
                />
              </TouchableOpacity>
            </View>

            {/* Image */}
            <View className="bg-[#FE8C001A] w-[85px] h-[82px] items-center justify-center rounded-lg">
              <Image
                source={{ uri: item.image_url }}
                contentFit="contain"
                className="size-[72px]"
              />
            </View>

            {/* Right side */}
            <View className="w-full flex-1">
              <View className="flex-1 h-full">
                <Text className="text-dark-100 font-quicksand-bold text-base">
                  {item.name}
                </Text>
                <Text className="text-primary font-quicksand-bold text-base">
                  ₦{item.price}
                </Text>
              </View>

              <View className="flex-row items-center justify-between ">
                <View className="flex-row items-center gap-5">
                  <TouchableOpacity className="bg-[#FE8C001A] size-6 items-center justify-center rounded-[4px]">
                    <Image
                      source={images.minus}
                      contentFit="contain"
                      className="size-3"
                      tintColor={"#FE8C00"}
                    />
                  </TouchableOpacity>
                  <Text className="text-dark-100 font-quicksand-bold text-base">
                    {item.quantity}
                  </Text>
                  <TouchableOpacity className="bg-[#FE8C001A] size-6 items-center justify-center rounded-[4px]">
                    <Image
                      source={images.plus}
                      contentFit="contain"
                      className="size-3"
                      tintColor={"#FE8C00"}
                    />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                  <Image
                    source={images.trash}
                    contentFit="contain"
                    className="size-5"
                    tintColor={"#F14141"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        ListFooterComponent={
          <>
            <PaymentSummary
              totalItemPrice={totalItemPrice}
              deliveryFee={deliveryFee}
              discount={discount}
              totalAmount={totalAmount}
              itemCount={items.length}
            />

            <TouchableOpacity className="bg-primary h-[50px] rounded-full items-center justify-center mt-[30px]">
              <Text className="text-white font-quicksand-bold text-base">
                Order Now
              </Text>
            </TouchableOpacity>
          </>
        }
        ListEmptyComponent={
          <View className="items-center justify-center py-20">
            <Text className="text-gray-100 font-quicksand-medium">
              Your cart is empty
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const PaymentSummary = ({
  totalItemPrice,
  deliveryFee,
  discount,
  totalAmount,
  itemCount,
}: {
  totalItemPrice: number;
  deliveryFee: number;
  discount: number;
  totalAmount: number;
  itemCount: number;
}) => {
  const data = [
    { name: `Total Items (${itemCount})`, price: totalItemPrice },
    { name: "Delivery Fee", price: deliveryFee },
    { name: "Discount", price: discount },
    { name: "Total", price: totalAmount },
  ];

  return (
    <View className="border border-[#EDEDED] rounded-2xl border-solid p-5 mt-[15px]">
      <Text className="text-dark-100 font-quicksand-bold text-xl mb-5">
        Payment Summary
      </Text>

      <View className="gap-y-5">
        {data.map((item, index) => (
          <View
            key={item.name}
            className={cn(
              "flex-row items-center justify-between",
              index === 3 && "border-t border-[#EDEDED] pt-5",
            )}
          >
            <Text
              className={cn(
                "text-base",
                index === 3
                  ? "text-dark-100 font-quicksand-bold"
                  : "text-[#6A6A6A] font-quicksand-medium ",
              )}
            >
              {item.name}
            </Text>
            <Text className="text-dark-100 font-quicksand-bold text-base">
              ₦{item.price}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Cart;
