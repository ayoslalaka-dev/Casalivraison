import { View, Text, Image, StyleSheet, ScrollView, Pressable } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useArtist } from "@/src/services/useArtist";
import { LoadingSpinner } from "@/src/components/LoadingSpinner";
import { CustomButton } from "@/src/components/CustomButton";
import { Ionicons } from "@expo/vector-icons";

export default function ArtistDetailScreen() {
  const route = useRoute<any>();
  const id = route.params?.id as string;
  const { data, isLoading, error } = useArtist(id);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <View style={styles.center}><Text>Erreur de chargement</Text></View>;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Image
          source={{ uri: data?.photoUrl || "https://via.placeholder.com/1000x500" }}
          style={styles.banner}
        />
        <View style={styles.headerActions}>
          <Pressable style={styles.circle}>
            <Ionicons name="chevron-back" size={20} color="#11181C" />
          </Pressable>
          <Pressable style={styles.circle}>
            <Ionicons name="share-outline" size={20} color="#11181C" />
          </Pressable>
        </View>
        <View style={styles.nameBox}>
          <Text style={styles.title}>{data?.name}</Text>
        </View>
      </View>

      <View style={styles.chips}>
        {((data as any)?.genre || (data as any)?.style) ? (
          <View style={[styles.chip, styles.chipPrimary]}>
            <Text style={[styles.chipText, styles.chipTextPrimary]}>
              {(data as any)?.genre || (data as any)?.style}
            </Text>
          </View>
        ) : null}
        {(data as any)?.category ? (
          <View style={styles.chip}>
            <Text style={styles.chipText}>{(data as any).category}</Text>
          </View>
        ) : null}
        {(data as any)?.city ? (
          <View style={styles.chip}>
            <Text style={styles.chipText}>{(data as any).city}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={18} color="#11181C" />
          <View style={styles.infoCol}>
            <Text style={styles.infoLabel}>Date</Text>
            <Text style={styles.infoValue}>
              {(data as any)?.date || "Samedi 24 Août"}
            </Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={18} color="#11181C" />
          <View style={styles.infoCol}>
            <Text style={styles.infoLabel}>Heure</Text>
            <Text style={styles.infoValue}>
              {(data as any)?.time || "21:30"}
            </Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="map-outline" size={18} color="#11181C" />
          <View style={styles.infoCol}>
            <Text style={styles.infoLabel}>Scène</Text>
            <Text style={styles.infoValue}>
              {(data as any)?.stage || "Verdure"}
            </Text>
          </View>
        </View>
        <Pressable style={styles.mapBtn}>
          <Text style={styles.mapBtnText}>Voir sur la carte</Text>
          <Ionicons name="chevron-forward" size={16} color="#11181C" />
        </Pressable>
      </View>

      <Text style={styles.section}>À propos</Text>
      <Text style={styles.text}>
        {data?.bio ||
          "Né à Ksar El Kébir, il est l’une des figures les plus emblématiques de la musique Gnawa contemporaine."}
      </Text>

      {Array.isArray((data as any)?.gallery) && (data as any).gallery.length > 0 ? (
        <>
          <Text style={styles.section}>Galerie</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.gallery}>
            {(data as any).gallery.map((src: string, idx: number) => (
              <Image key={idx} source={{ uri: src }} style={styles.galleryImage} />
            ))}
          </ScrollView>
        </>
      ) : null}

      <View style={{ height: 16 }} />
      <CustomButton
        title={`Réserver • ${(data as any)?.price ? `${(data as any).price} MAD` : "150 MAD"}`}
        onPress={() => {}}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 16, paddingBottom: 24 },
  header: { marginBottom: 12 },
  banner: { width: "100%", height: 280, borderRadius: 24 },
  headerActions: {
    position: "absolute",
    top: 16,
    right: 16,
    flexDirection: "row",
    gap: 10,
  },
  circle: {
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  nameBox: {
    position: "absolute",
    left: 24,
    bottom: 24,
    right: 24,
  },
  title: { fontSize: 26, fontWeight: "800", color: "#fff" },
  chips: { flexDirection: "row", gap: 8, flexWrap: "wrap", marginBottom: 12 },
  chip: {
    borderRadius: 999,
    backgroundColor: "#eee",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipText: { color: "#11181C", fontSize: 13, fontWeight: "700" },
  chipPrimary: { backgroundColor: "#11181C" },
  chipTextPrimary: { color: "#F3D300" },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  infoRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  infoCol: { flexDirection: "column" },
  infoLabel: { fontSize: 12, color: "#687076", fontWeight: "600" },
  infoValue: { fontSize: 14, color: "#11181C", fontWeight: "700" },
  mapBtn: {
    marginTop: 8,
    backgroundColor: "#F3D300",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mapBtnText: { color: "#11181C", fontSize: 14, fontWeight: "700" },
  section: { fontSize: 18, fontWeight: "700", marginTop: 16 },
  text: { fontSize: 14, color: "#11181C", marginTop: 6, lineHeight: 20 },
  gallery: { marginTop: 8 },
  galleryImage: { width: 180, height: 100, borderRadius: 12, marginRight: 12 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
});
