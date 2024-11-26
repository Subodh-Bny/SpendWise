import BudgetVsActual from "@/components/dashboard/budget-vs-actual";
import ExpenseOverview from "@/components/dashboard/expense-overview";
import SavingsGoal from "@/components/dashboard/savings-goal";
import React from "react";

const DashboardPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-3">Dashboard</h1>
      <section className="grid gap-4  md:grid-cols-3">
        <ExpenseOverview />
        <BudgetVsActual />
        <SavingsGoal />
      </section>
    </div>
  );
};

export default DashboardPage;
