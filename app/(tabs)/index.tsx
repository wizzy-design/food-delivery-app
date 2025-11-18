import ButtonBadge from "@/components/ButtonBadge";
import { images, offers } from "@/constants";
import cn from "clsx";
import React, { Fragment } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
        contentContainerClassName="px-5 pb-32"
        ListHeaderComponent={() => (
          <View className="flex-row justify-between items-center my-5">
            <View className="gap-1.5">
              <Text className="small-bold uppercase text-primary">
                Deliver To
              </Text>

              <TouchableOpacity className="flex-row items-center gap-1">
                <Text className="font-quicksand-semibold text-base text-[#181C2E]">
                  Rijeka, Croatia
                </Text>
                <Image
                  source={images.arrowDown}
                  resizeMode="contain"
                  className="w-[14px] h-[8px]"
                  tintColor={"#181C2E"}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity className="bg-[#181C2E] size-10 rounded-full items-center justify-center relative">
              <Image
                source={images.bag}
                resizeMode="contain"
                className="size-5"
              />

              <ButtonBadge count={20} />
            </TouchableOpacity>
          </View>
        )}
      />

    </SafeAreaView>
  );
};

export default Index;
