import { images } from "@/constants";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";

const SearchBar = () => {
  const params = useLocalSearchParams<{ query: string }>();
  const [query, setQuery] = useState(params.query);

  const handleSearch = (text: string) => {
    setQuery(text);

    if (!text.trim()) router.setParams({ query });
  };

  const handleSubmit = () => {
    if (query.trim()) router.setParams({ query });
  };

  return (
    <View className="searchbar">
      <TextInput
        className="flex-1 p-5"
        value={query}
        onChangeText={handleSearch}
        onSubmitEditing={handleSubmit}
        returnKeyType="search"
        placeholder="Search for any food"
        placeholderTextColor={"#878787"}
      />

      <TouchableOpacity className="pr-5">
        <Image source={images.search} className="size-5 " />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
