import { create } from "zustand";
import { persist } from "zustand/middleware";

type BookingState = {
  email: string;
  setEmail: (email: string) => void;
};

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      email: "",
      setEmail: (email) => set({ email }),
    }),
    {
      name: "booking-store",
    }
  )
);

