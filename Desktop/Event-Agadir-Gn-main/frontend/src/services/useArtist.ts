import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "@/src/constants";
export function useArtist(id) {
  return useQuery({
    queryKey: ["artist", id],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/artists/${id}`);
      if (!res.ok) throw new Error("Failed to load artist");
      return res.json();
    },
    enabled: !!id,
  });
}
