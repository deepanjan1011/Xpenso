"use client";

import React, { useState, useMemo, useOptimistic } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import CreateAccountDrawer from "@/components/create-account-drawer";
import AccountCard from "./account-card";
import BudgetProgress from "./budget-progress";
import DashboardOverview from "./transaction-overview";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DashboardClient = ({ accounts, transactions, budgetData, defaultAccount }) => {
    const [activeTab, setActiveTab] = useState("personal");
    const [optimisticAccounts, dispatchOptimistic] = useOptimistic(
        accounts,
        (state, action) => {
            switch (action.type) {
                case "create":
                    return [action.data, ...state];
                case "setDefault":
                    return state.map((acc) => ({
                        ...acc,
                        isDefault: acc.id === action.data,
                    }));
                default:
                    return state;
            }
        }
    );

    const handleCreateOptimistic = (account) => {
        React.startTransition(() => {
            dispatchOptimistic({ type: "create", data: account });
        });
    };

    const handleDefaultOptimistic = (accountId) => {
        React.startTransition(() => {
            dispatchOptimistic({ type: "setDefault", data: accountId });
        });
    };

    // Filter accounts based on active tab
    const filteredAccounts = useMemo(() => {
        if (activeTab === "personal") {
            return optimisticAccounts.filter((acc) => !acc.isBusiness);
        }
        if (activeTab === "business") {
            return optimisticAccounts.filter((acc) => acc.isBusiness);
        }
        return optimisticAccounts;
    }, [optimisticAccounts, activeTab]);

    // Filter transactions based on filtered accounts
    const filteredTransactions = useMemo(() => {
        const validAccountIds = new Set(filteredAccounts.map(a => a.id));
        let txns = transactions.filter(t => validAccountIds.has(t.accountId));

        if (activeTab !== "all") {
            const defaultAcc = filteredAccounts.find(a => a.isDefault);
            if (defaultAcc) {
                txns = txns.filter(t => t.accountId === defaultAcc.id);
            }
        }

        return txns;
    }, [transactions, filteredAccounts, activeTab]);

    return (
        <div className="space-y-8">
            {/* Power Header Context Switcher */}
            <div className="flex justify-center mb-10">
                <div className="flex items-center bg-zinc-100 dark:bg-zinc-900/50 p-1.5 rounded-full shadow-inner border gap-1">
                    <button
                        onClick={() => setActiveTab("personal")}
                        className={`relative px-8 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${activeTab === "personal"
                            ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 scale-105"
                            : "text-zinc-500 hover:text-zinc-700 hover:bg-zinc-200/50"
                            }`}
                    >
                        Personal
                    </button>
                    <div className="w-px h-6 bg-zinc-200 mx-1" />
                    <button
                        onClick={() => setActiveTab("business")}
                        className={`relative px-8 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${activeTab === "business"
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 scale-105"
                            : "text-zinc-500 hover:text-zinc-700 hover:bg-zinc-200/50"
                            }`}
                    >
                        Business
                    </button>
                    <div className="w-px h-6 bg-zinc-200 mx-1" />
                    <button
                        onClick={() => setActiveTab("all")}
                        className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === "all"
                            ? "bg-zinc-800 text-white shadow-lg scale-105"
                            : "text-zinc-500 hover:text-zinc-700 hover:bg-zinc-200/50"
                            }`}
                    >
                        All View
                    </button>
                </div>
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
                currentTab={activeTab}
            />

            {/* Account List */}
            <div className="flex overflow-x-auto gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 pb-4 -mx-4 px-4 scroll-smooth snap-x">
                <div className="min-w-[85vw] md:min-w-0 snap-center">
                    <CreateAccountDrawer onAccountCreated={handleCreateOptimistic}>
                        <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed h-full">
                            <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full pt-5">
                                <Plus className="h-10 w-10 mb-2" />
                                <p className="text-sm font-medium">Add New Account</p>
                            </CardContent>
                        </Card>
                    </CreateAccountDrawer>
                </div>

                {filteredAccounts.length > 0 &&
                    filteredAccounts.map((account) => {
                        return (
                            <div key={account.id} className="min-w-[85vw] md:min-w-0 snap-center">
                                <AccountCard
                                    account={account}
                                    onDefaultChange={handleDefaultOptimistic}
                                />
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default DashboardClient;
