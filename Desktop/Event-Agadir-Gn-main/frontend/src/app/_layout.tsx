import { Stack } from "expo-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient, enableQueryPersistence } from "@/src/query/client";
import { useEffect } from "react";

export default function RootLayout() {
    useEffect(() => {
        enableQueryPersistence();
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="artist/[id]" options={{ presentation: "card" }} />
                <Stack.Screen name="booking" options={{ presentation: "modal" }} />
            </Stack>
        </QueryClientProvider>
    );
}
