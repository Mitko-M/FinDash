import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";

type CardProps = {
  title: string;
  value: number;
  savings?: boolean; // Determines whether the card will be for savings or not
  description?: string; // The savings card doesn't has a description
  cardIconName: keyof typeof Ionicons.glyphMap;
  isRateDown?: boolean; // Determines the cards rating arrow and color
  cardIconColor: string; // A card icon color if the default black isn't appropriate
};

export function Card({
  title,
  value,
  savings,
  description,
  cardIconName,
  isRateDown,
  cardIconColor,
}: CardProps) {
  const currency = "$"; // [ ] TODO: Globalize currency based on user choice, with Context for example

  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardValue}>
          {savings ? `${value.toFixed(1)}%` : `${currency}${value.toFixed(2)}`}
        </Text>
        <Text
          style={[
            styles.cardDescription,
            (isRateDown && { color: "red" }) || { color: "green" },
          ]}
        >
          {description && (
            <Ionicons name={isRateDown ? "arrow-down" : "arrow-up"} />
          )}
          {description || ""}
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
