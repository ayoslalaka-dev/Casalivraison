import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "@/src/constants";

export function useEvent() {
  return useQuery({
    queryKey: ["event"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/event`);
      if (!res.ok) throw new Error("Failed to load event");
      return res.json();
    },
  });
}
