"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import CreateAccountDrawer from "@/components/create-account-drawer";
import AccountCard from "./account-card";
import BudgetProgress from "./budget-progress";
import DashboardOverview from "./transaction-overview";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DashboardClient = ({ accounts, transactions, budgetData, defaultAccount }) => {
    const [activeTab, setActiveTab] = useState("personal");

    // Filter accounts based on active tab
    const filteredAccounts = useMemo(() => {
        if (activeTab === "personal") {
            return accounts.filter((acc) => !acc.isBusiness);
        }
        if (activeTab === "business") {
            return accounts.filter((acc) => acc.isBusiness);
        }
        return accounts;
    }, [accounts, activeTab]);

    // Filter transactions based on filtered accounts (or isBusiness property if we join? 
    // Transaction schema doesn't have isBusiness, but it has accountId. 
    // We can filter by checking if transaction.accountId is in filteredAccounts ids)
    const filteredTransactions = useMemo(() => {
        const validAccountIds = new Set(filteredAccounts.map(a => a.id));
        return transactions.filter(t => validAccountIds.has(t.accountId));
    }, [transactions, filteredAccounts]);

    return (
        <div className="space-y-8">
            {/* Context Switcher */}
            <div className="flex justify-center">
                <Tabs defaultValue="personal" onValueChange={setActiveTab} className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="personal">Personal</TabsTrigger>
                        <TabsTrigger value="business">Business</TabsTrigger>
                        <TabsTrigger value="all">All</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            {/* Budget Progress - Only for Personal View */}
            {activeTab === "personal" && defaultAccount && (
                <BudgetProgress
                    initialBudget={budgetData?.budget}
                    currentExpenses={budgetData?.currentExpenses || 0}
                />
            )}

            {/* Overview Charts */}
            <DashboardOverview
                accounts={filteredAccounts}
                transactions={filteredTransactions}
            />

            {/* Account List */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <CreateAccountDrawer>
                    <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed">
                        <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full pt-5">
                            <Plus className="h-10 w-10 mb-2" />
                            <p className="text-sm font-medium">Add New Account</p>
                        </CardContent>
                    </Card>
                </CreateAccountDrawer>

                {filteredAccounts.length > 0 &&
                    filteredAccounts.map((account) => {
                        return <AccountCard key={account.id} account={account} />;
                    })}
            </div>
        </div>
    );
};

export default DashboardClient;
