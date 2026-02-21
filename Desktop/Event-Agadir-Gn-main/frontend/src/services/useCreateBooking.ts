import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from "@/src/constants";

export function useCreateBooking() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const res = await fetch(`${API_BASE_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const e = await res.text();
        throw new Error(e || "Booking failed");
      }
      return res.json();
    },
    onSuccess: (data) => {
      const email = data?.email;
      if (email) {
        qc.invalidateQueries({ queryKey: ["bookings", email] });
      } else {
        qc.invalidateQueries({ queryKey: ["bookings"] });
      }
    },
  });
}

