import { router } from "expo-router";
import { FlatList, View } from "react-native";
import CustomButton from "../../components/CustomButton";
import DriverCard from "../../components/DriverCard";
import RideLayout from "../../components/RideLayout";
import { driversData } from "../../data/driver";
import { useDriverStore } from "../../store";

export default function ConfirmRide() {
  const { drivers, selectedDriver, setSelectedDriver } = useDriverStore();

  return (
    <RideLayout title="Choose a driver" snapPoints={["65%", "85%"]}>
      <FlatList
        data={driversData}
        renderItem={({ item }) => (
          <DriverCard
            item={item}
            selected={selectedDriver}
            setSelected={() => setSelectedDriver(item.id)}
          />
        )}
        keyExtractor={(item) => String(item.id)}
        ListFooterComponent={() => (
          <View className="mx-5 mt-10">
            <CustomButton
              title="Select Ride"
              onPress={() => router.push("./book-ride")}
            />
          </View>
        )}
      />
    </RideLayout>
  );
}
