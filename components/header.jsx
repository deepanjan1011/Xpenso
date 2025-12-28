import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { LayoutDashboard, PenBox } from 'lucide-react';
import { checkUser } from '@/lib/checkUser';
import Logo from './logo';

const header = async () => {
    await checkUser();
    return (
        <div className='fixed top-0 w-full bg-white/50 backdrop-blur-md z-[100] border-b border-gray-200 supports-[backdrop-filter]:bg-white/40'>
            <nav className='container mx-auto px-4 py-2 flex items-center justify-between'>
                <Link href="/">
                    <Logo />
                </Link>
                <div className="flex items-center space-x-4">
                    <SignedIn>
                        <Link
                            href="/dashboard"
                            className="text-gray-600 hover:text-blue-600 flex items-center gap-2"
                        >
                            <Button variant="outline">
                                <LayoutDashboard size={18} />
                                <span className="hidden md:inline">Dashboard</span>
                            </Button>
                        </Link>
                        <Link href="/transaction/create">
                            <Button className="flex items-center gap-2">
                                <PenBox size={18} />
                                <span className="hidden md:inline">Add Transaction</span>
                            </Button>
                        </Link>
                    </SignedIn>
                    <SignedOut>
                        <SignInButton forceRedirectUrl="/dashboard">
                            <Button variant="outline" className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700">Login</Button>
                        </SignInButton >
                    </SignedOut>
                    <SignedIn>
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: "w-10 h-10",
                                },
                            }}
                        />
                    </SignedIn>
                </div>
            </nav>
        </div>
    )
}

export default header
