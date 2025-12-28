import { getUserAccounts } from '@/actions/dashboard';
import { defaultCategories } from '@/data/categories';
import React, { Suspense } from 'react'
import AddTransactionForm from '../_components/transaction-form';
import { getTransaction } from '@/actions/transaction';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { BarLoader } from "react-spinners"; // Minimal local loader

// 1. Separate Async Component for Data Fetching
async function TransactionFormWrapper({ editId }) {
    const accounts = await getUserAccounts();

    let initialData = null;
    if (editId) {
        const transaction = await getTransaction(editId);
        initialData = transaction;
    }

    return (
        <AddTransactionForm
            accounts={accounts}
            categories={defaultCategories}
            editMode={!!editId}
            initialData={initialData}
        />
    );
}

const AddTransactionPage = async ({ searchParams }) => {
    const { edit: editId } = await searchParams;

    // Shell renders immediately
    return (
        <div className='max-w-3xl mx-auto px-5'>
            <div className="flex gap-2 items-center mb-6">
                <Link href={editId ? "/dashboard" : "/dashboard"} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                    <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Dashboard
                </Link>
            </div>
            <h1 className='text-5xl gradient-title mb-8'>{editId ? "Edit" : "Add"} Transaction</h1>

            {/* Form loads in background with localized suspense */}
            <Suspense fallback={<div className="flex justify-center py-10"><BarLoader width={"100%"} color="#10b981" /></div>}>
                <TransactionFormWrapper editId={editId} />
            </Suspense>
        </div>
    );
};

export default AddTransactionPage
