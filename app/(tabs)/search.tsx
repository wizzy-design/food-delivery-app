import CustomListHeader from "@/components/CustomListHeader";
import Filters from "@/components/Filters";
import SearchBar from "@/components/SearchBar";
import { fetchMenu } from "@/lib/services";
import React, { useEffect } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Search = () => {
  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <SafeAreaView className="flex-1 ">
      <FlatList
        contentContainerClassName="px-5 pb-32"
        data={() => {}}
        ListHeaderComponent={
          <View className="">
            <CustomListHeader
              title="Find your Favorite Food"
              subtitle="SEARCH"
              className="mb-[30px]"
            />

            <SearchBar />
            <Filters />
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Search;
