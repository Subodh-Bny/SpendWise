"use client";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { financialData } from "@/lib/data";
import { Card } from "../ui/card";
import { useTheme } from "next-themes";

ChartJS.register(ArcElement, Tooltip, Legend);

// Aggregate expenses by category
const aggregateExpenses = () => {
  const categoryMap: { [key: string]: number } = {};

  financialData.expenses.forEach((expense) => {
    if (categoryMap[expense.category]) {
      categoryMap[expense.category] += expense.amount;
    } else {
      categoryMap[expense.category] = expense.amount;
    }
  });

  return Object.entries(categoryMap).map(([category, amount]) => ({
    category,
    amount,
  }));
};

const colors = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#FF33A1",
  "#A133FF",
  "#33FFF1",
  "#FFC733",
  "#FF8C33",
  "#FF3333",
  "#33D1FF",
  "#DA33FF",
  "#8AFF33",
  "#8A33FF",
  "#FF335E",
  "#FF9933",
];

const CategoryBreakdown = () => {
  const aggregatedData = aggregateExpenses();

  const { theme } = useTheme();

  const pieData = {
    labels: aggregatedData.map((expense) => expense.category),
    datasets: [
      {
        data: aggregatedData.map((expense) => expense.amount),
        backgroundColor: colors,
        borderColor: theme === "light" ? "#ffffff" : "#00000",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows custom height/width
    aspectRatio: 1, // Ratio for chart sizing
    plugins: {
      legend: {
        display: false, // Disable default legend
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const category = aggregatedData[context.dataIndex].category;
            const amount = aggregatedData[context.dataIndex].amount;
            return `${category}: $${amount.toFixed(2)}`;
          },
        },
      },
    },
  };

  return (
    <Card className="grid p-9 md:grid-cols-2 items-center gap-11 ">
      <div>
        <h1 className="text-2xl font-bold">Total Expenses:</h1>
        <p className="font-bold text-6xl mt-4">Rs. 200000</p>
      </div>
      <div className="grid lg:grid-cols-2 items-center gap-11">
        <div className="flex-grow max-w-sm ">
          <div className="relative h-64 w-64">
            <Doughnut data={pieData} options={options} />
          </div>
        </div>
        <div className="flex flex-col">
          {aggregatedData.map((expense, index) => (
            <div key={index} className="flex items-center mb-2">
              <div
                className="w-4 h-4 mr-2"
                style={{ backgroundColor: colors[index % colors.length] }}
              ></div>
              <span>{expense.category}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default CategoryBreakdown;
