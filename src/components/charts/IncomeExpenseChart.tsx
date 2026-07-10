import React from "react";
import { View, Text } from "react-native";
import { BarChart, barDataItem } from "react-native-gifted-charts";
import { TransactionDb } from "@/src/types/Transaction";

type IncomeExpenseChartType = {
  data: TransactionDb[];
};

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
      <Text style={{ fontSize: 12 }}>{label}</Text>
    </View>
  );
};

function prepareChartData(data: TransactionDb[]): barDataItem[] {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Grouping data before converting
  // The chart has red(expense) and green(income) columns for each month
  const grouped = months.map((month) => {
    const monthData = data.filter((t) => {
      const d = new Date(t.date);
      return months[d.getUTCMonth()] === month;
    });

    const income = monthData
      .filter((t) => t.type === "Income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = monthData
      .filter((t) => t.type === "Expense")
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      month,
      income,
      expense,
    };
  });

  return grouped.flatMap(({ month, income, expense }) => [
    {
      labelComponent: () => renderCenteredLabel(month),
      value: income,
      spacing: groupSpacing,
      frontColor: "#4CAF50",
    },
    // This part (the expense bar) has to be without the label component so we have 1 label for 2 bars
    {
      value: expense,
      frontColor: "#F44336",
      secondaryYAxis: true,
    },
  ]);
}

// [ ] TODO: Add data prop with default value in case of no transactions
export function IncomeExpenseChart({ data = [] }: IncomeExpenseChartType) {
  const displayData = prepareChartData(data);

  const width = 350;

  const height = 300;

  return (
    <View style={{ alignItems: "center", padding: 16, marginLeft: 16 }}>
      <BarChart
        width={width}
        height={height}
        data={displayData}
        barWidth={barWidth}
        spacing={30}
        //BUG: this prop forces transparency on every column
        //isAnimated
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
