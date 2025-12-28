"use client";

import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { format } from "date-fns";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEEAD",
  "#D4A5A5",
  "#9FA8DA",
];
const DashboardOverview = ({ accounts, transactions, currentTab }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const accountTransactions = transactions;

  const recentTransactions = accountTransactions
    .filter((t) => !selectedCategory || t.category === selectedCategory)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);


  const currentDate = new Date();
  const currentMonthExpenses = accountTransactions.filter((t) => {
    const transactionDate = new Date(t.date);
    return (
      t.type === "EXPENSE" &&
      transactionDate.getMonth() === currentDate.getMonth() &&
      transactionDate.getFullYear() === currentDate.getFullYear()
    );
  });
  const expensesByCategory = currentMonthExpenses.reduce((acc, transaction) => {
    const category = transaction.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += transaction.amount;
    return acc;
  }, {});
  const pieChartData = Object.entries(expensesByCategory).map(
    ([category, amount]) => ({
      name: category,
      value: amount,
    })
  );
  const totalCurrentMonthExpenses = currentMonthExpenses.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Expense Breakdown Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-normal">
            Monthly Expense Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 pb-5">
          {pieChartData.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              No expenses this month
            </p>
          ) : (
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan x="50%" dy="-0.5em" fontSize="14" fill="#888">
                      {selectedCategory || "Total Spending"}
                    </tspan>
                    <tspan x="50%" dy="1.2em" fontSize="20" fontWeight="bold">
                      ₹{
                        (selectedCategory
                          ? pieChartData.find((d) => d.name === selectedCategory)?.value || 0
                          : totalCurrentMonthExpenses
                        ).toFixed(0)
                      }
                    </tspan>
                  </text>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={75}
                    outerRadius={110}
                    fill="#8884d8"
                    dataKey="value"
                    labelLine={false}
                    onClick={(data) => setSelectedCategory(selectedCategory === data.name ? null : data.name)}
                    className="cursor-pointer"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        style={{ outline: "none", opacity: selectedCategory && selectedCategory !== entry.name ? 0.3 : 1 }}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => `₹${value.toFixed(2)}`}
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Transactions Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-base font-normal">
            Recent Transactions
          </CardTitle>
          {selectedCategory && (
            <Badge variant="outline" className="cursor-pointer" onClick={() => setSelectedCategory(null)}>
              Filter: {selectedCategory} <span className="ml-1 text-xs">x</span>
            </Badge>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                No recent transactions
              </p>
            ) : (
              recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {transaction.description || "Untitled Transaction"}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {transaction.category}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div
                      className={cn(
                        "flex items-center",
                        transaction.type === "EXPENSE"
                          ? "text-red-500"
                          : "text-green-500"
                      )}
                    >
                      {transaction.type === "EXPENSE" ? (
                        <ArrowDownRight className="mr-1 h-4 w-4" />
                      ) : (
                        <ArrowUpRight className="mr-1 h-4 w-4" />
                      )}
                      ₹{transaction.amount.toFixed(2)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(transaction.date), "PP")}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default DashboardOverview
