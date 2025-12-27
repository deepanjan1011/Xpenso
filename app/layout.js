import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

import { SessionProvider } from "@/components/session-provider";

const inter = Inter({ subsets: ["latin"] });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata = {
  title: "Xpenso",
  description: "Smart, Simple, and Seamless Expense Tracking",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.className} ${outfit.variable}`}>
          <SessionProvider>
            {children}
          </SessionProvider>
          <Toaster richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
