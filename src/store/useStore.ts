import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Filters {
  search: string;
  make: string;
  bodyType: string;
  fuelType: string;
  transmission: string;
  condition: string;
  priceMin: number;
  priceMax: number;
  yearMin: number;
  yearMax: number;
  sortBy: "newest" | "price-asc" | "price-desc" | "mileage" | "popular";
}

interface AppState {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  filters: Filters;
  setFilters: (filters: Partial<Filters>) => void;
  resetFilters: () => void;
  isAdmin: boolean;
  setIsAdmin: (v: boolean) => void;
}

const defaultFilters: Filters = {
  search: "",
  make: "",
  bodyType: "",
  fuelType: "",
  transmission: "",
  condition: "",
  priceMin: 0,
  priceMax: 500000,
  yearMin: 2015,
  yearMax: 2026,
  sortBy: "newest",
};

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      favorites: [],
      toggleFavorite: (id) =>
        set((s) => ({
          favorites: s.favorites.includes(id)
            ? s.favorites.filter((f) => f !== id)
            : [...s.favorites, id],
        })),
      filters: defaultFilters,
      setFilters: (f) => set((s) => ({ filters: { ...s.filters, ...f } })),
      resetFilters: () => set({ filters: defaultFilters }),
      isAdmin: false,
      setIsAdmin: (v) => set({ isAdmin: v }),
    }),
    { name: "car-marketplace-store" }
  )
);
