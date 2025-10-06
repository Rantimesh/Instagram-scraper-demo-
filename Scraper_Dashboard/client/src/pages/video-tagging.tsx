import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockReels = [
  {
    id: "1",
    thumbnail: "https://picsum.photos/seed/reel1/400/600",
    caption: "How to create engaging content that resonates with your audience...",
    views: "847K",
    likes: "52.3K",
    comments: "1.2K",
    videoType: null,
  },
  {
    id: "2",
    thumbnail: "https://picsum.photos/seed/reel2/400/600",
    caption: "Behind the scenes of our latest project and creative process...",
    views: "623K",
    likes: "41.8K",
    comments: "892",
    videoType: "Behind the Scenes",
  },
  {
    id: "3",
    thumbnail: "https://picsum.photos/seed/reel3/400/600",
    caption: "Quick entertainment video that went viral last week...",
    views: "1.2M",
    likes: "89.4K",
    comments: "2.1K",
    videoType: null,
  },
  {
    id: "4",
    thumbnail: "https://picsum.photos/seed/reel4/400/600",
    caption: "Product demonstration and detailed review of our new features...",
    views: "456K",
    likes: "28.7K",
    comments: "567",
    videoType: "Product Demo",
  },
  {
    id: "5",
    thumbnail: "https://picsum.photos/seed/reel5/400/600",
    caption: "Daily lifestyle vlog showing our typical work routine...",
    views: "389K",
    likes: "23.1K",
    comments: "445",
    videoType: null,
  },
  {
    id: "6",
    thumbnail: "https://picsum.photos/seed/reel6/400/600",
    caption: "Educational tutorial on advanced techniques and best practices...",
    views: "712K",
    likes: "48.9K",
    comments: "1.5K",
    videoType: "Educational",
  },
];

export default function VideoTagging() {
  const [selectedReel, setSelectedReel] = useState<typeof mockReels[0] | null>(null);
  const [videoType, setVideoType] = useState("");

  const handleTagReel = () => {
    console.log(`Tagging reel ${selectedReel?.id} as ${videoType}`);
    setSelectedReel(null);
    setVideoType("");
  };

  const untaggedCount = mockReels.filter(r => !r.videoType).length;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Video Tagging</h1>
          <p className="text-muted-foreground">Categorize your reels for better analytics</p>
        </div>
        <Badge variant="secondary">{untaggedCount} untagged</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockReels.map((reel) => (
          <Card key={reel.id} className="overflow-hidden">
            <div className="relative aspect-[9/16] bg-muted">
              <img
                src={reel.thumbnail}
                alt={reel.caption}
                className="w-full h-full object-cover"
              />
              {reel.videoType && (
                <Badge className="absolute top-2 right-2">
                  {reel.videoType}
                </Badge>
              )}
            </div>
            <CardContent className="p-4">
              <p className="text-sm mb-3 line-clamp-2">{reel.caption}</p>
              <div className="grid grid-cols-3 gap-2 mb-3 text-xs text-muted-foreground">
                <div>
                  <div className="font-medium text-foreground">{reel.views}</div>
                  <div>Views</div>
                </div>
                <div>
                  <div className="font-medium text-foreground">{reel.likes}</div>
                  <div>Likes</div>
                </div>
                <div>
                  <div className="font-medium text-foreground">{reel.comments}</div>
                  <div>Comments</div>
                </div>
              </div>
              <Button
                variant={reel.videoType ? "outline" : "default"}
                className="w-full"
                size="sm"
                onClick={() => setSelectedReel(reel)}
              >
                {reel.videoType ? "Re-tag" : "Tag Video"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedReel} onOpenChange={() => setSelectedReel(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tag Video Type</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="aspect-[9/16] bg-muted rounded-lg overflow-hidden max-h-80">
              {selectedReel && (
                <img
                  src={selectedReel.thumbnail}
                  alt={selectedReel.caption}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <p className="text-sm text-muted-foreground">{selectedReel?.caption}</p>
            <Select value={videoType} onValueChange={setVideoType}>
              <SelectTrigger>
                <SelectValue placeholder="Select video type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Educational">Educational</SelectItem>
                <SelectItem value="Entertainment">Entertainment</SelectItem>
                <SelectItem value="Behind the Scenes">Behind the Scenes</SelectItem>
                <SelectItem value="Product Demo">Product Demo</SelectItem>
                <SelectItem value="Lifestyle">Lifestyle</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setSelectedReel(null)}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={handleTagReel} disabled={!videoType}>
                Save Tag
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
