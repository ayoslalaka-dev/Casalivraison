import { View, Text, TextInput, StyleSheet, Alert, Image, Pressable } from "react-native";
import { useState, useMemo } from "react";
import { CustomButton } from "@/src/components/CustomButton";
import { useCreateBooking } from "@/src/services/useCreateBooking";
import { useBookingStore } from "@/src/stores/useBookingStore";
import { useEvent } from "@/src/services/useEvent";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function BookingFormScreen() {
    const router = useRouter();
    const { data: event } = useEvent();
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmailInput] = useState("");
    const [phone, setPhone] = useState("");
    const [tickets, setTickets] = useState("1");
    const { mutateAsync, isPending, isError, error, isSuccess } = useCreateBooking();
    const setEmail = useBookingStore((s) => s.setEmail);
    const eventData = event as any;
    const price = eventData?.price ?? 150;
    const total = useMemo(() => {
        const n = Math.max(1, parseInt(tickets || "1", 10));
        return n * price;
    }, [tickets, price]);

    async function submit() {
        const nTickets = Math.max(1, parseInt(tickets || "1", 10));
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const fullName = `${name}`.trim() + (surname.trim() ? ` ${surname.trim()}` : "");
        if (!fullName.trim()) {
            Alert.alert("Validation", "Nom requis");
            return;
        }
        if (!emailValid) {
            Alert.alert("Validation", "Email invalide");
            return;
        }
        if (!Number.isFinite(nTickets) || nTickets < 1) {
            Alert.alert("Validation", "Nombre de billets doit être positif");
            return;
        }
        const res = await mutateAsync({ name: fullName, email, tickets: nTickets });
        if (res?.email) setEmail(res.email);
    }

    return (
        <View style={styles.container}>
            <Pressable style={styles.backBtn} onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={20} color="#11181C" />
            </Pressable>
            <Text style={styles.headerTitle}>Billetterie</Text>
            <View style={styles.eventCard}>
                <Image
                    source={{ uri: eventData?.bannerUrl || "https://via.placeholder.com/120x120" }}
                    style={styles.eventImage}
                />
                <View style={{ flex: 1, marginLeft: 12 }}>
                    <View style={styles.eventBadge}>
                        <Text style={styles.eventBadgeText}>Concert</Text>
                    </View>
                    <Text style={styles.eventTitle}>{eventData?.title || "La Grande Soirée Gnawa"}</Text>
                    <View style={styles.eventRow}>
                        <Ionicons name="calendar-outline" size={14} color="#687076" />
                        <Text style={styles.eventMeta}>{eventData?.date || "15 Juin 2024 • 20:00"}</Text>
                    </View>
                    <View style={styles.eventRow}>
                        <Ionicons name="location-outline" size={14} color="#687076" />
                        <Text style={styles.eventMeta}>{eventData?.location || "Théâtre de Verdure, Agadir"}</Text>
                    </View>
                </View>
            </View>

            <Text style={styles.sectionTitle}>Vos Coordonnées</Text>
            <View style={styles.row}>
                <TextInput placeholder="Votre nom" value={name} onChangeText={setName} style={[styles.input, styles.half]} />
                <TextInput placeholder="Votre prénom" value={surname} onChangeText={setSurname} style={[styles.input, styles.half]} />
            </View>
            <View style={styles.inputIconBox}>
                <Ionicons name="mail-outline" size={16} color="#687076" style={{ marginRight: 8 }} />
                <TextInput
                    placeholder="exemple@email.com"
                    value={email}
                    onChangeText={setEmailInput}
                    style={[styles.input, { flex: 1 }]}
                    keyboardType="email-address"
                />
            </View>
            <View style={styles.inputIconBox}>
                <Ionicons name="call-outline" size={16} color="#687076" style={{ marginRight: 8 }} />
                <TextInput
                    placeholder="+212 6 XX XX XX XX"
                    value={phone}
                    onChangeText={setPhone}
                    style={[styles.input, { flex: 1 }]}
                    keyboardType="phone-pad"
                />
            </View>

            <View style={styles.divider} />

            <View style={styles.ticketsHeader}>
                <Text style={styles.sectionTitle}>Billets</Text>
                <Text style={styles.priceText}>{price} MAD / place</Text>
            </View>

            <View style={styles.ticketCard}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.ticketTitle}>Entrée Standard</Text>
                    <Text style={styles.ticketSubtitle}>Accès à la zone principale</Text>
                </View>
                <View style={styles.stepper}>
                    <Pressable
                        style={[styles.stepBtn, { backgroundColor: "#eee" }]}
                        onPress={() => setTickets(String(Math.max(1, parseInt(tickets || "1", 10) - 1)))}
                    >
                        <Ionicons name="remove" size={18} color="#11181C" />
                    </Pressable>
                    <Text style={styles.stepValue}>{Math.max(1, parseInt(tickets || "1", 10))}</Text>
                    <Pressable
                        style={[styles.stepBtn, { backgroundColor: "#F3D300" }]}
                        onPress={() => setTickets(String(Math.max(1, parseInt(tickets || "1", 10) + 1)))}
                    >
                        <Ionicons name="add" size={18} color="#11181C" />
                    </Pressable>
                </View>
            </View>

            <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total à payer</Text>
                <Text style={styles.totalValue}>{total} MAD</Text>
            </View>

            <CustomButton
                title={isPending ? "Envoi..." : "Confirmer la réservation"}
                onPress={submit}
                disabled={isPending}
            />
            {isError && <Text style={styles.error}>{String(error?.message || "Erreur")}</Text>}
            {isSuccess && <Text style={styles.success}>Réservation effectuée</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, gap: 12, backgroundColor: "#FAFAF8" },
    backBtn: {
        alignSelf: "flex-start",
        padding: 8,
        backgroundColor: "#fff",
        borderRadius: 20,
        marginBottom: 8,
    },
    headerTitle: { fontSize: 20, fontWeight: "800", textAlign: "center", marginBottom: 8 },
    eventCard: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 12,
        borderWidth: 1,
        borderColor: "#eee",
        alignItems: "center",
    },
    eventImage: { width: 60, height: 60, borderRadius: 12 },
    eventBadge: {
        alignSelf: "flex-start",
        backgroundColor: "#11181C",
        borderRadius: 999,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginBottom: 4,
    },
    eventBadgeText: { color: "#F3D300", fontSize: 12, fontWeight: "700" },
    eventTitle: { fontSize: 16, fontWeight: "800" },
    eventRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 2 },
    eventMeta: { fontSize: 13, color: "#687076" },
    sectionTitle: { fontSize: 16, fontWeight: "800", marginTop: 8, marginBottom: 4 },
    row: { flexDirection: "row", gap: 10 },
    half: { flex: 1 },
    input: {
        borderWidth: 1,
        borderColor: "#eee",
        borderRadius: 24,
        paddingHorizontal: 14,
        paddingVertical: 10,
        fontSize: 16,
        backgroundColor: "#fff",
    },
    inputIconBox: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#eee",
        borderRadius: 24,
        paddingHorizontal: 12,
        backgroundColor: "#fff",
    },
    divider: { height: 1, backgroundColor: "#eee", marginVertical: 8 },
    ticketsHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    priceText: { color: "#F3D300", fontSize: 14, fontWeight: "800" },
    ticketCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 12,
        borderWidth: 1,
        borderColor: "#eee",
    },
    ticketTitle: { fontSize: 15, fontWeight: "800" },
    ticketSubtitle: { fontSize: 12, color: "#687076", marginTop: 2 },
    stepper: { flexDirection: "row", alignItems: "center", gap: 10 },
    stepBtn: {
        height: 32,
        width: 32,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    stepValue: { fontSize: 16, fontWeight: "800", width: 24, textAlign: "center" },
    totalRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 10 },
    totalLabel: { fontSize: 14, color: "#687076", fontWeight: "700" },
    totalValue: { fontSize: 18, fontWeight: "800" },
    error: { color: "#b00020", marginTop: 8 },
    success: { color: "#2e7d32", marginTop: 8 },
});
