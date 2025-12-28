import { getDashboardData, getUserAccounts } from '@/actions/dashboard'
import { getCurrentBudget } from '@/actions/budget'
import React, { Suspense } from 'react'
import DashboardClient from './_components/dashboard-client'
import { BarLoader } from "react-spinners";

async function DashboardWrapper() {
    const [accounts, transactions] = await Promise.all([
        getUserAccounts(),
        getDashboardData(),
    ]);

    const defaultAccount = accounts?.find((account) => account.isDefault);
    let budgetData = null;
    if (defaultAccount) {
        budgetData = await getCurrentBudget(defaultAccount.id);
    }

    return (
        <DashboardClient
            accounts={accounts}
            transactions={transactions || []}
            budgetData={budgetData}
            defaultAccount={defaultAccount}
        />
    );
}

const DashboardPage = async () => {
    return (
        <Suspense fallback={<BarLoader className="mt-4" width={"100%"} color="#10b981" />}>
            <DashboardWrapper />
        </Suspense>
    )
}

export default DashboardPage
