import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";

type CardProps = {
  title: string;
  value: string;
  description: string;
  cardIconName: keyof typeof Ionicons.glyphMap;
  isRateDown?: boolean;
  cardIconColor: string;
};

export function Card({
  title,
  value,
  description,
  cardIconName,
  isRateDown = false, // Colors the description in RED if the rate is lower
  cardIconColor,
}: CardProps) {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardValue}>{value}</Text>
        <Text style={[styles.cardDescription, isRateDown && { color: "red" }]}>
          {description}
        </Text>
      </View>
      <Ionicons
        name={cardIconName}
        style={[styles.cardIcon, { color: cardIconColor }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 12,
    backgroundColor: "#fff",
    marginBottom: 12,
  },
  cardTitle: { fontSize: 16, fontWeight: "600" },
  cardValue: { fontSize: 24, fontWeight: "700" },
  cardDescription: { fontSize: 14, color: "#666" },
  cardIcon: {
    width: 50,
    height: 50,
    fontSize: 30,
    borderRadius: 50,
    backgroundColor: "#F3F4F6",
    textAlign: "center",
    textAlignVertical: "center",
  },
});
