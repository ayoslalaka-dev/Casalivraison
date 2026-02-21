import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from "react-native";
import { useArtists, type Artist } from "@/src/services/useArtists";
import { LoadingSpinner } from "@/src/components/LoadingSpinner";
import { ArtistCard } from "@/src/components/ArtistCard";
import { useNavigation } from "@react-navigation/native";
import { CustomButton } from "@/src/components/CustomButton";
import { useState, useMemo } from "react";
import { getArtistLocalImage } from "@/src/constants/images";

export default function ArtistsListScreen() {
  const { data, isLoading, error } = useArtists();
  const navigation = useNavigation<any>();
  const [query, setQuery] = useState("");
  const filters = ["Tous", "Guembri", "Qraqeb", "Danse"];
  const [selected, setSelected] = useState("Tous");

  function norm(v?: string) {
    return (v || "").toLowerCase();
  }

  function matchFilter(a: any, tag: string) {
    if (tag === "Tous") return true;
    const pool: string[] = [];
    if (a?.genre) pool.push(a.genre);
    if (a?.category) pool.push(a.category);
    if (Array.isArray(a?.tags)) pool.push(...a.tags);
    return pool.map(norm).includes(norm(tag));
  }

  const list = useMemo(
    () =>
      (data || []).filter(
        (a: any) => norm(a?.name).includes(norm(query)) && matchFilter(a, selected)
      ),
    [data, query, selected]
  );

  if (isLoading) return <LoadingSpinner />;
  if (error) return <View style={styles.center}><Text>Erreur de chargement</Text></View>;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Nos Maâlems</Text>
        <TextInput
          placeholder="Rechercher un artiste..."
          value={query}
          onChangeText={setQuery}
          style={styles.search}
        />
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
        <View style={styles.grid}>
          {list?.map((a: Artist) => (
            <ArtistCard
              key={a.id}
              id={String(a.id)}
              name={a.name}
              photoUrl={a.photoUrl}
              localSource={getArtistLocalImage(a.id) || getArtistLocalImage(a.name)}
              location={(a as any).city || (a as any).location}
              subtitle={(a as any).style || (a as any).subtitle || (a as any).role}
              onPress={(id) => navigation.navigate("ArtistDetail", { id })}
            />
          ))}
        </View>
        <View style={{ height: 16 }} />
        <CustomButton title="Réserver" onPress={() => navigation.navigate("BookingForm")} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },
  content: { paddingBottom: 24 },
  title: { fontSize: 22, fontWeight: "700", marginVertical: 12 },
  search: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 24,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  filters: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 12,
    flexWrap: "wrap",
  },
  chip: {
    borderRadius: 999,
    backgroundColor: "#eee",
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  chipActive: {
    backgroundColor: "#F3D300",
  },
  chipText: {
    color: "#11181C",
    fontSize: 14,
    fontWeight: "600",
  },
  chipTextActive: {
    color: "#11181C",
  },
  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
});
