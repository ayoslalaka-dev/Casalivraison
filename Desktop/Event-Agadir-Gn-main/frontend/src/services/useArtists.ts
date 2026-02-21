import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "@/src/constants";

export function useArtists() {
  return useQuery({
    queryKey: ["artists"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/artists`);
      if (!res.ok) throw new Error("Failed to load artists");
      return res.json();
    },
  });
}
