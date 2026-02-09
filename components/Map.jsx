import { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_DEFAULT } from "react-native-maps";
import { icons } from "../constants";
import { driversData } from "../data/driver";
import { calculateRegion, generateMarkersFromData } from "../lib/map";
import { useDriverStore, useLocationStore } from "../store";

export default function Map() {
  const {
    userLongitude,
    userLatitude,
    destinationLongitude,
    destinationLatitude,
  } = useLocationStore();

  const { selectedDriver } = useDriverStore();
  const [markers, setMarkers] = useState([]);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const mapRef = useRef(null);

  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  });

  // Animate to user location when it becomes available
  useEffect(() => {
    if (userLatitude && userLongitude && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: userLatitude,
          longitude: userLongitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000,
      );
    }
  }, [userLatitude, userLongitude]);

  // Generate driver markers
  useEffect(() => {
    if (Array.isArray(driversData)) {
      if (!userLatitude || !userLongitude) return;

      const newMarkers = generateMarkersFromData({
        data: driversData,
        userLatitude,
        userLongitude,
      });
      setMarkers(newMarkers);
    }
  }, [userLatitude, userLongitude]);

  // Fetch route from OSRM (free routing service)
  useEffect(() => {
    const fetchRoute = async () => {
      if (
        !userLatitude ||
        !userLongitude ||
        !destinationLatitude ||
        !destinationLongitude
      ) {
        setRouteCoordinates([]);
        return;
      }

      try {
        // OSRM free public API - returns driving route
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${userLongitude},${userLatitude};${destinationLongitude},${destinationLatitude}?overview=full&geometries=geojson`,
        );
        const data = await response.json();

        if (data.routes && data.routes.length > 0) {
          // Convert GeoJSON coordinates [lng, lat] to {latitude, longitude}
          const coordinates = data.routes[0].geometry.coordinates.map(
            ([lng, lat]) => ({
              latitude: lat,
              longitude: lng,
            }),
          );
          setRouteCoordinates(coordinates);

          // Fit map to show the entire route
          if (mapRef.current && coordinates.length > 0) {
            mapRef.current.fitToCoordinates(coordinates, {
              edgePadding: {
                top: 70,
                right: 70,
                bottom: 70,
                left: 70,
              },
              animated: true,
            });
          }
        }
      } catch (error) {
        console.log("Route fetch error:", error);
      }
    };

    fetchRoute();
  }, [userLatitude, userLongitude, destinationLatitude, destinationLongitude]);

  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_DEFAULT}
      style={styles.map}
      initialRegion={region}
      showsUserLocation={true}
      userInterfaceStyle="light"
      showsMyLocationButton={true}
      mapType="mutedStandard"
      tintColor="black"
      showsPointsOfInterest={false}
    >
      {/* Driver markers */}
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={marker.title}
          image={
            selectedDriver === marker.id ? icons.selectedMarker : icons.marker
          }
        />
      ))}

      {/* Destination marker */}
      {destinationLatitude && destinationLongitude && (
        <Marker
          key="destination"
          coordinate={{
            latitude: destinationLatitude,
            longitude: destinationLongitude,
          }}
          title="Destination"
          image={icons.pin}
        />
      )}

      {/* Route polyline */}
      {routeCoordinates.length > 0 && (
        <Polyline
          coordinates={routeCoordinates}
          strokeWidth={4}
          strokeColor="#0286FF"
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
});
