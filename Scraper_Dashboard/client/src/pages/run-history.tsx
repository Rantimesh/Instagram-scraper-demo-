import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/sidebar";
import ThemeToggle from "@/components/theme-toggle";
import { useQuery } from "@tanstack/react-query";

interface ReelData {
  username: string;
}

export default function RunHistory() {
  const [expandedRun, setExpandedRun] = useState<string | null>(null);

  const { data: reels = [] } = useQuery<ReelData[]>({
    queryKey: ['/api/reels'],
  });

  const { data: status } = useQuery({
    queryKey: ['/api/scrape/status'],
  });

  const totalReels = reels.length;
  const creators = Array.from(new Set(reels.map(r => r.username).filter(Boolean)));

  const stats = [
    { label: "Total Reels", value: totalReels.toString() },
    { label: "Creators", value: creators.length.toString() },
    { label: "Last Status", value: status?.status || "idle" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      case "partial":
        return <Badge className="bg-yellow-500">Partial</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold">Run History</h1>
              <p className="text-muted-foreground">View past scraper executions and logs</p>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {stats.map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardContent className="p-8">
              <div className="text-center py-12">
                <i className="fas fa-history text-6xl text-muted-foreground/20 mb-4"></i>
                <p className="text-lg text-muted-foreground mb-2">
                  Run history tracking coming soon
                </p>
                <p className="text-sm text-muted-foreground">
                  Detailed scraper execution logs and history will be available when the scraper runs are persisted to the database.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Current data shows {totalReels} reels from {creators.length} creators.
                </p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
