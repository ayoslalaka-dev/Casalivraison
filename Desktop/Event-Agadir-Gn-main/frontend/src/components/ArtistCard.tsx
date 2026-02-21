import { Image, Text, View, StyleSheet, Pressable, type ImageSourcePropType } from "react-native";

type Props = {
  id: string;
  name: string;
  photoUrl?: string;
  location?: string;
  subtitle?: string;
  localSource?: ImageSourcePropType;
  onPress: (id: string) => void;
};

export function ArtistCard({ id, name, photoUrl, location, subtitle, localSource, onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={() => onPress(id)}>
      <View style={styles.imageBox}>
        <Image
          source={
            localSource
              ? localSource
              : photoUrl
              ? { uri: photoUrl }
              : require("@/assets/images/react-logo.png")
          }
          style={styles.image}
        />
        {location ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{location}</Text>
          </View>
        ) : null}
      </View>
      <View style={styles.footer}>
        <Text style={styles.title}>{name}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    marginVertical: 8,
  },
  imageBox: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 140,
  },
  badge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#11181C",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: {
    color: "#F3D300",
    fontSize: 12,
    fontWeight: "700",
  },
  footer: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 13,
    color: "#687076",
    marginTop: 2,
  },
});
