import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Sidebar from "@/components/sidebar";
import FollowersChart from "@/components/followers-chart";
import CreatorSelector from "@/components/creator-selector";
import ThemeToggle from "@/components/theme-toggle";
import { useQuery } from "@tanstack/react-query";

interface ReelData {
  username: string;
}

export default function Followers() {
  const [timeFilter, setTimeFilter] = useState("7d");
  const [selectedCreator, setSelectedCreator] = useState<string | null>(null);

  const { data: reels = [] } = useQuery<ReelData[]>({
    queryKey: ['/api/reels'],
  });

  const timeFilters = [
    { label: "7d", value: "7d" },
    { label: "30d", value: "30d" },
    { label: "90d", value: "90d" },
    { label: "All", value: "all" },
  ];

  const creators = Array.from(new Set(reels.map(r => r.username).filter(Boolean)));
  const creatorCount = creators.length;
  const totalReels = reels.length;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold" data-testid="page-title">Followers Analytics</h1>
              <p className="text-muted-foreground">
                {selectedCreator ? "Viewing individual creator followers" : "Viewing combined follower analytics"}
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
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Creators</p>
                    <p className="text-3xl font-bold" data-testid="total-followers">{creatorCount}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Tracked creators
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-chart-4/10 rounded-full flex items-center justify-center">
                    <i className="fas fa-users text-chart-4 text-2xl"></i>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Reels</p>
                    <p className="text-3xl font-bold">{totalReels}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      From all creators
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-chart-1/10 rounded-full flex items-center justify-center">
                    <i className="fas fa-video text-chart-1 text-2xl"></i>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Creators</p>
                    <div className="text-sm font-medium mt-2 space-y-1">
                      {creators.map(creator => (
                        <div key={creator}>@{creator}</div>
                      ))}
                    </div>
                  </div>
                  <div className="w-16 h-16 bg-chart-2/10 rounded-full flex items-center justify-center">
                    <i className="fas fa-at text-chart-2 text-2xl"></i>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <FollowersChart timeFilter={timeFilter} />

          <Card>
            <CardHeader>
              <CardTitle>Follower Demographics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <i className="fas fa-chart-pie text-6xl text-muted-foreground/20 mb-4"></i>
                <p className="text-muted-foreground">
                  Follower demographic data (age, gender, location) is not available from the current CSV scraper.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  This data requires Instagram's official API or enhanced scraping capabilities.
                </p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
