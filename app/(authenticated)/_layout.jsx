import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "white" }}>
      <Tabs.Screen
        name="home"
        options={{ headerShown: false, title: "Home" }}
      />
      <Tabs.Screen
        name="rides"
        options={{ headerShown: false, title: "Rides" }}
      />
      <Tabs.Screen
        name="chat"
        options={{ headerShown: false, title: "Chat" }}
      />
      <Tabs.Screen
        name="profile"
        options={{ headerShown: false, title: "Profile" }}
      />
    </Tabs>
  );
};

export default TabsLayout;
