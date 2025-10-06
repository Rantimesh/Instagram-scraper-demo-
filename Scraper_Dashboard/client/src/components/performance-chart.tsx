import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface PerformanceChartProps {
  timeFilter: string;
}

export default function PerformanceChart({ timeFilter }: PerformanceChartProps) {
  const [metric, setMetric] = useState("engagement");

  const videoTypes = [
    { name: "Educational", value: 8.2, color: "bg-chart-1" },
    { name: "Entertainment", value: 7.5, color: "bg-chart-2" },
    { name: "Behind the Scenes", value: 6.8, color: "bg-chart-3" },
    { name: "Product Demo", value: 6.1, color: "bg-chart-4" },
    { name: "Lifestyle", value: 5.3, color: "bg-chart-5" },
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6" data-testid="performance-chart">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Video Type Performance</h3>
        <Select value={metric} onValueChange={setMetric}>
          <SelectTrigger className="w-40" data-testid="metric-selector">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="engagement">Engagement Rate</SelectItem>
            <SelectItem value="views">Views</SelectItem>
            <SelectItem value="likes">Likes</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-4">
        {videoTypes.map((type) => (
          <div key={type.name} data-testid={`performance-item-${type.name.toLowerCase().replace(/\s+/g, '-')}`}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">{type.name}</span>
              <span className="text-sm text-muted-foreground">{type.value}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`${type.color} h-2 rounded-full`} 
                style={{ width: `${(type.value / 10) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
