"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="pb-5 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title tracking-tight text-balance mix-blend-multiply transition-all duration-300 ease-in-out hover:scale-105 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-emerald-600 to-teal-500 font-outfit">
          Elevate Your Finances with Intelligence
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto font-medium">
          An AI-powered financial assistant that tracks, analyzes, and optimizes your spending with real-time insights.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/dashboard">
            <Button size="lg" className="px-8 text-lg rounded-full shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
