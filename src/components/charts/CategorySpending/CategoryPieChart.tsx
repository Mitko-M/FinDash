import React, { useState, useMemo, useEffect } from "react";
import { View, Text } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { TransactionDb } from "@/src/types/Transaction";
import { Categories } from "@/src/services/categories";
import { CategoryType, CategorySlice } from "@/src/types/Category";
import { CategoryLegend } from "./CategoryLegend";

type Props = {
  transactions: TransactionDb[];
};

function buildPieData(transactions: TransactionDb[]): CategorySlice[] {
  const categories = (Object.keys(Categories) as CategoryType[]).filter(
    (cat) => cat !== "Income",
  );

  const grouped = categories.map((cat) => {
    const items = transactions.filter((t) => t.category === cat);
    const value = items.reduce((sum, t) => sum + t.amount, 0);

    return {
      value,
      label: Categories[cat].label,
      color: Categories[cat].color,
      gradientCenterColor: Categories[cat].gradient,
    };
  });

  const total = grouped.reduce((sum, c) => sum + c.value, 0);

  return grouped
    .map((c) => ({
      ...c,
      percent: total ? Math.round((c.value / total) * 100) : 0,
    }))
    .filter((c) => c.percent > 0);
}

export function CategoryPieChart({ transactions = [] }: Props) {
  const data = useMemo(() => buildPieData(transactions), [transactions]);

  const largestSlice = useMemo(() => {
    if (!data.length) return null;
    return [...data].sort((a, b) => b.value - a.value)[0];
  }, [data]);

  const [activeSlice, setActiveSlice] = useState<CategorySlice | null>(null);

  useEffect(() => {
    if (largestSlice) setActiveSlice(largestSlice);
  }, [largestSlice]);

  function handlePress(slice: CategorySlice) {
    if (!activeSlice) return;
    setActiveSlice(slice.label === activeSlice.label ? largestSlice : slice);
  }

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
            innerCircleColor="#fff"
            focusOnPress
            onPress={handlePress}
            centerLabelComponent={() =>
              activeSlice && (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text
                    style={{
                      fontSize: 26,
                      fontWeight: "700",
                      color: activeSlice.color,
                    }}
                  >
                    {activeSlice.value.toFixed(2)}$
                  </Text>
                  <Text style={{ fontSize: 15, color: "black" }}>
                    {activeSlice.label}
                  </Text>
                </View>
              )
            }
            showText={false}
          />

          <CategoryLegend slices={data} />
        </>
      ) : (
        <Text>There was no spending data!</Text>
      )}
    </View>
  );
}
