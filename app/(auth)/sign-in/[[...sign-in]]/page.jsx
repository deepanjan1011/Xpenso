"use client";

import { SignIn } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

const Page = () => {
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        // 1. Initialize session cookie on load (so if they login, it exists)
        document.cookie = "xpenso_session_active=true; path=/";

        // 2. Load preference
        const stored = localStorage.getItem("remember_me");
        if (stored === "true") {
            setRememberMe(true);
        }
    }, []);

    const handleRememberMeChange = (checked) => {
        setRememberMe(checked);
        if (checked) {
            localStorage.setItem("remember_me", "true");
        } else {
            localStorage.removeItem("remember_me");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <SignIn />
            <div className="flex items-center space-x-2">
                <Checkbox
                    id="remember-me"
                    checked={rememberMe}
                    onCheckedChange={handleRememberMeChange}
                />
                <label
                    htmlFor="remember-me"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-600"
                >
                    Remember me for 30 days
                </label>
            </div>
        </div>
    );
};

export default Page;
