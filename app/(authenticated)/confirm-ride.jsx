import { useState } from "react";
import { FlatList, View } from "react-native";
import CustomButton from "../../components/CustomButton";
import DriverCard from "../../components/DriverCard";
import RideLayout from "../../components/RideLayout";
import { drivers } from "../../data/driver";

export default function ConfirmRide() {
  const [selected, setSelected] = useState(null);

  return (
    <RideLayout title="Choose a driver" snapPoints={["65%", "85%"]}>
      <FlatList
        data={drivers}
        renderItem={({ item }) => (
          <DriverCard
            item={item}
            selected={selected}
            setSelected={() => setSelected(item.id)}
          />
        )}
        keyExtractor={(item) => String(item.id)}
        ListFooterComponent={() => (
          <View className="mx-5 mt-10">
            <CustomButton title="Confirm Ride" />
          </View>
        )}
      />
    </RideLayout>
  );
}
