import { images, offers } from "@/constants";
import cn from "clsx";
import React, { Fragment } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={offers}
        renderItem={({ item, index }) => {
          const isEven = index % 2;

          return (
            <View>
              <Pressable
                className={cn(
                  "offer-card",
                  isEven ? "flex-row" : "flex-row-reverse"
                )}
                style={{ backgroundColor: item.color }}
                android_ripple={{ color: "#fffff22" }}
              >
                {({ pressed }) => (
                  <Fragment>
                    <View className="h-full w-1/2">
                      <Image
                        source={item.image}
                        className="size-full"
                        resizeMode="contain"
                      />
                    </View>

                    <View className="gap-3.5">
                      <Text
                        className={cn(
                          isEven ? "" : "pl-5",
                          "text-3xl text-white leading-tight font-rubik-extrabold max-w-[170px] text-wrap"
                        )}
                      >
                        {item.title}
                      </Text>

                      <Image
                        source={images.arrowRight}
                        resizeMode="contain"
                        className="w-[33px] h-4"
                      />
                    </View>
                  </Fragment>
                )}
              </Pressable>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Index;
