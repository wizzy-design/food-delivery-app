import ButtonBadge from "@/components/ButtonBadge";
import { images } from "@/constants";
import useAuthStore from "@/store/auth.store";
import useCartStore from "@/store/cart.store";
import { TabBarIconProps } from "@/type";
import cn from "clsx";
import { Redirect, Tabs } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";

const TabLayout = () => {
  const { isAuthenticated } = useAuthStore();
  const { items } = useCartStore();

  if (!isAuthenticated) return <Redirect href={"/sign-in"} />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          marginHorizontal: 20,
          height: 80,
          position: "absolute",
          bottom: 40,
          backgroundColor: "white",
          shadowColor: "#1a1a1a",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Home" focused={focused} icon={images.home} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Search" icon={images.search} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              title="Cart"
              icon={images.bag}
              focused={focused}
              badgeCount={items.length}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              title="Profile"
              icon={images.person}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};

const TabBarIcon = ({ focused, icon, title, badgeCount }: TabBarIconProps) => {
  return (
    <View className="tab-icon !gap-1.5">
      <View className="relative">
        <Image
          source={icon}
          className="size-[28px]"
          resizeMode="contain"
          tintColor={focused ? "#FE8C00" : "#181C2EB2"}
        />

        {badgeCount && <ButtonBadge count={badgeCount} />}
      </View>

      <Text
        className={cn(
          "body-semibold",
          focused ? "text-primary" : "text-gray-100",
        )}
      >
        {title}
      </Text>
    </View>
  );
};

export default TabLayout;
