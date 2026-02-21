import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#F3D300",
                tabBarInactiveTintColor: "#687076",
                tabBarStyle: {
                    backgroundColor: "#11181C",
                    borderTopColor: "#11181C",
                },
                headerStyle: {
                    backgroundColor: "#11181C",
                },
                headerTintColor: "#fff",
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Accueil",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="artists"
                options={{
                    title: "Artistes",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="people" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="bookings"
                options={{
                    title: "Mes Billets",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="ticket" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
