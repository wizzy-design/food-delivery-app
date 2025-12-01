import { supabase } from "@/lib/supabase";
import cn from "clsx";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Filters = () => {
  const searchParams = useLocalSearchParams();
  const [filters, setFilters] = useState([{ $id: "all", name: "All" }]);
  const [active, setActive] = useState(searchParams.category || "All");
  const [isFetching, setisFetching] = useState(false);

  const getCategories = async () => {
    try {
      setisFetching(true);
      const { data, error } = await supabase.from("categories").select("*");

      if (error) throw error;
      if (data)
        setFilters((prev) => [
          ...prev,
          ...data
            .map((filter) => ({ $id: filter.id, name: filter.name }))
            .filter(
              (newFilter) =>
                !prev.some((existing) => existing.name === newFilter.name)
            ),
        ]);
    } catch (error: any) {
      console.error(error);
      Alert.alert("Error occured while fetching categories", error.message);
    } finally {
      setisFetching(false);
    }
  };

  const handlePress = (name: string) => {
    setActive(name);

    if (name === "All") {
      router.setParams({ category: undefined });
    } else {
      router.setParams({ category: name });
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  if (isFetching) {
    return (
      <View className="flex-row items-center mt-7 gap-2 animate-pulse">
        {Array.from({ length: 5 }).map((_, idx) => (
          <View
            key={idx}
            className="bg-gray-200/30 filter h-[38px] w-[75px] "
          />
        ))}
      </View>
    );
  }

  return (
    <FlatList
      data={filters}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TouchableOpacity
          className={cn(
            active === item.name ? "bg-amber-500" : "bg-white",
            "filter"
          )}
          style={
            Platform.OS === "android"
              ? { elevation: 5, shadowColor: "#878787" }
              : {}
          }
          onPress={() => handlePress(item.name)}
        >
          <Text
            className={cn(active === item.name ? "text-white" : "text-black")}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
      className="mt-7"
      showsHorizontalScrollIndicator={false}
      horizontal
    />
  );
};

export default Filters;
