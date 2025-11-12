import { create } from "zustand";

interface LocationState {
  selectedState: string | null;
  selectedCity: string | null;
  citylat: number | null;
  citylong: number | null;
  setState: (state: string | null) => void;
  setCity: (city: string | null) => void;
  setCoordinates: (lat: number | null, lon: number | null) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  selectedState: null,
  selectedCity: null,
  citylat: null,
  citylong: null,
  setState: (state) => set({ selectedState: state }),
  setCity: (city) => set({ selectedCity: city }),
  setCoordinates: (lat, lon) => set({ citylat: lat, citylong: lon }),
}));