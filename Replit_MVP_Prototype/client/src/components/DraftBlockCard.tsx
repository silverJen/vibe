import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Trash2, Loader2 } from "lucide-react";
import type { DraftBlock } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface DraftBlockCardProps {
  block: DraftBlock;
  onUpdate: (blockId: string, content: string) => void;
  onDelete: (blockId: string) => void;
}

export default function DraftBlockCard({ block, onUpdate, onDelete }: DraftBlockCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(block.content);
  const [isHovered, setIsHovered] = useState(false);
  const { toast } = useToast();

  const polishMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", `/api/draft-blocks/${block.id}/polish`, {
        content: block.content,
      });
    },
    onSuccess: (data: any) => {
      onUpdate(block.id, data.content);
      setContent(data.content);
      toast({
        title: "문단을 다듬었어요",
      });
    },
    onError: () => {
      toast({
        title: "다듬기 실패",
        description: "잠시 후 다시 시도해 주세요.",
        variant: "destructive",
      });
    },
  });

  const handleBlur = () => {
    setIsEditing(false);
    if (content !== block.content) {
      onUpdate(block.id, content);
    }
  };

  const getBlockStyle = () => {
    if (block.source === "user") {
      return "border-l-4 border-l-primary bg-primary/5";
    }
    return "border-l-4 border-l-muted bg-muted/30";
  };

  const getTextSize = () => {
    if (block.blockType === "title") return "text-2xl font-bold";
    if (block.blockType === "heading") return "text-xl font-semibold";
    return "text-base";
  };

  return (
    <Card
      className={`relative p-5 ${getBlockStyle()} transition-shadow`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`draft-block-${block.id}`}
    >
      {isEditing ? (
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          className={`min-h-[100px] ${getTextSize()} border-0 p-0 resize-none focus-visible:ring-0`}
          data-testid={`textarea-block-${block.id}`}
        />
      ) : (
        <p
          onClick={() => setIsEditing(true)}
          className={`${getTextSize()} whitespace-pre-wrap cursor-text leading-relaxed`}
          data-testid={`text-block-content-${block.id}`}
        >
          {content}
        </p>
      )}

      {isHovered && !isEditing && (
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => polishMutation.mutate()}
            disabled={polishMutation.isPending}
            data-testid={`button-polish-${block.id}`}
          >
            {polishMutation.isPending ? (
              <>
                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                다듬는 중...
              </>
            ) : (
              <>
                <Sparkles className="h-3 w-3 mr-1" />
                AI로 다듬기
              </>
            )}
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDelete(block.id)}
            data-testid={`button-delete-${block.id}`}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      )}
    </Card>
  );
}
