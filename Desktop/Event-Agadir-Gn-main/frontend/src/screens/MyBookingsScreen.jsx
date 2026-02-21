import { View, Text, StyleSheet, TextInput, FlatList, Pressable, Image } from "react-native";
import { useBookingsByEmail, type Booking } from "@/src/services/useBookingsByEmail";
import { useBookingStore } from "@/src/stores/useBookingStore";
import { useEffect, useMemo, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function MyBookingsScreen() {
  const storedEmail = useBookingStore((s) => s.email);
  const setEmail = useBookingStore((s) => s.setEmail);
  const [email, setEmailInput] = useState(storedEmail);
  const { data, refetch, isLoading, error } = useBookingsByEmail(storedEmail);
  const [query, setQuery] = useState("");
  const filters = ["Tout voir", "À venir", "Passés"];
  const [selected, setSelected] = useState("Tout voir");

  useEffect(() => {
    setEmail(email);
  }, [email]);

  function norm(v?: string) {
    return (v || "").toLowerCase();
  }

  function isUpcoming(item: any) {
    const d = new Date(item?.date || "");
    if (Number.isNaN(d.getTime())) return false;
    return d.getTime() >= Date.now();
  }

  function isPast(item: any) {
    const d = new Date(item?.date || "");
    if (Number.isNaN(d.getTime())) return false;
    return d.getTime() < Date.now();
  }

  const list = useMemo(() => {
    const base = (data || []).filter((b: any) => {
      return (
        norm(b?.email).includes(norm(query)) ||
        norm(String(b?.code || "")).includes(norm(query))
      );
    });
    if (selected === "À venir") return base.filter(isUpcoming);
    if (selected === "Passés") return base.filter(isPast);
    return base;
  }, [data, query, selected]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.circle}>
          <Ionicons name="chevron-back" size={18} color="#11181C" />
        </Pressable>
        <Text style={styles.title}>Mes Réservations</Text>
        <Pressable style={styles.circle}>
          <Ionicons name="settings-outline" size={18} color="#11181C" />
        </Pressable>
      </View>

      <View style={styles.searchBox}>
        <Ionicons name="search" size={16} color="#687076" />
        <TextInput
          placeholder="Rechercher par email ou code..."
          value={query}
          onChangeText={setQuery}
          style={styles.search}
        />
      </View>

      <View style={styles.filters}>
        {filters.map((f) => (
          <Pressable
            key={f}
            onPress={() => setSelected(f)}
            style={[styles.chip, selected === f ? styles.chipActive : undefined]}
          >
            <Text style={[styles.chipText, selected === f ? styles.chipTextActive : undefined]}>
              {f}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={{ height: 8 }} />

      {isLoading && <Text style={styles.loading}>Chargement...</Text>}
      {error && <Text style={styles.errorText}>Erreur de chargement</Text>}

      <FlatList
        data={list}
        keyExtractor={(item: Booking) => String(item.id)}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }: { item: Booking }) => {
          const status = (item as any)?.status || "CONFIRMÉ";
          const date = (item as any)?.date || "15 Août • 20:00";
          const venue = (item as any)?.venue || "Théâtre de Verdure, Agadir";
          const title = (item as any)?.eventTitle || "La Grande Soirée Gnawa";
          const code = (item as any)?.code || "#GNW-442";
          const tickets = item.tickets ?? 1;
          const soon = status.toLowerCase().includes("bientôt");
          return (
            <View style={styles.card}>
              <View style={styles.cardTop}>
                <View style={styles.thumbBox}>
                  <Image
                    source={{ uri: (item as any)?.image || "https://via.placeholder.com/120x120" }}
                    style={styles.thumb}
                  />
                  <View style={[styles.statusBadge, soon ? styles.statusSoon : styles.statusOk]}>
                    <Text style={[styles.statusText, soon ? styles.statusTextSoon : styles.statusTextOk]}>
                      {status}
                    </Text>
                  </View>
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.eventTitle}>{title}</Text>
                  <View style={styles.row}>
                    <Ionicons name="calendar-outline" size={14} color="#687076" />
                    <Text style={styles.meta}>{date}</Text>
                  </View>
                  <View style={styles.row}>
                    <Ionicons name="location-outline" size={14} color="#687076" />
                    <Text style={styles.meta}>{venue}</Text>
                  </View>
                  <View style={[styles.badge, { alignSelf: "flex-start" }]}>
                    <Ionicons name="ticket-outline" size={14} color="#11181C" />
                    <Text style={styles.badgeText}>{tickets} Billet{tickets > 1 ? "s" : ""}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.bottomRow}>
                <View>
                  <Text style={styles.codeLabel}>CODE</Text>
                  <Text style={styles.codeValue}>{code}</Text>
                </View>
                <Pressable style={styles.viewBtn} onPress={() => refetch()}>
                  <Ionicons name="qr-code-outline" size={16} color="#fff" />
                  <Text style={styles.viewBtnText}>Voir le billet</Text>
                </Pressable>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#FAFAF8" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  circle: {
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 1,
  },
  title: { fontSize: 20, fontWeight: "800" },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 24,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    marginTop: 10,
  },
  search: { flex: 1, paddingVertical: 10, fontSize: 16 },
  filters: { flexDirection: "row", gap: 10, marginTop: 12 },
  chip: { borderRadius: 999, backgroundColor: "#eee", paddingHorizontal: 14, paddingVertical: 8 },
  chipActive: { backgroundColor: "#F3D300" },
  chipText: { color: "#11181C", fontSize: 14, fontWeight: "700" },
  chipTextActive: { color: "#11181C" },
  loading: { marginTop: 8 },
  errorText: { marginTop: 8, color: "#b00020" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  cardTop: { flexDirection: "row", alignItems: "center" },
  thumbBox: { position: "relative" },
  thumb: { width: 64, height: 64, borderRadius: 12 },
  statusBadge: {
    position: "absolute",
    top: -8,
    left: -8,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusOk: { backgroundColor: "#11181C" },
  statusTextOk: { color: "#F3D300", fontWeight: "800", fontSize: 11 },
  statusSoon: { backgroundColor: "#F3D300" },
  statusTextSoon: { color: "#11181C", fontWeight: "800", fontSize: 11 },
  eventTitle: { fontSize: 16, fontWeight: "800" },
  row: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 2 },
  meta: { fontSize: 13, color: "#687076" },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#F8F8F8",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 8,
  },
  badgeText: { fontSize: 12, fontWeight: "800", color: "#11181C" },
  bottomRow: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  codeLabel: { fontSize: 12, color: "#687076", fontWeight: "700" },
  codeValue: { fontSize: 14, fontWeight: "800", letterSpacing: 1 },
  viewBtn: {
    backgroundColor: "#11181C",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  viewBtnText: { color: "#fff", fontWeight: "800" },
});
