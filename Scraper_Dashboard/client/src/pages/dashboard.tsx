import { useState } from "react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/sidebar";
import StatCard from "@/components/stat-card";
import FollowersChart from "@/components/followers-chart";
import PerformanceChart from "@/components/performance-chart";
import ReelsTable from "@/components/reels-table";
import ScraperStatus from "@/components/scraper-status";
import TwoFAModal from "@/components/modals/two-fa-modal";
import CreatorSelector from "@/components/creator-selector";
import ThemeToggle from "@/components/theme-toggle";

export default function Dashboard() {
  const [timeFilter, setTimeFilter] = useState("7d");
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState<string | null>(null);

  const timeFilters = [
    { label: "7d", value: "7d" },
    { label: "14d", value: "14d" },
    { label: "30d", value: "30d" },
    { label: "90d", value: "90d" },
    { label: "180d", value: "180d" },
    { label: "YTD", value: "ytd" },
    { label: "All", value: "all" },
  ];

  const mockStats = {
    followers: { current: "142,856", change: "+2.4% from last week", changeType: "positive" as const },
    totalReels: { current: "847", change: "+12 this week", changeType: "positive" as const },
    avgEngagement: { current: "7.8%", change: "-0.3% from last week", changeType: "negative" as const },
    lastRun: { current: "2h ago", change: "Successful", changeType: "positive" as const },
  };

  const runScraper = () => {
    console.log('Running scraper...');
    setShow2FAModal(true);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold" data-testid="page-title">Dashboard</h1>
              <p className="text-muted-foreground">
                {selectedCreator ? "Viewing individual creator analytics" : "Viewing overview of all creators"}
              </p>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <CreatorSelector 
                selectedCreator={selectedCreator} 
                onCreatorChange={setSelectedCreator}
              />
              <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                {timeFilters.map((filter) => (
                  <button
                    key={filter.value}
                    className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                      timeFilter === filter.value
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={() => setTimeFilter(filter.value)}
                    data-testid={`filter-${filter.value}`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
              <ThemeToggle />
              <Button
                onClick={runScraper}
                data-testid="button-run-scraper"
              >
                <i className="fas fa-play text-xs mr-2"></i>
                Run Scraper
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Followers"
              value={mockStats.followers.current}
              change={mockStats.followers.change}
              changeType={mockStats.followers.changeType}
              icon="fas fa-users"
              color="bg-chart-4/10"
            />
            <StatCard
              title="Total Reels"
              value={mockStats.totalReels.current}
              change={mockStats.totalReels.change}
              changeType={mockStats.totalReels.changeType}
              icon="fas fa-video"
              color="bg-chart-1/10"
            />
            <StatCard
              title="Avg Engagement"
              value={mockStats.avgEngagement.current}
              change={mockStats.avgEngagement.change}
              changeType={mockStats.avgEngagement.changeType}
              icon="fas fa-heart"
              color="bg-chart-2/10"
            />
            <StatCard
              title="Last Run"
              value={mockStats.lastRun.current}
              change={mockStats.lastRun.change}
              changeType={mockStats.lastRun.changeType}
              icon="fas fa-clock"
              color="bg-chart-3/10"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FollowersChart timeFilter={timeFilter} />
            <PerformanceChart timeFilter={timeFilter} />
          </div>

          <ReelsTable timeFilter={timeFilter} />

          <ScraperStatus />
        </main>
      </div>

      <TwoFAModal open={show2FAModal} onOpenChange={setShow2FAModal} />
    </div>
  );
}
