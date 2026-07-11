import React, { useState, useMemo, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { TransactionDb } from "@/src/types/Transaction";
import { CategoryType } from "@/src/types/Category";
import { Categories } from "@/src/services/categories";

const allCategories: CategoryType[] = [
  "Bills",
  "Education",
  "Entertainment",
  "Food",
  "HealthCare",
  "Other",
  "Shopping",
  "Transport",
];

type PieItem = {
  value: number;
  color: string;
  gradientCenterColor: string;
  text: string;
  percent: number;
};

type PieChartPropsType = {
  rawData: TransactionDb[];
};

function prepareChartData(data: TransactionDb[]): PieItem[] {
  const groupedByCat = allCategories.map((cat) => {
    const filteredData = data.filter((t) => t.category === cat);

    const text = Categories[cat].label;
    const value = filteredData.reduce((sum, t) => sum + t.amount, 0);
    const color = Categories[cat].color;
    const gradientCenterColor = Categories[cat].gradient;

    return {
      value,
      color,
      gradientCenterColor,
      text,
    };
  });

  const total = groupedByCat.reduce((sum, t) => sum + t.value, 0);

  const processedData = groupedByCat.map((t) => {
    const percent = Math.round((t.value / total) * 100);
    return {
      ...t,
      percent,
    };
  });

  const filteredChartReadyData = processedData.filter((g) => g.percent > 0);
  return filteredChartReadyData;
}

export function CategoryPieChart({ rawData = [] }: PieChartPropsType) {
  const data: PieItem[] = useMemo(() => {
    return prepareChartData(rawData);
  }, [rawData]);

  const biggest = useMemo(() => {
    if (!data.length) return null;
    return [...data].sort((a, b) => b.value - a.value)[0];
  }, [data]);

  const [focused, setFocused] = useState<PieItem | null>(biggest);

  useEffect(() => {
    if (biggest) {
      setFocused(biggest);
    }
  }, [biggest]);

  function handlePress(item: PieItem) {
    if (!focused) return;
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
      {data.length ? (
        <>
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
            centerLabelComponent={() =>
              focused ? (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text
                    style={{
                      fontSize: 26,
                      fontWeight: "700",
                      color: focused?.color,
                    }}
                  >
                    {focused?.value.toFixed(2)}$
                  </Text>
                  <Text style={{ fontSize: 15, color: "black" }}>
                    {focused?.text}
                  </Text>
                </View>
              ) : null
            }
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
          )
        </>
      ) : (
        <Text>There was no spending data!</Text>
      )}
    </View>
  );
}
