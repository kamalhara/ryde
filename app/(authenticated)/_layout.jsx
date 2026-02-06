import { Tabs } from "expo-router";
import { Image, View } from "react-native";
import { icons } from "../constants";

const TabsLayout = () => {
  const TabsIcon = ({ source, focused }) => {
    return (
      <View
        className={`flex flex-row justify-center items-center rounded-full ${focused ? "bg-green-500" : ""}`}
      >
        <View
          className={`w-12 h-12 items-center justify-center rounded-full ${focused ? "bg-green-500" : ""}`}
        >
          <Image
            source={source}
            tintColor="white"
            resizeMode="contain"
            className="w-7 h-7"
          />
        </View>
      </View>
    );
  };
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#3f3f3f",
          borderRadius: 50,
          paddingVertical: 12,
          overflow: "hidden",
          marginHorizontal: 20,
          marginBottom: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          position: "absolute",
          gap: 15,
        },
        tabBarItemStyle: {
          flex: 2,
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarSafeAreaInsets: {
          bottom: 0,
        },
      }}
    >
      <Tabs.Screen
        name="(tabs)/home"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabsIcon focused={focused} source={icons.home} />
          ),
        }}
      />
      <Tabs.Screen
        name="(tabs)/rides"
        options={{
          headerShown: false,
          title: "Rides",
          tabBarIcon: ({ focused }) => (
            <TabsIcon focused={focused} source={icons.list} />
          ),
        }}
      />
      <Tabs.Screen
        name="(tabs)/chat"
        options={{
          headerShown: false,
          title: "Chat",
          tabBarIcon: ({ focused }) => (
            <TabsIcon focused={focused} source={icons.chat} />
          ),
        }}
      />
      <Tabs.Screen
        name="(tabs)/profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabsIcon focused={focused} source={icons.profile} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
