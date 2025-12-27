"use client";
import { updateDefaultAccount, deleteAccount } from '@/actions/accounts';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import useFetch from '@/hooks/use-fetch';
import { ArrowDownRight, ArrowUpRight, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from "react";
import React from 'react'
import { toast } from 'sonner';


const AccountCard = ({ account }) => {
  const { name, type, balance, id, isDefault } = account;
  const [isDeleted, setIsDeleted] = React.useState(false);
  const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,
    error,
  } = useFetch(updateDefaultAccount)
  const handleDefaultChange = async (event) => {
    event.preventDefault(); // Prevent navigation

    if (isDefault) {
      toast.warning("You need atleast 1 default account");
      return; // Don't allow toggling off the default account
    }

    await updateDefaultFn(id);
  };
  useEffect(() => {
    if (updatedAccount?.success) {
      toast.success("Default account updated successfully");
    }
  }, [updatedAccount]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update default account");
    }
  }, [error]);

  const {
    loading: deleteLoading,
    fn: deleteAccountFn,
    data: deletedAccount,
    error: deleteError,
  } = useFetch(deleteAccount);

  useEffect(() => {
    if (deletedAccount?.success) {
      toast.success("Account deleted successfully");
    }
  }, [deletedAccount]);

  useEffect(() => {
    if (deleteError) {
      toast.error(deleteError.message || "Failed to delete account");
      setIsDeleted(false); // Revert optimistic update
    }
  }, [deleteError]);

  const handleDelete = async (event) => {
    event.preventDefault(); // Prevent navigation
    if (isDefault) {
      toast.warning("You cannot delete the default account");
      return;
    }
    toast.error("Are you sure?", {
      description: "This will permanently delete the account and all related transactions.",
      action: {
        label: "Delete",
        onClick: async () => {
          setIsDeleted(true); // Optimistic UI
          await deleteAccountFn(id);
        },
      },
      cancel: { label: "Cancel" },
    });
  };

  if (isDeleted) return null;

  return (
    <Card className="hover:shadow-md transition-shadow group relative">
      <Link href={`/account/${id}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium capitalize">{name}</CardTitle>
          <div className="flex items-center gap-2">
            <Switch checked={isDefault}
              onClick={handleDefaultChange}
              disabled={updateDefaultLoading}
            />
            <button
              onClick={handleDelete}
              disabled={deleteLoading}
              className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
              title="Delete Account"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>
            ₹{parseFloat(balance).toFixed(2)}
          </div>
          <p className='text-xs text-muted-foreground'>
            {type.charAt(0) + type.slice(1).toLowerCase()} Account
          </p>
        </CardContent>
        <CardFooter className="flex justify-between text-sm text-muted-foreground">
          <div className='flex items-center'>
            <ArrowUpRight className='mr-1 h-4 w-4 text-green-500' />
            Income
          </div>
          <div className='flex items-center'>
            <ArrowDownRight className='mr-1 h-4 w-4 text-red-500' />
            Expense
          </div>
        </CardFooter>
      </Link>
    </Card>

  )
}

export default AccountCard
