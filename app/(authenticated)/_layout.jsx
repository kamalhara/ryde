import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="(tabs)/home" options={{ headerShown: false }} />
    </Tabs>
  );
};

export default TabsLayout;
