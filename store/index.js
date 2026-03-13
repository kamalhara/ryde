import { create } from "zustand";

// Dev auth bypass store — skip Clerk for quick testing
export const useDevAuthStore = create((set) => ({
  isDevLoggedIn: false,
  devUser: {
    id: "dev_user_123",
    firstName: "Dev",
    fullName: "Dev User",
    emailAddresses: [{ emailAddress: "dev@ryde.test" }],
    imageUrl: "https://ui-avatars.com/api/?name=Dev+User&background=22c55e&color=fff",
    createdAt: new Date().toISOString(),
  },
  devLogin: () => set({ isDevLoggedIn: true }),
  devLogout: () => set({ isDevLoggedIn: false }),
}));

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
