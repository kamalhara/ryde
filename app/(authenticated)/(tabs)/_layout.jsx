import { Tabs } from "expo-router";
import {
  Badge,
  Icon,
  Label,
  NativeTabs,
} from "expo-router/unstable-native-tabs";
import { Image, Platform, View } from "react-native";
import { icons } from "../../../constants";

const TabsIcon = ({ source, focused }) => {
  return (
    <View
      className={`items-center justify-center rounded-full h-12 w-12 ${
        focused ? "bg-green-500" : "bg-transparent"
      }`}
    >
      <Image
        source={source}
        tintColor={focused ? "white" : "#a3a3a3"}
        resizeMode="contain"
        className="w-6 h-6"
      />
    </View>
  );
};

const TabsLayout = () => {
  if (Platform.OS === "ios") {
    return (
      <NativeTabs>
        <NativeTabs.Trigger name="home">
          <Label>Home</Label>
          <Icon sf="house.fill" />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="rides">
          <Label>Rides</Label>
          <Icon sf="list.bullet.clipboard.fill" />
          <Badge>4</Badge>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="chat">
          <Label>Chat</Label>
          <Icon sf="message.fill" />
          <Badge>2</Badge>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="profile">
          <Label>Profile</Label>
          <Icon sf="person.fill" />
        </NativeTabs.Trigger>
      </NativeTabs>
    );
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#a3a3a3",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#2a2a2a",
          borderRadius: 40,
          marginHorizontal: 24,
          marginBottom: 30,
          height: 72,
          position: "absolute",
          elevation: 10,
          shadowColor: "#000",
          shadowOpacity: 0.3,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 6 },
          borderWidth: 1,
          borderColor: "#3a3a3a",
          borderTopWidth: 1, // overrides react navigation default layout border
          paddingTop: 0,
        },
        tabBarItemStyle: {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarIconStyle: {
          flex: 1,
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarSafeAreaInsets: {
          bottom: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabsIcon focused={focused} source={icons.home} />
          ),
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          headerShown: false,
          title: "Rides",
          tabBarIcon: ({ focused }) => (
            <TabsIcon focused={focused} source={icons.list} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          headerShown: false,
          title: "Chat",
          tabBarIcon: ({ focused }) => (
            <TabsIcon focused={focused} source={icons.chat} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
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
