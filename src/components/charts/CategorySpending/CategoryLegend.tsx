import { CategorySlice } from "@/src/types/Category";
import { ScrollView, View, Text } from "react-native";

type Props = {
  slices: CategorySlice[];
};

export function CategoryLegend({ slices }: Props) {
  const sortedSlices = [...slices].sort((a, b) => b.percent - a.percent);

  const columns: CategorySlice[][] = [];
  for (let i = 0; i < sortedSlices.length; i += 2) {
    columns.push(sortedSlices.slice(i, i + 2));
  }

  return (
    <View style={{ width: "100%", marginTop: 24 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: "row",
          columnGap: 20,
          paddingHorizontal: 4,
        }}
      >
        {columns.map((pair, colIndex) => (
          <View key={colIndex} style={{ flexDirection: "column", rowGap: 12 }}>
            {pair.map((slice) => (
              <View
                key={slice.label}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  minWidth: 120,
                }}
              >
                <View
                  style={{
                    height: 10,
                    width: 10,
                    borderRadius: 5,
                    backgroundColor: slice.color,
                    marginRight: 8,
                  }}
                />
                <Text style={{ fontSize: 13, color: "#333" }} numberOfLines={1}>
                  {slice.label} {slice.percent}%
                </Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
