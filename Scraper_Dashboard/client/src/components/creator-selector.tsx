import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CreatorSelectorProps {
  selectedCreator: string | null;
  onCreatorChange: (creator: string | null) => void;
}

export default function CreatorSelector({ selectedCreator, onCreatorChange }: CreatorSelectorProps) {
  const mockCreators = [
    { id: "all", username: "All Creators", handle: null },
    { id: "creator_1", username: "she_is_ada_", handle: "@she_is_ada_" },
    { id: "creator_2", username: "_olasubomi_", handle: "@_olasubomi_" },
    { id: "creator_3", username: "5thkind_", handle: "@5thkind_" },
  ];

  return (
    <Select 
      value={selectedCreator || "all"} 
      onValueChange={(value) => onCreatorChange(value === "all" ? null : value)}
    >
      <SelectTrigger className="w-56" data-testid="select-creator">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {mockCreators.map((creator) => (
          <SelectItem key={creator.id} value={creator.id}>
            <div className="flex items-center gap-2">
              <i className="fas fa-user-circle"></i>
              <span>{creator.handle || creator.username}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
