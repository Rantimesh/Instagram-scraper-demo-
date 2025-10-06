import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface PerformanceChartProps {
  timeFilter: string;
}

interface ReelData {
  username: string;
  hashtags: string;
  views: number;
  likes: number;
  comments: number;
}

export default function PerformanceChart({ timeFilter }: PerformanceChartProps) {
  const [metric, setMetric] = useState("engagement");

  const { data: reels = [] } = useQuery<ReelData[]>({
    queryKey: ['/api/reels'],
  });

  const topHashtags = reels
    .flatMap(r => (r.hashtags || '').split(',').map(h => h.trim()).filter(Boolean))
    .reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const videoTypes = Object.entries(topHashtags)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count], idx) => ({
      name: `#${name}`,
      value: count,
      color: `bg-chart-${(idx % 5) + 1}` as const,
    }));

  const maxCount = Math.max(...videoTypes.map(t => t.value), 1);

  return (
    <div className="bg-card rounded-lg border border-border p-6" data-testid="performance-chart">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Top Hashtags</h3>
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
        {videoTypes.length > 0 ? videoTypes.map((type) => (
          <div key={type.name} data-testid={`performance-item-${type.name.toLowerCase().replace(/\s+/g, '-')}`}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">{type.name}</span>
              <span className="text-sm text-muted-foreground">{type.value} reels</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`${type.color} h-2 rounded-full`} 
                style={{ width: `${(type.value / maxCount) * 100}%` }}
              ></div>
            </div>
          </div>
        )) : (
          <p className="text-sm text-muted-foreground text-center py-4">
            No hashtag data available
          </p>
        )}
      </div>
    </div>
  );
}
