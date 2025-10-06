import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface ReelsTableProps {
  timeFilter: string;
}

export default function ReelsTable({ timeFilter }: ReelsTableProps) {
  const [videoType, setVideoType] = useState("all");

  const mockReels = [
    {
      id: "1",
      instagramId: "reel_123abc",
      caption: "How to create engaging content that...",
      datePosted: "Dec 8, 2024",
      videoType: "Educational",
      views: "847K",
      likes: "52.3K",
      comments: "1.2K",
      engagementRate: "6.8%"
    },
    {
      id: "2", 
      instagramId: "reel_456def",
      caption: "Behind the scenes of our latest project...",
      datePosted: "Dec 7, 2024",
      videoType: "Behind the Scenes",
      views: "623K",
      likes: "41.8K", 
      comments: "892",
      engagementRate: "7.2%"
    },
    {
      id: "3",
      instagramId: "reel_789ghi", 
      caption: "Quick entertainment video that went viral...",
      datePosted: "Dec 6, 2024",
      videoType: "Entertainment",
      views: "1.2M",
      likes: "89.4K",
      comments: "2.1K", 
      engagementRate: "8.9%"
    },
    {
      id: "4",
      instagramId: "reel_012jkl",
      caption: "Product demonstration and review...",
      datePosted: "Dec 5, 2024", 
      videoType: "Product Demo",
      views: "456K",
      likes: "28.7K",
      comments: "567",
      engagementRate: "6.4%"
    }
  ];

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      "Educational": "bg-chart-1/10 text-chart-1",
      "Entertainment": "bg-chart-2/10 text-chart-2", 
      "Behind the Scenes": "bg-chart-3/10 text-chart-3",
      "Product Demo": "bg-chart-4/10 text-chart-4",
      "Lifestyle": "bg-chart-5/10 text-chart-5"
    };
    return colors[type] || "bg-muted text-muted-foreground";
  };

  return (
    <div className="bg-card rounded-lg border border-border" data-testid="reels-table">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Recent Reels</h3>
          <div className="flex items-center gap-3">
            <Select value={videoType} onValueChange={setVideoType}>
              <SelectTrigger className="w-40" data-testid="video-type-filter">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="educational">Educational</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="behind-the-scenes">Behind the Scenes</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              onClick={() => console.log('Tag Videos clicked')}
              data-testid="button-tag-videos"
            >
              <i className="fas fa-tags mr-2"></i>
              Tag Videos
            </Button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Reel</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date Posted</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Type</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Views</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Likes</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Comments</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Engagement</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockReels.map((reel) => (
              <tr key={reel.id} className="border-b border-border hover:bg-muted/30 transition-colors" data-testid={`reel-row-${reel.id}`}>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-muted rounded border border-border flex items-center justify-center">
                      <i className="fas fa-video text-muted-foreground"></i>
                    </div>
                    <div>
                      <p className="text-sm font-medium line-clamp-1" data-testid={`reel-caption-${reel.id}`}>{reel.caption}</p>
                      <p className="text-xs text-muted-foreground">ID: {reel.instagramId}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm" data-testid={`reel-date-${reel.id}`}>{reel.datePosted}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(reel.videoType)}`}>
                    {reel.videoType}
                  </span>
                </td>
                <td className="p-4 text-sm font-medium" data-testid={`reel-views-${reel.id}`}>{reel.views}</td>
                <td className="p-4 text-sm" data-testid={`reel-likes-${reel.id}`}>{reel.likes}</td>
                <td className="p-4 text-sm" data-testid={`reel-comments-${reel.id}`}>{reel.comments}</td>
                <td className="p-4 text-sm font-medium text-chart-4" data-testid={`reel-engagement-${reel.id}`}>{reel.engagementRate}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => console.log('View clicked')}
                      className="text-muted-foreground hover:text-foreground transition-colors" 
                      title="View Details"
                      data-testid={`button-view-${reel.id}`}
                    >
                      <i className="fas fa-eye text-sm"></i>
                    </button>
                    <button 
                      onClick={() => console.log('Tag clicked')}
                      className="text-muted-foreground hover:text-foreground transition-colors" 
                      title="Edit Tags"
                      data-testid={`button-tag-${reel.id}`}
                    >
                      <i className="fas fa-tag text-sm"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-border flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Showing 4 of 847 reels</p>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 text-sm border border-border rounded hover:bg-muted transition-colors disabled:opacity-50" disabled data-testid="button-previous">
            Previous
          </button>
          <button className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded" data-testid="page-1">1</button>
          <button className="px-3 py-1 text-sm border border-border rounded hover:bg-muted transition-colors" data-testid="page-2">2</button>
          <button className="px-3 py-1 text-sm border border-border rounded hover:bg-muted transition-colors" data-testid="page-3">3</button>
          <span className="text-sm text-muted-foreground">...</span>
          <button className="px-3 py-1 text-sm border border-border rounded hover:bg-muted transition-colors" data-testid="page-212">212</button>
          <button className="px-3 py-1 text-sm border border-border rounded hover:bg-muted transition-colors" data-testid="button-next">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
