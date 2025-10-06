import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PerformanceChart from "@/components/performance-chart";
import ReelsTable from "@/components/reels-table";

export default function ReelAnalytics() {
  const [timeFilter, setTimeFilter] = useState("7d");

  const stats = [
    { label: "Total Reels", value: "847", change: "+12 this week", icon: "📹" },
    { label: "Avg Views", value: "524K", change: "+8.2% vs last week", icon: "👁️" },
    { label: "Avg Engagement", value: "7.8%", change: "-0.3% from last week", icon: "💬" },
    { label: "Top Performer", value: "1.2M", change: "Views on Dec 6", icon: "🏆" },
    { label: "Total Reach", value: "8.4M", change: "+15% this month", icon: "📊" },
  ];

  const timeFilters = ["7d", "14d", "30d", "90d", "180d", "YTD", "All"];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Reel Analytics</h1>
          <p className="text-muted-foreground">Detailed performance metrics for your reels</p>
        </div>
        <div className="flex bg-muted rounded-lg p-1">
          {timeFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter)}
              className={`px-3 py-1 text-sm rounded transition-colors ${
                timeFilter === filter
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.change}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Reels</CardTitle>
            </CardHeader>
            <CardContent>
              <ReelsTable timeFilter={timeFilter} />
            </CardContent>
          </Card>
        </div>
        <div>
          <PerformanceChart timeFilter={timeFilter} />
        </div>
      </div>

      <ReelsTable timeFilter={timeFilter} />
    </div>
  );
}
