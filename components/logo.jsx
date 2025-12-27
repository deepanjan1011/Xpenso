import React from 'react'
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"] });

const Logo = () => {
    return (
        <div className={`flex items-center gap-2 ${outfit.className}`}>
            <div className="w-14 h-14 relative">
                <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
                    {/* The Primary Slash (Slate) */}
                    <path
                        d="M15 15 L35 35"
                        stroke="#334155"
                        strokeWidth="8"
                        strokeLinecap="round"
                    />
                    {/* The Accent Slash (Emerald Gradient) - Creates the X */}
                    <path
                        d="M35 15 L15 35"
                        stroke="url(#logoGradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                    />
                    <defs>
                        <linearGradient id="logoGradient" x1="35" y1="15" x2="15" y2="35" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#10b981" />
                            <stop offset="1" stopColor="#059669" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <span className="text-3xl font-bold text-slate-900 tracking-tight">
                Xpenso
            </span>
        </div>
    )
}

export default Logo
