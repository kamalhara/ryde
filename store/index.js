import { create } from "zustand";

export const useLocationStore = create((set) => ({
  userAddress: null,
  userLongitude: null,
  userLatitude: null,
  destinationAddress: null,
  destinationLongitude: null,
  destinationLatitude: null,
  setUserLocation: (address, longitude, latitude) =>
    set({
      userAddress: address,
      userLongitude: longitude,
      userLatitude: latitude,
    }),
  setDestinationLocation: (address, longitude, latitude) =>
    set({
      destinationAddress: address,
      destinationLongitude: longitude,
      destinationLatitude: latitude,
    }),
}));
export const useDriverStore = create((set) => ({
  driver: [],
  selectedDriver: null,
  setSelectedDriver: (driverId) => set({ selectedDriver: driverId }),
  setDrivers: (drivers) => set({ driver: drivers }),
  clearSelectedDriver: () => set({ selectedDriver: null }),
}));
