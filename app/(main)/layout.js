import React from 'react'
import Header from "@/components/header";

const MainLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
        </div>
    )
}

export default MainLayout
