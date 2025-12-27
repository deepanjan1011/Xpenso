import { getUserAccounts } from '@/actions/dashboard';
import { defaultCategories } from '@/data/categories';
import React from 'react'
import AddTransactionForm from '../_components/transaction-form';
import { getTransaction } from '@/actions/transaction';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const AddTransactionPage = async ({ searchParams }) => {
    const accounts = await getUserAccounts();
    const { edit: editId } = await searchParams;

    let initialData = null;
    if (editId) {
        const transaction = await getTransaction(editId);
        initialData = transaction;
    }
    return (
        <div className='max-w-3xl mx-auto px-5'>
            <div className="flex gap-2 items-center mb-6">
                <Link href={initialData ? `/account/${initialData.accountId}` : "/dashboard"} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                    <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    {initialData ? "Back to Account" : "Back to Dashboard"}
                </Link>
            </div>
            <h1 className='text-5xl gradient-title mb-8'>{editId ? "Edit" : "Add"} Transaction</h1>
            <AddTransactionForm accounts={accounts} categories={defaultCategories} editMode={!!editId} initialData={initialData} />
        </div>
    );
};

export default AddTransactionPage
