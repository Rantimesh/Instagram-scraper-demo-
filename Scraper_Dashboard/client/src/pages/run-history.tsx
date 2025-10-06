import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const mockRuns = [
  {
    id: "1",
    date: "Dec 8, 2024 2:35 PM",
    status: "completed",
    creators: ["she_is_ada_", "_olasubomi_", "5thkind_"],
    reelsScraped: 142,
    newReels: 12,
    duration: "8m 23s",
    error: null,
  },
  {
    id: "2",
    date: "Dec 7, 2024 9:15 AM",
    status: "completed",
    creators: ["she_is_ada_", "_olasubomi_"],
    reelsScraped: 89,
    newReels: 8,
    duration: "5m 41s",
    error: null,
  },
  {
    id: "3",
    date: "Dec 6, 2024 3:22 PM",
    status: "failed",
    creators: ["5thkind_", "techcreator"],
    reelsScraped: 34,
    newReels: 0,
    duration: "2m 15s",
    error: "Instagram rate limit exceeded. Please try again later.",
  },
  {
    id: "4",
    date: "Dec 5, 2024 11:05 AM",
    status: "completed",
    creators: ["she_is_ada_"],
    reelsScraped: 45,
    newReels: 5,
    duration: "3m 12s",
    error: null,
  },
  {
    id: "5",
    date: "Dec 4, 2024 4:50 PM",
    status: "partial",
    creators: ["_olasubomi_", "5thkind_", "newcreator"],
    reelsScraped: 67,
    newReels: 15,
    duration: "6m 8s",
    error: "Could not scrape: newcreator (account private)",
  },
];

export default function RunHistory() {
  const [expandedRun, setExpandedRun] = useState<string | null>(null);

  const stats = [
    { label: "Total Runs", value: "127" },
    { label: "Success Rate", value: "94.3%" },
    { label: "Reels Scraped", value: "12,847" },
    { label: "Avg Duration", value: "6m 15s" },
    { label: "Last Run", value: "2h ago" },
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
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Run History</h1>
          <p className="text-muted-foreground">View past scraper executions and logs</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-3">
        {mockRuns.map((run) => (
          <Card key={run.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getStatusBadge(run.status)}
                  <span className="text-sm text-muted-foreground">{run.date}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedRun(expandedRun === run.id ? null : run.id)}
                >
                  {expandedRun === run.id ? "Hide Details" : "Show Details"}
                </Button>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <div>
                  <span className="text-muted-foreground">Creators:</span>{" "}
                  <span className="font-medium">{run.creators.join(", ")}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Duration:</span>{" "}
                  <span className="font-medium">{run.duration}</span>
                </div>
              </div>

              {expandedRun === run.id && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Reels Scraped</div>
                      <div className="text-2xl font-bold">{run.reelsScraped}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">New Reels</div>
                      <div className="text-2xl font-bold">{run.newReels}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Updated</div>
                      <div className="text-2xl font-bold">{run.reelsScraped - run.newReels}</div>
                    </div>
                  </div>

                  {run.error && (
                    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                      <div className="text-sm font-medium text-destructive mb-1">Error</div>
                      <div className="text-sm text-muted-foreground">{run.error}</div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
