import CustomListHeader from "@/components/CustomListHeader";
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
                  isEven ? "flex-row" : "flex-row-reverse",
                )}
                style={{ backgroundColor: item.color }}
                android_ripple={{ color: "#fffff22" }}
              >
                {({ pressed }) => (
                  <Fragment>
                    <View
                      className={cn("h-full w-1/2", index === 0 && "w-2/3")}
                    >
                      <Image
                        source={item.image}
                        className={cn("size-full")}
                        resizeMode="cover"
                      />
                    </View>

                    <View
                      className={cn(
                        "gap-3.5",
                        isEven ? "" : "relative -left-12",
                        index === 0 && "relative -left-[6.7rem]",
                      )}
                    >
                      <Text
                        className={cn(
                          "text-3xl text-white leading-tight font-rubik-extrabold max-w-[170px] text-wrap",
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
          <CustomListHeader subtitle="Deliver To" title="Asaba, Delta" />
        )}
      />
    </SafeAreaView>
  );
};

export default Index;
