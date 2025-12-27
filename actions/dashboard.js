"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const serializeTransaction = (obj) => {
    const serialized = { ...obj };
    if (obj.balance) {
        serialized.balance = obj.balance.toNumber();
    }
    if (obj.amount) {
        serialized.amount = obj.amount.toNumber();
    }
    if (obj.account) {
        serialized.account = {
            ...obj.account,
            balance: obj.account.balance ? obj.account.balance.toNumber() : 0,
        };
    }
    return serialized;
};
export async function createAccount(data) {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");
        const user = await db.user.findUnique({
            where: { clerkUserId: userId },
        });
        if (!user) {
            throw new Error("User not found");
        }

        const balanceFloat = parseFloat(data.balance)
        if (isNaN(balanceFloat)) {
            throw new Error("Invalid balance amount");
        }
        const existingAccounts = await db.account.findMany({
            where: { userId: user.id },
        });
        const shouldBeDefault = existingAccounts.length === 0 ? true : data.isDefault;
        if (shouldBeDefault) {
            await db.account.updateMany({
                where: { userId: user.id, isDefault: true },
                data: { isDefault: false },
            });
        }
        // Use raw query to insert account to bypass Prisma Client sync issues with isBusiness
        const { randomUUID } = await import('crypto');
        const accountId = randomUUID();

        const rawAccounts = await db.$queryRaw`
            INSERT INTO "accounts" 
            ("id", "name", "type", "balance", "isDefault", "is_business", "userId", "createdAt", "updatedAt")
            VALUES (
                ${accountId}, 
                ${data.name}, 
                ${data.type}::"AccountType", 
                ${balanceFloat}, 
                ${shouldBeDefault}, 
                ${data.isBusiness}, 
                ${user.id}, 
                now(), 
                now()
            )
            RETURNING *
        `;
        const account = rawAccounts[0];
        const serializedAccount = serializeTransaction(account);
        revalidatePath("/dashboard")
        return { success: true, data: serializedAccount }

    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getUserAccounts() {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
    });
    if (!user) {
        throw new Error("User not found");
    }
    const accounts = await db.account.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
        include: {
            _count: {
                select: {
                    transactions: true,
                },
            },
        },
    });
    const serializedAccount = accounts.map(serializeTransaction);
    return serializedAccount;

}

export async function getDashboardData() {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
    });
    if (!user) {
        throw new Error("User not found");
    }
    // Get all user transactions
    const transactions = await db.transaction.findMany({
        where: { userId: user.id },
        orderBy: { date: "desc" },
        include: { account: true },
    });
    return transactions.map(serializeTransaction);
}