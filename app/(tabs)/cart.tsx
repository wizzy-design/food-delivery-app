import CustomHeader from "@/components/CustomHeader";
import { images } from "@/constants";
import cn from "clsx";
import { Image } from "expo-image";
import React from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Cart = () => {
  return (
    <SafeAreaView className="px-5 py-3 bg-[#FAFAFA]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <CustomHeader title="Cart" />

        <View className="flex-row items-center justify-between mt-[35px]">
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

        {/* Order Cards */}
        <View className="mt-[31px]">
          <FlatList
            data={[
              {
                name: "Pringles",
                price: 100,
                image_url:
                  "https://nnsfsbcqchgrjfzrxblo.supabase.co/storage/v1/object/public/menu-customizations/pringles.png",
                id: "1",
              },
              {
                name: "Pringles",
                price: 100,
                image_url:
                  "https://nnsfsbcqchgrjfzrxblo.supabase.co/storage/v1/object/public/menu-customizations/pringles.png",
                id: "2",
              },
            ]}
            renderItem={({ item }) => (
              <View className="bg-white h-[106px] w-full rounded-xl flex-row gap-4 py-[13px] px-[12px]">
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
                  {/* Title and price */}
                  <View className="flex-1 h-full">
                    <Text className="text-dark-100 font-quicksand-bold text-base">
                      {item.name}
                    </Text>
                    <Text className="text-primary font-quicksand-bold text-base">
                      ₦{item.price}
                    </Text>
                  </View>

                  <View className="flex-row items-center justify-between ">
                    {/* Quantity */}
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
                        1
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

                    <TouchableOpacity>
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
            keyExtractor={(item) => item.id}
            contentContainerClassName="gap-y-5"
          />
        </View>

        <PaymentSummary />

        <TouchableOpacity className="bg-primary h-[50px] rounded-full items-center justify-center mt-[30px]">
          <Text className="text-white font-quicksand-bold text-base">
            Order Now
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const PaymentSummary = () => {
  return (
    <View className="border border-[#EDEDED] rounded-2xl border-solid p-5 mt-[30px]">
      <Text className="text-dark-100 font-quicksand-bold text-xl">
        Payment Summary
      </Text>

      <View className="flex-row items-center justify-between mt-5">
        <FlatList
          data={[
            {
              name: "Total Items (3)",
              price: 200,
            },
            {
              name: "Delivery Fee",
              price: 200,
            },
            {
              name: "Discount",
              price: 200,
            },
            {
              name: "Total",
              price: 500,
            },
          ]}
          renderItem={({ item, index }) => (
            <View
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
          )}
          contentContainerClassName="gap-y-5"
          keyExtractor={(item) => item.name}
        />
      </View>
    </View>
  );
};

export default Cart;
