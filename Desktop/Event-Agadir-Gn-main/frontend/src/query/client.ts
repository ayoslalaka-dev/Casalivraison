import { QueryClient } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { persistQueryClient } from "@tanstack/react-query-persist-client";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60,
      gcTime: 1000 * 60 * 60,
    },
  },
});

export let queryHydrationPromise: Promise<void> | null = null;

export function enableQueryPersistence() {
  const persister = createAsyncStoragePersister({
    storage: AsyncStorage,
  });
  queryHydrationPromise = persistQueryClient({
    queryClient,
    persister,
    dehydrateOptions: {
      shouldDehydrateQuery: (q) => {
        const key = q.queryKey[0];
        return key === "event" || key === "artists";
      },
    },
  });
}
