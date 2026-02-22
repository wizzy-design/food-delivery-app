import CustomHeader from "@/components/CustomHeader";
import ToppingsCard from "@/components/ToppingsCard";
import { images } from "@/constants";
import { supabase } from "@/lib/supabase";
import useCartStore from "@/store/cart.store";
import { MenuItem, Topping } from "@/type";
import { Image as PerfImage } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SearchId = () => {
  const { id } = useLocalSearchParams();
  const { addToCart, items, removeFromCart } = useCartStore();

  const [item, setItem] = useState<MenuItem | null>(null);
  const [toppings, setToppings] = useState<Topping[]>([]);
  const [sides, setSides] = useState<Topping[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);

  const toggleTopping = (topping: Topping) => {
    setSelectedToppings((prev) =>
      prev.find((t) => t.id === topping.id)
        ? prev.filter((t) => t.id !== topping.id)
        : [...prev, topping],
    );
  };

  const isInCart = items.some((i) => i.id === id);

  useEffect(() => {
    const getItemDetails = async () => {
      try {
        setIsFetching(true);
        // Fetch Menu Item
        const { data: itemData, error: itemError } = await supabase
          .from("menu_items")
          .select("*")
          .eq("id", id)
          .single();

        if (itemError) throw itemError;
        setItem(itemData);

        // Fetch Customizations (Toppings and Sides)
        const { data: customData, error: customError } = await supabase
          .from("menu_item_customizations")
          .select("customization_name(*)")
          .eq("menu_item_id", id);

        if (customError) throw customError;

        if (customData) {
          const allCustoms = customData.map((c: any) => c.customization_name);
          setToppings(allCustoms.filter((c: any) => c.type === "topping"));
          setSides(allCustoms.filter((c: any) => c.type === "side"));
        }
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
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
                        i < Math.round(item?.rating ?? 0)
                          ? "#FE8C00"
                          : "#E2E8F0"
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

            {/* Toppings Section */}
            {toppings.length > 0 && (
              <View className="mt-8">
                <Text className="text-dark-100 text-lg font-quicksand-bold mb-4">
                  Toppings
                </Text>

                <FlatList
                  data={toppings}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item: t }) => (
                    <ToppingsCard
                      item={t}
                      selected={!!selectedToppings.find((st) => st.id === t.id)}
                      onPress={() => toggleTopping(t)}
                    />
                  )}
                />
              </View>
            )}

            {/* Sides Section */}
            {sides.length > 0 && (
              <View className="mt-8">
                <Text className="text-dark-100 text-lg font-quicksand-bold mb-4">
                  Side Options
                </Text>

                <FlatList
                  data={sides}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item: t }) => (
                    <ToppingsCard
                      item={t}
                      selected={!!selectedToppings.find((st) => st.id === t.id)}
                      onPress={() => toggleTopping(t)}
                    />
                  )}
                />
              </View>
            )}

            {/* Footer Bar */}
            <View
              style={{ boxShadow: "0px 0px 20px 0px #0000001A" }}
              className="w-full mt-10 rounded-[20px] bg-white flex-row py-4 px-[18px] justify-between gap-8"
            >
              {/* Quantity */}
              <View className="flex-row items-center gap-4">
                <TouchableOpacity
                  className="bg-[#FE8C001A] size-[24px] items-center justify-center rounded-[4px]"
                  onPress={() => setQuantity(quantity - 1)}
                >
                  <PerfImage
                    source={images.minus}
                    contentFit="contain"
                    className="size-5"
                    tintColor={"#FE8C00"}
                  />
                </TouchableOpacity>
                <Text className="text-dark-100 font-quicksand-bold text-base">
                  {quantity}
                </Text>
                <TouchableOpacity
                  className="bg-[#FE8C001A] size-[24px] items-center justify-center rounded-[4px]"
                  onPress={() => setQuantity(quantity + 1)}
                >
                  <PerfImage
                    source={images.plus}
                    contentFit="contain"
                    className="size-5"
                    tintColor={"#FE8C00"}
                  />
                </TouchableOpacity>
              </View>

              {/* Order Button */}
              <TouchableOpacity
                className={`${
                  isInCart ? "bg-white border border-primary" : "bg-primary"
                } h-[46px] flex-1 px-5 rounded-full flex-row justify-center items-center gap-2 w-full`}
                onPress={() => {
                  if (isInCart) {
                    removeFromCart(item?.id!);
                  } else {
                    addToCart({
                      id: item?.id!,
                      name: item?.name!,
                      price:
                        (item?.price || 0) +
                        selectedToppings.reduce((acc, t) => acc + t.price, 0),
                      quantity,
                      image_url: item?.image_url!,
                    });
                  }
                }}
              >
                <PerfImage
                  source={images.bag}
                  className="size-[14px]"
                  tintColor={isInCart ? "#FE8C00" : "white"}
                />
                <Text
                  className={`${
                    isInCart ? "text-primary" : "text-white"
                  } font-quicksand-bold text-base`}
                >
                  {isInCart
                    ? "Remove from cart"
                    : `Add to cart (₦${(
                        ((item?.price || 0) +
                          selectedToppings.reduce(
                            (acc, t) => acc + t.price,
                            0,
                          )) *
                        quantity
                      ).toFixed(0)})`}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchId;
