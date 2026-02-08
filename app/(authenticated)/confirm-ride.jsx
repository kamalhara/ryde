import { useState } from "react";
import { FlatList } from "react-native";
import DriverCard from "../../components/DriverCard";
import RideLayout from "../../components/RideLayout";
import { drivers } from "../../data/driver";

export default function confirmRide() {
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
      />
    </RideLayout>
  );
}
