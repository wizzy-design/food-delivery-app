import CustomListHeader from "@/components/CustomListHeader";
import Filters from "@/components/Filters";
import MenuCard from "@/components/MenuCard";
import SearchBar from "@/components/SearchBar";
import { supabase } from "@/lib/supabase";
import { MenuItem } from "@/type";
import cn from "clsx";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import emptyState from "@/assets/images/empty-state.png";

const Search = () => {
  const { category, query } = useLocalSearchParams<{
    category: string;
    query: string;
  }>();
  const [isFetching, setIsFetching] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[] | null>();

  const getMenuItems = async (category?: string, query?: string) => {
    try {
      setMenuItems([]);
      setIsFetching(true);
      let result = supabase.from("menu_items").select("*");

      if (category) result = result.eq("category_name", category);
      if (query) result = result.ilike("name", `%${query}%`);

      const { data, error } = await result;

      if (error) throw error;

      console.log("Menu items data", JSON.stringify(data, null, 2));
      setMenuItems(data || []);
    } catch (error: any) {
      console.error(error);
      Alert.alert("Error occured while fetching menu items", error.message);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getMenuItems(category, query);
  }, [category, query]);

  return (
    <SafeAreaView className="flex-1">
      <FlatList
        contentContainerClassName="px-5 gap-10 pb-32"
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          const isRightColItem = index % 2 === 0;

          return (
            <View
              className={cn(
                "flex-1 max-w-[48%] ",
                isRightColItem ? "mt-0" : "mt-16",
              )}
            >
              <MenuCard item={item} />
            </View>
          );
        }}
        columnWrapperClassName="gap-7"
        numColumns={2}
        ListHeaderComponent={
          <View className="mb-10">
            <CustomListHeader
              title="Find your Favorite Food"
              subtitle="SEARCH"
              className="mb-[30px]"
            />

            <SearchBar />
            <Filters />
          </View>
        }
        ListEmptyComponent={
          isFetching ? (
            <View>
              <ActivityIndicator size={"large"} color={"#FE8C00"} />
            </View>
          ) : query ? (
            <View className="items-center">
              <Image
                source={emptyState}
                resizeMode="contain"
                className="w-[172px] h-[128px]"
              />

              <View className="items-center">
                <Text className="font-quicksand-bold text-xl">
                  Nothing matched your search
                </Text>
                <Text className="font-quicksand-medium text-gray-100">
                  Try a different search term or check for typos.
                </Text>
              </View>
            </View>
          ) : undefined
        }
      />
    </SafeAreaView>
  );
};

export default Search;
