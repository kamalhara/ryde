import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="(tabs)" options={{ headerShown: false }} />
    </Tabs>
  );
};

export default TabsLayout;
