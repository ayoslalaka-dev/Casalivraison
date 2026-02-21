import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useEvent } from "@/src/services/useEvent";
import { LoadingSpinner } from "@/src/components/LoadingSpinner";
import { CustomButton } from "@/src/components/CustomButton";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const { data, isLoading, error } = useEvent();
  const navigation = useNavigation<any>();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <View style={styles.center}><Text>Erreur de chargement</Text></View>;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
      <View style={styles.header}>
        <Text style={styles.title}>{data?.title || "La Grande Soirée Gnawa"}</Text>
      </View>
      <Image
        source={data?.bannerUrl ? { uri: data.bannerUrl } : require("@/assets/images/partial-react-logo.png")}
        style={styles.banner}
      />
      <View style={styles.info}>
        <Text style={styles.subtitle}>{data?.date}</Text>
        <Text style={styles.subtitle}>{data?.location}</Text>
        <Text style={styles.desc}>{data?.description}</Text>
      </View>
      <CustomButton title="Acheter mes billets" onPress={() => navigation.navigate("BookingForm")} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { marginBottom: 12 },
  title: { fontSize: 24, fontWeight: "700" },
  banner: { width: "100%", height: 180, borderRadius: 12 },
  info: { gap: 6, marginVertical: 12 },
  subtitle: { fontSize: 16, fontWeight: "600" },
  desc: { fontSize: 14, color: "#687076" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
});
