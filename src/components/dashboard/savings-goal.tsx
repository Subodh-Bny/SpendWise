"use client";

import { Progress } from "@/components/ui/progress";
import { useGetSavingsGoal } from "@/services/api/savingsGoalApi";

import { useState } from "react";
import MonthSelector from "../month-selector";
import ArrowLink from "../ArrowLink";
import routes from "@/config/routes";
import DashCard from "./dash-card";

const useGetCurrentMonthTarget = (
  month: number
): { target: number; current: number } => {
  const { data: savingsGoalData } = useGetSavingsGoal();
  const currentMonthTarget = savingsGoalData?.find(
    (data) =>
      new Date(data.targetDate).getMonth() === month && // Subtract 1 to convert from 1-based to 0-based
      new Date(data.targetDate).getFullYear() === new Date().getFullYear()
  );
  if (!currentMonthTarget) {
    return { target: 0, current: 0 };
  }
  return {
    target: parseInt(
      typeof currentMonthTarget?.targetAmount === "string"
        ? currentMonthTarget.targetAmount
        : "0"
    ),
    current: parseInt(
      typeof currentMonthTarget?.currentAmount === "string"
        ? currentMonthTarget.currentAmount
        : "0"
    ),
  };
};

export default function SavingsGoal() {
  const [month, setMonth] = useState(new Date().getMonth()); // Add 1 to convert from 0-based to 1-based
  const { target, current } = useGetCurrentMonthTarget(month);

  const percentageAchieved = target > 0 ? (current / target) * 100 : 0;

  return (
    <DashCard
      title={
        <>
          Savings Goal
          <MonthSelector setMonth={setMonth} />
        </>
      }
      description="Progress towards your target"
      footer={
        <ArrowLink href={routes.dashboard.goals}>Manage your goals</ArrowLink>
      }
    >
      <div className="text-2xl font-bold">
        Rs. {current.toFixed(2)} / Rs. {target}
      </div>
      <Progress value={percentageAchieved} className="mt-2" />
      <p className="mt-2 text-xs text-muted-foreground">
        You&apos;ve saved {percentageAchieved.toFixed(1)}% of your goal
      </p>
    </DashCard>
  );
}
