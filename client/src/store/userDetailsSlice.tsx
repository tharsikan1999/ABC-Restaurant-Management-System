import create from "zustand";
import { persist } from "zustand/middleware";

interface User {
  userName: string;
  email: string;
  phone: string;
}

interface UserStore {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  clearCurrentUser: () => void;
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      currentUser: null,
      setCurrentUser: (user) => set({ currentUser: user }),
      clearCurrentUser: () => set({ currentUser: null }),
    }),
    {
      name: "user-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useUserStore;
