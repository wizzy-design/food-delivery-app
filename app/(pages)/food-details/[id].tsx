import CustomHeader from "@/components/CustomHeader";
import { images } from "@/constants";
import { supabase } from "@/lib/supabase";
import { MenuItem } from "@/type";
import { Image as PerfImage } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SearchId = () => {
  const { id } = useLocalSearchParams();
  const [item, setItem] = useState<MenuItem | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const getItemDetails = async () => {
      try {
        setIsFetching(true);
        const { data, error } = await supabase
          .from("menu_items")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setItem(data);
      } catch (error: any) {
        Alert.alert("Error", error.message);
      } finally {
        setIsFetching(false);
      }
    };

    if (id) getItemDetails();
  }, [id]);

  return (
    <SafeAreaView className="p-5 flex-1 bg-white">
      <CustomHeader />

      {isFetching ? (
        <ActivityIndicator size="large" color="#FE8C00" className="mt-20" />
      ) : (
        <View>
          <View className="flex-row justify-between relative">
            {/* Left Side: Details */}
            <View className="w-[55%] mt-5">
              <Text className="text-2xl font-quicksand-bold text-dark-100 leading-tight">
                {item?.name}
              </Text>
              <Text className="text-gray-100 font-quicksand-medium mt-1">
                {item?.category_name}
              </Text>

              <View className="flex-row items-center gap-1 my-3">
                {[...Array(5)].map((_, i) => (
                  <Image
                    key={i}
                    source={images.star}
                    className="size-3.5"
                    resizeMode="contain"
                    tintColor={
                      i < Math.round(item?.rating ?? 0) ? "#FE8C00" : "#E2E8F0"
                    }
                  />
                ))}
                <Text className="font-quicksand-semibold text-gray-100 ml-1 text-sm">
                  {item?.rating?.toFixed(1)}/5
                </Text>
              </View>

              <View className="mt-2 flex-row items-baseline">
                <Text className="text-primary text-2xl font-quicksand-bold">
                  ₦
                </Text>
                <Text className="text-dark-100 text-3xl font-quicksand-bold ml-0.5">
                  {item?.price}
                </Text>
              </View>

              <View className="flex-row gap-8 mt-6">
                <View>
                  <Text className="text-gray-100 text-xs font-quicksand-medium uppercase tracking-wider">
                    Calories
                  </Text>
                  <Text className="text-dark-100 text-base font-quicksand-bold mt-0.5">
                    {item?.calories} Cal
                  </Text>
                </View>
                <View>
                  <Text className="text-gray-100 text-xs font-quicksand-medium uppercase tracking-wider">
                    Protein
                  </Text>
                  <Text className="text-dark-100 text-base font-quicksand-bold mt-0.5">
                    {item?.protein}g
                  </Text>
                </View>
              </View>

              <View className="mt-6">
                <Text className="text-gray-100 text-xs font-quicksand-medium uppercase tracking-wider">
                  Bun Type
                </Text>
                <Text className="text-dark-100 text-base font-quicksand-bold mt-0.5">
                  Whole Wheat
                </Text>
              </View>
            </View>

            {/* Right Side: Large Image */}
            <View className="absolute -right-10 top-0 w-[65%] h-96">
              <PerfImage
                source={{ uri: item?.image_url }}
                className="w-full h-full"
                contentFit="contain"
                cachePolicy="disk"
                priority="high"
                transition={500}
              />
            </View>
          </View>

          <View className="mt-8">
            <View className="bg-[#FE8C000D] rounded-[30px] flex-row justify-between px-5 py-3">
              {[
                { icon: images.dollar, value: "Free Delivery" },
                { icon: images.clock, value: "30-45 mins" },
                { icon: images.star, value: Math.round(item?.rating ?? 0) },
              ].map((item, index) => (
                <View className="flex-row items-center gap-2" key={index}>
                  <Image
                    source={item.icon}
                    className="size-4 shrink-0"
                    resizeMode="contain"
                  />
                  <Text className="text-sm text-dark-100 font-quicksand-semibold ">
                    {item.value}
                  </Text>
                </View>
              ))}
            </View>

            <Text className="text-gray-100 font-quicksand-medium leading-6 mt-6">
              {item?.description}
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchId;
