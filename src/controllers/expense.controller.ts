import { NextResponse } from "next/server";
import { internalError } from "./internalError";
import dbConnect from "@/lib/dbConnect";
import Expense from "@/models/expenses.model";

export const addExpenses = async (req: Request) => {
  if (req.method !== "POST") {
    return NextResponse.json(
      {
        message: "Method not allowed",
      },
      { status: 404 }
    );
  }

  try {
    await dbConnect();

    const { date, description, amount, category } = await req.json();

    const newExpense = new Expense({
      date,
      description,
      amount,
      category,
    });

    await newExpense.save();

    return NextResponse.json(
      { message: "Expense added successfully", data: newExpense },
      { status: 201 }
    );
  } catch (error) {
    return internalError("Error in addExpense controller", error);
  }
};

export const getExpenses = async (req: Request) => {
  if (req.method !== "GET") {
    return NextResponse.json(
      {
        message: "Method not allowed",
      },
      { status: 404 }
    );
  }

  try {
    await dbConnect();

    const expenses = await Expense.find();

    return NextResponse.json(
      { message: "Expenses fetched successfully", data: expenses },
      { status: 200 }
    );
  } catch (error) {
    return internalError("Error in getExpenses controller", error);
  }
};

export const deleteExpense = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  if (req.method !== "DELETE") {
    return NextResponse.json(
      {
        message: "Method not allowed",
      },
      { status: 404 }
    );
  }

  try {
    await dbConnect();

    const { id } = await params;

    const deletedExpense = await Expense.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Expense deleted successfully", data: deletedExpense },
      { status: 202 }
    );
  } catch (error) {
    return internalError("Error in deleteExpense controller", error);
  }
};

export const updateExpense = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  if (req.method !== "PUT") {
    return NextResponse.json(
      {
        message: "Method not allowed",
      },
      { status: 404 }
    );
  }

  try {
    await dbConnect();

    const { date, description, amount, category } = await req.json();
    const { id } = await params;

    const updatedExpense = await Expense.findByIdAndUpdate(id, {
      date,
      description,
      amount,
      category,
    });

    return NextResponse.json(
      { message: "Expense updated successfully", data: updatedExpense },
      { status: 200 }
    );
  } catch (error) {
    return internalError("Error in updateExpense controller", error);
  }
};