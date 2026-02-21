import { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import * as ExpoSplash from "expo-splash-screen";
import { queryClient, queryHydrationPromise } from "@/src/query/client";
import { API_BASE_URL } from "@/src/constants";
import { useRouter } from "expo-router";

ExpoSplash.preventAutoHideAsync().catch(() => { });

export default function SplashScreen() {
    const router = useRouter();
    const [ready, setReady] = useState(false);

    const prefetchData = useCallback(async () => {
        const promises = [
            queryClient.prefetchQuery({
                queryKey: ["event"],
                queryFn: async () => {
                    const res = await fetch(`${API_BASE_URL}/event`);
                    if (!res.ok) throw new Error("Failed to load event");
                    return res.json();
                },
            }),
            queryClient.prefetchQuery({
                queryKey: ["artists"],
                queryFn: async () => {
                    const res = await fetch(`${API_BASE_URL}/artists`);
                    if (!res.ok) throw new Error("Failed to load artists");
                    return res.json();
                },
            }),
        ];
        await Promise.allSettled(promises);
    }, []);

    useEffect(() => {
        let isCancelled = false;
        async function init() {
            const minDelay = new Promise((r) => setTimeout(r, 2000));
            const hydration = queryHydrationPromise ?? Promise.resolve();
            await Promise.allSettled([minDelay, hydration, prefetchData()]);
            if (!isCancelled) {
                setReady(true);
            }
        }
        init();
        return () => {
            isCancelled = true;
        };
    }, [prefetchData]);

    useEffect(() => {
        async function complete() {
            if (ready) {
                await ExpoSplash.hideAsync().catch(() => { });
                router.replace("/(tabs)");
            }
        }
        complete();
    }, [ready, router]);

    return (
        <View style={styles.container}>
            <View style={styles.brandBox}>
                <Image source={require("@/assets/images/splash-icon.png")} style={styles.logo} />
                <Text style={styles.title}>Événement spécial</Text>
                <Text style={styles.subtitle}>La Grande Soirée Gnawa</Text>
            </View>
            <ActivityIndicator size="large" color="#F3D300" style={{ marginTop: 20 }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#050505",
        alignItems: "center",
        justifyContent: "center",
    },
    brandBox: {
        alignItems: "center",
    },
    logo: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: "#F3D300",
        marginBottom: 16,
    },
    title: {
        color: "#F3D300",
        fontSize: 22,
        fontWeight: "800",
    },
    subtitle: {
        color: "#12D67A",
        fontSize: 16,
        fontWeight: "600",
        marginTop: 4,
    },
});
