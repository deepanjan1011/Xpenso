import { getDashboardData, getUserAccounts } from '@/actions/dashboard'
import { getCurrentBudget } from '@/actions/budget'
import React, { Suspense } from 'react'
import DashboardClient from './_components/dashboard-client'

async function DashboardPage() {
    const accounts = await getUserAccounts();
    const defaultAccount = accounts?.find((account) => account.isDefault);
    let budgetData = null;
    if (defaultAccount) {
        budgetData = await getCurrentBudget(defaultAccount.id);
    }
    const transactions = await getDashboardData();


    return (
        <DashboardClient
            accounts={accounts}
            transactions={transactions || []}
            budgetData={budgetData}
            defaultAccount={defaultAccount}
        />
    )
}

export default DashboardPage
