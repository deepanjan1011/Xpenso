import { CreditCard, Wallet, TrendingUp, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AbstractDashboard = ({ imageRef }) => {
    return (
        <div ref={imageRef} className="hero-image mx-auto max-w-5xl relative z-10">
            <div className="bg-white/40 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl relative">
                {/* Top Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="bg-white/60 border-none shadow-sm backdrop-blur-md">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">Total Balance</CardTitle>
                            <Wallet className="h-4 w-4 text-emerald-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-800">$12,450.00</div>
                            <p className="text-xs text-emerald-600 font-medium">+15% from last month</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white/60 border-none shadow-sm backdrop-blur-md">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">Monthly Expenses</CardTitle>
                            <CreditCard className="h-4 w-4 text-emerald-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-800">$3,200.50</div>
                            <p className="text-xs text-emerald-600 font-medium">+2% from last month</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white/60 border-none shadow-sm backdrop-blur-md">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">Savings Goal</CardTitle>
                            <TrendingUp className="h-4 w-4 text-emerald-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-800">$8,000.00</div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Chart Area Mockup */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Large Chart Area */}
                    <div className="md:col-span-2 bg-white/50 rounded-xl p-6 border border-white/10 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-semibold text-gray-700">Spending Overview</h3>
                            <Activity className="h-5 w-5 text-emerald-600" />
                        </div>
                        {/* Abstract Bar Chart */}
                        <div className="flex items-end justify-between h-48 gap-2">
                            {[60, 45, 75, 50, 80, 55, 90, 65, 70, 40, 85, 60].map((height, i) => (
                                <div key={i} className="w-full bg-emerald-100 rounded-t-sm hover:bg-emerald-200 transition-colors relative group">
                                    <div className="absolute bottom-0 w-full bg-emerald-500 rounded-t-sm transition-all duration-500" style={{ height: `${height}%` }}></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Side Transactions List */}
                    <div className="bg-white/50 rounded-xl p-6 border border-white/10 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent</h3>
                        <div className="space-y-4">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-white/40 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                                            <div className="h-2 w-2 bg-emerald-500 rounded-full"></div>
                                        </div>
                                        <div>
                                            <div className="w-20 h-2.5 bg-gray-200 rounded-full mb-1"></div>
                                            <div className="w-12 h-2 bg-gray-100 rounded-full"></div>
                                        </div>
                                    </div>
                                    <div className="w-12 h-3 bg-gray-200 rounded-full"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AbstractDashboard;
