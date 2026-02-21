import { View, Text, Image, StyleSheet, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useArtist } from "@/src/services/useArtist";
import { LoadingSpinner } from "@/src/components/LoadingSpinner";
import { CustomButton } from "@/src/components/CustomButton";
import { Ionicons } from "@expo/vector-icons";

export default function ArtistDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { data, isLoading, error } = useArtist(id);

    if (isLoading) return <LoadingSpinner />;
    if (error) return <View style={styles.center}><Text>Erreur de chargement</Text></View>;

    const artist = data as any;

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.header}>
                <Image
                    source={{ uri: artist?.photoUrl || "https://via.placeholder.com/1000x500" }}
                    style={styles.banner}
                />
                <View style={styles.headerActions}>
                    <Pressable style={styles.circle} onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={20} color="#11181C" />
                    </Pressable>
                    <Pressable style={styles.circle}>
                        <Ionicons name="share-outline" size={20} color="#11181C" />
                    </Pressable>
                </View>
                <View style={styles.nameBox}>
                    <Text style={styles.title}>{artist?.name}</Text>
                </View>
            </View>

            <View style={styles.chips}>
                {(artist?.genre || artist?.style) ? (
                    <View style={[styles.chip, styles.chipPrimary]}>
                        <Text style={[styles.chipText, styles.chipTextPrimary]}>
                            {artist?.genre || artist?.style}
                        </Text>
                    </View>
                ) : null}
                {artist?.category ? (
                    <View style={styles.chip}>
                        <Text style={styles.chipText}>{artist.category}</Text>
                    </View>
                ) : null}
                {artist?.city ? (
                    <View style={styles.chip}>
                        <Text style={styles.chipText}>{artist.city}</Text>
                    </View>
                ) : null}
            </View>

            <View style={styles.infoCard}>
                <View style={styles.infoRow}>
                    <Ionicons name="calendar-outline" size={18} color="#11181C" />
                    <View style={styles.infoCol}>
                        <Text style={styles.infoLabel}>Date</Text>
                        <Text style={styles.infoValue}>
                            {artist?.date || "Samedi 24 Août"}
                        </Text>
                    </View>
                </View>
                <View style={styles.infoRow}>
                    <Ionicons name="time-outline" size={18} color="#11181C" />
                    <View style={styles.infoCol}>
                        <Text style={styles.infoLabel}>Heure</Text>
                        <Text style={styles.infoValue}>
                            {artist?.time || "21:30"}
                        </Text>
                    </View>
                </View>
                <View style={styles.infoRow}>
                    <Ionicons name="map-outline" size={18} color="#11181C" />
                    <View style={styles.infoCol}>
                        <Text style={styles.infoLabel}>Scène</Text>
                        <Text style={styles.infoValue}>
                            {artist?.stage || "Verdure"}
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
                {artist?.bio ||
                    "Né à Ksar El Kébir, il est l'une des figures les plus emblématiques de la musique Gnawa contemporaine."}
            </Text>

            {Array.isArray(artist?.gallery) && artist.gallery.length > 0 ? (
                <>
                    <Text style={styles.section}>Galerie</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.gallery}>
                        {artist.gallery.map((src: string, idx: number) => (
                            <Image key={idx} source={{ uri: src }} style={styles.galleryImage} />
                        ))}
                    </ScrollView>
                </>
            ) : null}

            <View style={{ height: 16 }} />
            <CustomButton
                title={`Réserver • ${artist?.price ? `${artist.price} MAD` : "150 MAD"}`}
                onPress={() => router.push("/booking")}
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
