import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "@/src/constants";

export function useBookingsByEmail(email) {
  return useQuery({
    queryKey: ["bookings", email],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/bookings/email/${encodeURIComponent(email)}`);
      if (!res.ok) throw new Error("Failed to load bookings");
      return res.json();
    },
    enabled: !!email,
  });
}
