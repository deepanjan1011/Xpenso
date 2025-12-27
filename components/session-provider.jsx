"use client";

import { useAuth, useClerk } from "@clerk/nextjs";
import { useEffect } from "react";

export const SessionProvider = ({ children }) => {
    const { isSignedIn } = useAuth();
    const { signOut } = useClerk();

    useEffect(() => {
        if (isSignedIn) {
            // Check if user has explicitly asked to be remembered
            const rememberMe = localStorage.getItem("remember_me") === "true";

            if (!rememberMe) {
                // User wants session-only (Hybrid Mode)
                // Check for our custom session cookie which dies on browser close
                const sessionCookie = document.cookie
                    .split("; ")
                    .find((row) => row.startsWith("xpenso_session_active="));

                if (!sessionCookie) {
                    // No session cookie found -> This is a new browser instance
                    // Security policy: Log them out
                    console.log("Session expired (Browser closed). Logging out...");
                    signOut();
                } else {
                    // Valid session, ensure cookie is kept alive/refreshed
                    // No "max-age" or "expires" means it's a session cookie
                    document.cookie = "xpenso_session_active=true; path=/";
                }
            }
        }
    }, [isSignedIn, signOut]);

    return <>{children}</>;
};
