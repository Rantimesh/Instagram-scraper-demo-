interface FollowersChartProps {
  timeFilter: string;
}

export default function FollowersChart({ timeFilter }: FollowersChartProps) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  const heights = ['45%', '52%', '48%', '65%', '72%', '68%', '85%'];

  return (
    <div className="bg-card rounded-lg border border-border p-6" data-testid="followers-chart">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Followers Growth</h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-chart-1 rounded-full"></div>
            <span className="text-xs text-muted-foreground">Followers</span>
          </div>
        </div>
      </div>
      <div className="h-64 flex items-end justify-between gap-2">
        {months.map((month, index) => (
          <div key={month} className="flex flex-col items-center gap-2 flex-1">
            <div 
              className="w-full bg-chart-1 rounded-t" 
              style={{ height: heights[index] }}
              data-testid={`chart-bar-${month.toLowerCase()}`}
            ></div>
            <span className="text-xs text-muted-foreground">{month}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
