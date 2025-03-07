"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";

const HeroSection = () => {
    
    const imageRef = useRef();

    useEffect(() => {
        const imageElement = imageRef.current;
    
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const scrollThreshold = 100;
    
            if (scrollPosition > scrollThreshold) {
                imageElement.classList.add("scrolled");
            } else {
                imageElement.classList.remove("scrolled");
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return ( 
        <div className="pb-20 px-4"> 
  <div className="container mx-auto text-center">
    <h1 className="text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title transition-all duration-300 ease-in-out hover:scale-105 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-blue-500 to-purple-600"> 
      Elevate Your Finances <br/> with Intelligence
    </h1>
    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
      An AI-powered financial assistant that tracks, analyzes, and optimizes your spending with real-time insights.
    </p>
    <div className="flex justify-center space-x-4">
      <Link href="/dashboard">
        <Button size="lg" className="px-8">
          Get Started
        </Button>
      </Link>
    </div>
    <div className="hero-image-wrapper mt-5 md:mt-0">
      <div ref={imageRef} className="hero-image">
        <Image
          src="/BannerFinal.jpg"
          width={1280}
          height={720}
          alt="Dashboard Preview"
          className="rounded-lg shadow-2xl border mx-auto"
          priority
        />
      </div>
    </div>
  </div>
</div>

    )
}

export default HeroSection
