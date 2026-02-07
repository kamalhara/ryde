import MapView, { PROVIDER_DEFAULT } from "react-native-maps";
import { StyleSheet } from "react-native";

export default function Map() {
  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      style={styles.map}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      showsUserLocation={true}
      showsMyLocationButton={true}
    />
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
});
