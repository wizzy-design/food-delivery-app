import CustomHeader from "@/components/CustomHeader";
import { images } from "@/constants";
import useCartStore from "@/store/cart.store";
import cn from "clsx";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useState } from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart } = useCartStore();
  const [showModal, setShowModal] = useState(false);

  const totalItemPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const deliveryFee = items.length > 0 ? 500 : 0;
  const discount = 0;
  const totalAmount = totalItemPrice + deliveryFee - discount;

  const handleOrder = () => {
    if (items.length === 0) return;
    setShowModal(true);
    // Modal will handle clearing cart or we can clear it on close
  };

  const closeAndClear = () => {
    setShowModal(false);
    clearCart();
    router.push("/search");
  };

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
              <TouchableOpacity
                onPress={() => removeFromCart(item.id)}
                className="bg-primary size-5 items-center justify-center rounded-[4px]"
              >
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
                  <TouchableOpacity
                    onPress={() => updateQuantity(item.id, item.quantity - 1)}
                    className="bg-[#FE8C001A] size-6 items-center justify-center rounded-[4px]"
                  >
                    <Image
                      source={images.minus}
                      contentFit="contain"
                      className="size-3"
                      tintColor={"#FE8C00"}
                    />
                  </TouchableOpacity>
                  <Text className="text-dark-100 font-quicksand-bold text-base w-4 text-center">
                    {item.quantity}
                  </Text>
                  <TouchableOpacity
                    onPress={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-[#FE8C001A] size-6 items-center justify-center rounded-[4px]"
                  >
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
          items.length > 0 ? (
            <>
              <PaymentSummary
                totalItemPrice={totalItemPrice}
                deliveryFee={deliveryFee}
                discount={discount}
                totalAmount={totalAmount}
                itemCount={items.length}
              />

              <TouchableOpacity
                onPress={handleOrder}
                disabled={items.length === 0}
                className={cn(
                  "h-[50px] rounded-full items-center justify-center mt-[30px]",
                  items.length === 0 ? "bg-gray-200" : "bg-primary",
                )}
              >
                <Text className="text-white font-quicksand-bold text-base">
                  Order Now
                </Text>
              </TouchableOpacity>
            </>
          ) : null
        }
        ListEmptyComponent={
          <View className="items-center justify-center py-20">
            <Text className="text-gray-100 font-quicksand-medium">
              Your cart is empty
            </Text>
          </View>
        }
      />

      {/* Order Success Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50 px-5">
          <View className="bg-white w-full rounded-[30px] p-8 items-center">
            <View className="bg-[#FE8C001A] size-20 rounded-full items-center justify-center mb-6">
              <Image
                source={images.check}
                contentFit="contain"
                className="size-10"
                tintColor={"#FE8C00"}
              />
            </View>
            <Text className="text-2xl font-quicksand-bold text-dark-100 text-center">
              Order Placed Successfully!
            </Text>
            <Text className="text-gray-100 font-quicksand-medium text-center mt-3 mb-8">
              Your food is on the way. You can track your order in the orders
              history.
            </Text>
            <TouchableOpacity
              onPress={closeAndClear}
              className="bg-primary w-full h-[50px] rounded-full items-center justify-center"
            >
              <Text className="text-white font-quicksand-bold text-base">
                Back to Shopping
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
