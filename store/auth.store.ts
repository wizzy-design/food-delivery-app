import { getSession } from "@/lib/services";
import { supabase } from "@/lib/supabase";
import { User } from "@/type";
import { create } from "zustand";

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;

  setIsAuthenticated: (value: boolean) => void;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;

  fetchAuthenticatedUser: () => Promise<void>;
  initializeAuthListener: () => void;
};

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: true,

  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  setUser: (user) => set({ user }),
  setLoading: (value) => set({ isLoading: value }),

  fetchAuthenticatedUser: async () => {
    set({ isLoading: true });

    try {
      const session = await getSession();
      const user = session?.user ?? null;

      if (user) set({ isAuthenticated: true, user: user as unknown as User });
      else set({ isAuthenticated: false, user: null });
    } catch (e) {
      console.log("fetchAuthenticatedUser error", e);
      set({ isAuthenticated: false, user: null });
    } finally {
      set({ isLoading: false });
    }
  },

  // Listen to login/logout changes
  initializeAuthListener: () => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", session);

      if (session?.user) {
        set({
          isAuthenticated: true,
          user: session.user as unknown as User,
        });
      } else {
        set({
          isAuthenticated: false,
          user: null,
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  },
}));

export default useAuthStore;
