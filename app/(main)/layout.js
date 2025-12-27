import React from 'react'
import Header from "@/components/header";

const MainLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <footer className="bg-blue-50 py-12">
                <div className="container mx-auto px-4 text-center text-gray-900">
                    <p>Made with 💗 by Deepanjan</p>
                </div>
            </footer>
        </div>
    )
}

export default MainLayout
