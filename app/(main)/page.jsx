import HeroSection from "@/components/hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { featuresData, howItWorksData, statsData, testimonialsData } from "@/data/landing";

import Image from "next/image";
import Link from "next/link";



import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }
  return (<div className="mt-40">
    <HeroSection />
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything you need to manage your finances
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <Card
              key={index}
              className="p-6 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl border-gray-100/50 bg-white/50 backdrop-blur-sm"
            >
              <CardContent className="space-y-4 pt-4">
                <div className="text-emerald-600 mb-2 transform transition-transform group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
    <section className="py-20 bg-emerald-50/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {howItWorksData.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Take Control of Your Finances?
        </h2>
        <p className="text-emerald-50 mb-8 max-w-2xl mx-auto">
          Manage your finances
          smarter with Xpesno
        </p>
        <Link href="/dashboard">
          <Button
            size="lg"
            className="bg-white text-emerald-600 hover:bg-emerald-50 animate-bounce"
          >
            Start Free Trial
          </Button>
        </Link>
      </div>
    </section>
  </div>
  )
}
