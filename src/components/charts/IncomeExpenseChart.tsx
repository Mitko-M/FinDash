import React from "react";
import { View, Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";

export function IncomeExpenseChart() {
  const barWidth = 20;
  const groupSpacing = 2;

  const renderCenteredLabel = (label: string) => {
    return (
      <View
        style={{
          width: barWidth * 2 + groupSpacing,
          alignItems: "center",
          marginLeft: 0,
        }}
      >
        {" "}
        <Text style={{ fontSize: 12 }}>{label}</Text>{" "}
      </View>
    );
  };

  // MARK: Demo data will delete later when the add-transaction page is finished
  const data = [
    {
      labelComponent: () => renderCenteredLabel("Nov"),
      value: 1200,
      spacing: groupSpacing,
      frontColor: "#4CAF50",
    },
    { value: 800, frontColor: "#F44336", secondaryYAxis: true },

    {
      labelComponent: () => renderCenteredLabel("Dec"),
      value: 1800,
      spacing: groupSpacing,
      frontColor: "#4CAF50",
    },
    { value: 900, frontColor: "#F44336", secondaryYAxis: true },

    {
      labelComponent: () => renderCenteredLabel("Jan"),
      value: 2200,
      spacing: groupSpacing,
      frontColor: "#4CAF50",
    },
    { value: 1100, frontColor: "#F44336", secondaryYAxis: true },

    {
      labelComponent: () => renderCenteredLabel("Feb"),
      value: 6000,
      spacing: groupSpacing,
      frontColor: "#4CAF50",
    },
    { value: 500, frontColor: "#F44336", secondaryYAxis: true },

    {
      labelComponent: () => renderCenteredLabel("Mar"),
      value: 3000,
      spacing: groupSpacing,
      frontColor: "#4CAF50",
    },
    { value: 1500, frontColor: "#F44336", secondaryYAxis: true },

    {
      labelComponent: () => renderCenteredLabel("Apr"),
      value: 2500,
      spacing: groupSpacing,
      frontColor: "#4CAF50",
    },
    { value: 1200, frontColor: "#F44336", secondaryYAxis: true },
  ];

  const width = 350;

  const height = 300;

  return (
    <View style={{ alignItems: "center", padding: 16 }}>
      <BarChart
        width={width}
        height={height}
        data={data}
        barWidth={barWidth}
        spacing={30}
        isAnimated
        yAxisThickness={0}
        xAxisType={"dashed"}
        stepValue={1500}
        maxValue={6000}
        barBorderRadius={4}
        xAxisThickness={0}
        noOfSections={4}
        xAxisLabelTextStyle={{ textAlign: "center" }}
        onPress={() => {}} // Show a modal with expense and income
      />
      {/* Legend */}
      <View style={{ flexDirection: "row", marginTop: 12, gap: 24 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: 12,
              height: 12,
              backgroundColor: "#4CAF50",
              borderRadius: 2,
              marginRight: 6,
            }}
          />
          <Text style={{ fontSize: 14, color: "#4CAF50" }}>Income</Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: 12,
              height: 12,
              backgroundColor: "#F44336",
              borderRadius: 2,
              marginRight: 6,
            }}
          />
          <Text style={{ fontSize: 14, color: "#F44336" }}>Expense</Text>
        </View>
      </View>
    </View>
  );
}
