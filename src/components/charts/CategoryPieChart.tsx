import React, { useState, useMemo } from "react";
import { View, Text, ScrollView } from "react-native";
import { PieChart } from "react-native-gifted-charts";

type PieItem = {
  value: number;
  color: string;
  gradientCenterColor: string;
  text: string;
  percent: number;
};

export function CategoryPieChart({
  rawData = [
    { text: "Shopping", amount: 340.5, color: "#4CAF50", gradient: "#2E7D32" },
    { text: "Utilities", amount: 180.0, color: "#2196F3", gradient: "#1565C0" },
    { text: "Transport", amount: 70.0, color: "#FF9800", gradient: "#EF6C00" },
    {
      text: "Entertainment",
      amount: 65.0,
      color: "#9C27B0",
      gradient: "#6A0080",
    },
    {
      text: "Food & Dining",
      amount: 150.5,
      color: "#F44336",
      gradient: "#C62828",
    },
  ],
}) {
  const total = rawData.reduce((sum, item) => sum + item.amount, 0);

  const data: PieItem[] = useMemo(() => {
    return rawData.map((item) => {
      const percent = Math.round((item.amount / total) * 100);
      return {
        value: item.amount,
        color: item.color,
        gradientCenterColor: item.gradient,
        text: item.text,
        percent,
      };
    });
  }, [rawData, total]);

  const biggest = useMemo(() => {
    return data.reduce(
      (max, item) => (item.value > max.value ? item : max),
      data[0],
    );
  }, [data]);

  const [focused, setFocused] = useState<PieItem>(biggest);

  function handlePress(item: PieItem) {
    if (item.text === focused.text) {
      setFocused(biggest);
    } else {
      setFocused(item);
    }
  }

  const renderDot = (color: string) => (
    <View
      style={{
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: color,
        marginRight: 8,
      }}
    />
  );

  return (
    <View style={{ alignItems: "center", padding: 16 }}>
      <PieChart
        data={data}
        donut
        showGradient
        sectionAutoFocus
        radius={120}
        innerRadius={70}
        innerCircleColor={"#fff"}
        focusOnPress
        onPress={(item: PieItem) => handlePress(item)}
        centerLabelComponent={() => (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text
              style={{
                fontSize: 26,
                fontWeight: "700",
                color: focused.color,
              }}
            >
              {focused.value.toFixed(2)}$
            </Text>
            <Text style={{ fontSize: 15, color: "black" }}>{focused.text}</Text>
          </View>
        )}
        showText={false}
      />

      <View style={{ width: "100%", marginTop: 24 }}>
        <ScrollView
          horizontal
          style={{ maxHeight: 80 }}
          contentContainerStyle={{
            flexDirection: "column",
            justifyContent: "center",
          }}
          showsHorizontalScrollIndicator={true}
        >
          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            {data.map((item, index) =>
              index % 2 === 0 ? (
                <View
                  key={item.text}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: 140,
                    paddingRight: 12,
                  }}
                >
                  {renderDot(item.color)}
                  <Text style={{ fontSize: 13, color: "#333" }}>
                    {item.text} {item.percent}%
                  </Text>
                </View>
              ) : null,
            )}
          </View>

          <View style={{ flexDirection: "row" }}>
            {data.map((item, index) =>
              index % 2 === 1 ? (
                <View
                  key={item.text}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: 140,
                    paddingRight: 12,
                  }}
                >
                  {renderDot(item.color)}
                  <Text style={{ fontSize: 13, color: "#333" }}>
                    {item.text} {item.percent}%
                  </Text>
                </View>
              ) : null,
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
