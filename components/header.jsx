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
        <>
            <div className='fixed top-0 w-full bg-white/50 backdrop-blur-md z-[100] border-b border-gray-200 supports-[backdrop-filter]:bg-white/40'>
                <nav className='container mx-auto px-4 py-2 flex items-center justify-between'>
                    <Link href="/">
                        <Logo />
                    </Link>
                    <div className="flex items-center space-x-4">
                        <SignedIn>
                            <div className="hidden md:flex items-center gap-2">
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
                            </div>
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
            <SignedIn>
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50 pb-[env(safe-area-inset-bottom)]">
                    <div className="flex justify-around items-center h-16 px-4">
                        <Link href="/dashboard" className="flex flex-col items-center justify-center w-full h-full text-gray-600 hover:text-blue-600">
                            <LayoutDashboard size={24} />
                            <span className="text-xs mt-1">Dashboard</span>
                        </Link>
                        <Link href="/transaction/create" className="flex flex-col items-center justify-center w-full h-full text-gray-600 hover:text-emerald-600">
                            <div className="bg-emerald-500 rounded-full p-3 -mt-6 shadow-lg border-4 border-white">
                                <PenBox size={24} className="text-white" />
                            </div>
                            <span className="text-xs mt-1 font-medium">Add</span>
                        </Link>
                        <Link href="/" className="flex flex-col items-center justify-center w-full h-full text-gray-600 hover:text-blue-600">
                            {/* Placeholder for Accounts or Settings, pointing to Home for now as per "Accounts Toggle" might be the 3rd item? 
                               Prompt says "Dashboard" and "Add Transaction". 
                               I will add a 3rd dummy or just 2.
                               Actually prompt says "Move the 'Dashboard' and 'Add Transaction' links". 
                               Usually 2 items look weird. I'll stick to 2 if valid, or maybe add 'Accounts' since the prompt mentions Account Toggle.
                            */}
                            <UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }} />
                            <span className="text-xs mt-1">Profile</span>
                        </Link>
                    </div>
                </div>
            </SignedIn>
        </>
    )
}

export default header
