"use client";
import React, { useEffect, useState } from 'react'
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { accountSchema } from '@/app/lib/schema';
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import useFetch from '@/hooks/use-fetch';
import { createAccount } from '@/actions/dashboard';
import { Loader2, Wallet, PiggyBank } from 'lucide-react';
import { toast } from 'sonner';


const CreateAccountDrawer = ({ children, onAccountCreated }) => {
    const [open, setOpen] = useState(false);


    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        reset,
    } = useForm({
        resolver: zodResolver(accountSchema),
        defaultValues: {
            name: "",
            type: "CURRENT",
            balance: "",
            isDefault: false,
            isBusiness: false,
        },
    });

    const isBusiness = watch("isBusiness");

    useEffect(() => {
        if (isBusiness) {
            setValue("type", "CURRENT");
        }
    }, [isBusiness, setValue]);

    const {
        data: newAccount,
        error,
        fn: createAccountFn,
        loading: createAccountLoading,
    } = useFetch(createAccount)

    useEffect(() => {
        if (newAccount && !createAccountLoading) {
            // Success handled optimally in onSubmit, but keeping for safety if needed?
            // Actually, we want to clear the form if we haven't already.
            // But we do it in onSubmit.
        }
    }, [createAccountLoading, newAccount]);

    useEffect(() => {
        if (error) {
            toast.error(error.message || "Failed to create account");
        }
    }, [error]);

    const onSubmit = async (data) => {
        const optimisticAccount = {
            ...data,
            id: window.crypto.randomUUID(),
            balance: parseFloat(data.balance),
            userId: "temp-user", // Placeholder
        };

        // Optimistic Update
        React.startTransition(() => {
            if (onAccountCreated) onAccountCreated(optimisticAccount);
        });

        // Close UI immediately
        setOpen(false);
        reset();
        toast.success("Account created successfully");

        // Server Action
        await createAccountFn(data);
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>{children}</DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Create New Account</DrawerTitle>
                </DrawerHeader>
                <div className='px-4 pb-4'>
                    <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
                        <div className='space-y-2'>
                            <label htmlFor='name' className='text-sm font-medium'>Account Name</label>
                            <Input
                                id="name"
                                placeholder="e.g., Main Checking"
                                {...register("name")}
                            />
                            {errors.name && (
                                <p className='text-sm text-red-500'>{errors.name.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label
                                htmlFor="type"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Account Type
                            </label>
                            <Select
                                onValueChange={(value) => setValue("type", value)}
                                defaultValue={watch("type")}
                            >
                                <SelectTrigger id="type">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="CURRENT">
                                        <div className="flex items-center gap-2">
                                            <Wallet className="h-4 w-4 text-blue-500" />
                                            <span>Current</span>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="SAVINGS">
                                        <div className="flex items-center gap-2">
                                            <PiggyBank className="h-4 w-4 text-pink-500" />
                                            <span>Savings</span>
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.type && (
                                <p className="text-sm text-red-500">{errors.type.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label
                                htmlFor="balance"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Initial Balance
                            </label>
                            <Input
                                id="balance"
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                {...register("balance")}
                            />
                            {errors.balance && (
                                <p className="text-sm text-red-500">{errors.balance.message}</p>
                            )}
                        </div>
                        <div className="flex items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                                <label
                                    htmlFor="isDefault"
                                    className="text-base font-medium cursor-pointer"
                                >
                                    Set as Default
                                </label>
                                <p className="text-sm text-muted-foreground">
                                    This account will be selected by default for transactions
                                </p>
                            </div>
                            <Switch
                                id="isDefault"
                                checked={watch("isDefault")}
                                onCheckedChange={(checked) => setValue("isDefault", checked)}
                            />
                        </div>
                        <div className="flex items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                                <label
                                    htmlFor="isBusiness"
                                    className="text-base font-medium cursor-pointer"
                                >
                                    Business Account
                                </label>
                                <p className="text-sm text-muted-foreground">
                                    Exclude from Personal Budget
                                </p>
                            </div>
                            <Switch
                                id="isBusiness"
                                checked={watch("isBusiness")}
                                onCheckedChange={(checked) => setValue("isBusiness", checked)}
                            />
                        </div>
                        <div className="flex gap-4 pt-4">
                            <DrawerClose asChild>
                                <Button type="button" variant="outline" className="flex-1">
                                    Cancel
                                </Button>
                            </DrawerClose>
                            <Button
                                type="submit"
                                className="flex-1"
                                disabled={createAccountLoading}
                            >
                                {createAccountLoading ? (
                                    <>
                                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                        Creating...
                                    </>
                                ) : (
                                    "Create Account"
                                )}
                            </Button>
                        </div>
                    </form >
                </div >
            </DrawerContent >
        </Drawer >

    )
}

export default CreateAccountDrawer
