import { MenuItem, Topping } from "@/type";
import { create } from "zustand";

type FoodDetailCache = {
  item: MenuItem;
  toppings: Topping[];
  sides: Topping[];
};

type ProfileCache = {
  id: string;
  full_name?: string;
  phone_number?: string;
  address_1?: string;
  address_2?: string;
  avatar_url?: string;
  [key: string]: any;
};

type DataState = {
  // Menu items cache: keyed by "category|query" string
  menuItemsCache: Record<string, MenuItem[]>;
  setMenuItemsCache: (key: string, items: MenuItem[]) => void;

  // Food detail cache: keyed by item id
  foodDetailCache: Record<string, FoodDetailCache>;
  setFoodDetailCache: (id: string, detail: FoodDetailCache) => void;

  // Profile cache: keyed by userId
  profileCache: Record<string, ProfileCache>;
  setProfileCache: (userId: string, profile: ProfileCache) => void;
  clearProfileCache: (userId: string) => void;
};

const useDataStore = create<DataState>((set) => ({
  menuItemsCache: {},
  setMenuItemsCache: (key, items) =>
    set((state) => ({
      menuItemsCache: { ...state.menuItemsCache, [key]: items },
    })),

  foodDetailCache: {},
  setFoodDetailCache: (id, detail) =>
    set((state) => ({
      foodDetailCache: { ...state.foodDetailCache, [id]: detail },
    })),

  profileCache: {},
  setProfileCache: (userId, profile) =>
    set((state) => ({
      profileCache: { ...state.profileCache, [userId]: profile },
    })),
  clearProfileCache: (userId) =>
    set((state) => {
      const next = { ...state.profileCache };
      delete next[userId];
      return { profileCache: next };
    }),
}));

export default useDataStore;
