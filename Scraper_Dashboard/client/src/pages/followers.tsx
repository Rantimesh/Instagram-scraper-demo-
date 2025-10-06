import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Sidebar from "@/components/sidebar";
import FollowersChart from "@/components/followers-chart";
import CreatorSelector from "@/components/creator-selector";
import ThemeToggle from "@/components/theme-toggle";

export default function Followers() {
  const [timeFilter, setTimeFilter] = useState("7d");
  const [selectedCreator, setSelectedCreator] = useState<string | null>(null);

  const timeFilters = [
    { label: "7d", value: "7d" },
    { label: "30d", value: "30d" },
    { label: "90d", value: "90d" },
    { label: "All", value: "all" },
  ];

  const mockDemographics = {
    totalFollowers: 142856,
    growth: "+2.4%",
    ageGroups: [
      { range: "13-17", percentage: 5.2, count: "7.4K" },
      { range: "18-24", percentage: 32.4, count: "46.3K" },
      { range: "25-34", percentage: 28.6, count: "40.9K" },
      { range: "35-44", percentage: 18.3, count: "26.1K" },
      { range: "45-54", percentage: 10.2, count: "14.6K" },
      { range: "55+", percentage: 5.3, count: "7.6K" },
    ],
    topLocations: [
      { country: "United States", percentage: 42.3, flag: "🇺🇸" },
      { country: "United Kingdom", percentage: 14.2, flag: "🇬🇧" },
      { country: "Canada", percentage: 8.7, flag: "🇨🇦" },
      { country: "Australia", percentage: 6.5, flag: "🇦🇺" },
      { country: "Germany", percentage: 5.2, flag: "🇩🇪" },
    ],
    genderSplit: [
      { gender: "Female", percentage: 56.7, color: "bg-chart-1" },
      { gender: "Male", percentage: 42.1, color: "bg-chart-2" },
      { gender: "Other", percentage: 1.2, color: "bg-chart-3" },
    ],
  };

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Followers</p>
                    <p className="text-3xl font-bold" data-testid="total-followers">{mockDemographics.totalFollowers.toLocaleString()}</p>
                    <p className="text-sm text-chart-4 mt-1">
                      <i className="fas fa-arrow-up mr-1"></i>
                      {mockDemographics.growth} from last period
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
                <h3 className="text-sm font-medium mb-4">Gender Distribution</h3>
                <div className="space-y-3">
                  {mockDemographics.genderSplit.map((item) => (
                    <div key={item.gender} data-testid={`gender-${item.gender.toLowerCase()}`}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">{item.gender}</span>
                        <span className="text-muted-foreground">{item.percentage}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className={`${item.color} h-2 rounded-full`} 
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <FollowersChart timeFilter={timeFilter} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Age Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockDemographics.ageGroups.map((group) => (
                    <div key={group.range} data-testid={`age-group-${group.range}`}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium">{group.range}</span>
                        <div className="text-right">
                          <span className="font-medium">{group.percentage}%</span>
                          <span className="text-muted-foreground ml-2">({group.count})</span>
                        </div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-chart-1 h-2 rounded-full" 
                          style={{ width: `${group.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Locations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockDemographics.topLocations.map((location, index) => (
                    <div key={location.country} className="flex items-center gap-3" data-testid={`location-${index}`}>
                      <div className="text-2xl">{location.flag}</div>
                      <div className="flex-1">
                        <p className="font-medium">{location.country}</p>
                        <div className="w-full bg-muted rounded-full h-2 mt-1">
                          <div 
                            className="bg-chart-2 h-2 rounded-full" 
                            style={{ width: `${location.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">{location.percentage}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Engagement by Follower Segment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">High Engagement (10K+)</p>
                  <p className="text-2xl font-bold mt-1" data-testid="high-engagement">12.3%</p>
                  <p className="text-sm text-chart-4 mt-1">
                    <i className="fas fa-arrow-up mr-1"></i>
                    +1.2% from last period
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Medium Engagement (1K-10K)</p>
                  <p className="text-2xl font-bold mt-1" data-testid="medium-engagement">45.7%</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    <i className="fas fa-minus mr-1"></i>
                    No change
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Low Engagement (0-1K)</p>
                  <p className="text-2xl font-bold mt-1" data-testid="low-engagement">42.0%</p>
                  <p className="text-sm text-destructive mt-1">
                    <i className="fas fa-arrow-down mr-1"></i>
                    -0.8% from last period
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
