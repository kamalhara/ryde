import { create } from "zustand";

export const useLocationStore = create((set) => ({
  userAddress: null,
  userLongitude: null,
  userLatitude: null,
  destinationAddress: null,
  destinationLongitude: null,
  destinationLatitude: null,
  setUserLocation: ({ latitude, longitude, address }) =>
    set({
      userAddress: address,
      userLongitude: longitude,
      userLatitude: latitude,
    }),
  setDestinationLocation: ({ latitude, longitude, address }) =>
    set({
      destinationAddress: address,
      destinationLongitude: longitude,
      destinationLatitude: latitude,
    }),
}));
export const useDriverStore = create((set) => ({
  drivers: [],
  selectedDriver: null,
  setSelectedDriver: (driverId) => set({ selectedDriver: driverId }),
  setDrivers: (drivers) => set({ drivers: drivers }),
  clearSelectedDriver: () => set({ selectedDriver: null }),
}));
