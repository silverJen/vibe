import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Copy, Check, Loader2 } from "lucide-react";
import DraftBlockCard from "@/components/DraftBlockCard";
import type { Session, Draft, DraftBlock } from "@shared/schema";
import { getDraft, saveDraft } from "@/lib/storage";

export default function DraftEdit() {
  const [, params] = useRoute("/sessions/:id/draft");
  const [, setLocation] = useLocation();
  const sessionId = params?.id;
  const [session, setSession] = useState<Session | null>(null);
  const [draft, setDraft] = useState<(Draft & { blocks: DraftBlock[] }) | null>(null);
  const [blocks, setBlocks] = useState<DraftBlock[]>([]);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!sessionId) return;

    const clientId = localStorage.getItem("client_id");
    if (!clientId) {
      setLocation("/");
      return;
    }

    const stored = localStorage.getItem(`sessions_${clientId}`);
    if (stored) {
      const sessions = JSON.parse(stored);
      const found = sessions.find((s: Session) => s.id === sessionId);
      if (found) {
        setSession(found);
        
        // Load draft from localStorage
        const loadedDraft = getDraft(sessionId);
        if (loadedDraft && loadedDraft.blocks) {
          setDraft(loadedDraft);
          setBlocks(loadedDraft.blocks);
        }
        setIsLoading(false);
      } else {
        setLocation("/");
      }
    } else {
      setLocation("/");
    }
  }, [sessionId, setLocation]);

  const handleUpdateBlock = (blockId: string, content: string) => {
    const newBlocks = blocks.map((block) =>
      block.id === blockId ? { ...block, content } : block
    );
    setBlocks(newBlocks);

    // Update draft in localStorage
    if (draft && sessionId && newBlocks.length > 0) {
      try {
        const updatedDraft = {
          ...draft,
          blocks: newBlocks,
        };
        saveDraft(sessionId, updatedDraft);
        setDraft(updatedDraft);
      } catch (error) {
        console.error("Failed to update draft:", error);
        toast({
          title: "저장 실패",
          description: "문단 수정 내용을 저장하지 못했어요.",
          variant: "destructive",
        });
      }
    }
  };

  const handleDeleteBlock = (blockId: string) => {
    const newBlocks = blocks.filter((block) => block.id !== blockId);
    setBlocks(newBlocks);

    // Update draft in localStorage
    if (draft && sessionId && newBlocks.length > 0) {
      try {
        const updatedDraft = {
          ...draft,
          blocks: newBlocks,
        };
        saveDraft(sessionId, updatedDraft);
        setDraft(updatedDraft);
      } catch (error) {
        console.error("Failed to delete block:", error);
        toast({
          title: "저장 실패",
          description: "블록 삭제 내용을 저장하지 못했어요.",
          variant: "destructive",
        });
      }
    } else if (newBlocks.length === 0) {
      // If all blocks are deleted, show a message
      toast({
        title: "모든 블록이 삭제되었어요",
        description: "초고에 최소 하나의 블록이 필요해요.",
        variant: "destructive",
      });
    }
  };

  const handleCopyAll = async () => {
    const fullText = blocks
      .sort((a, b) => a.order - b.order)
      .map((block) => {
        if (block.blockType === "title") {
          return `# ${block.content}\n`;
        } else if (block.blockType === "heading") {
          return `\n## ${block.content}\n`;
        }
        return `\n${block.content}\n`;
      })
      .join("");

    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      toast({
        title: "전체 초고를 복사했어요",
        description: "원하는 곳에 붙여넣어 사용해 주세요.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "복사 실패",
        description: "잠시 후 다시 시도해 주세요.",
        variant: "destructive",
      });
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-background pt-16 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-16 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">초고를 불러오는 중입니다...</p>
        </div>
      </div>
    );
  }

  if (!draft) {
    return (
      <div className="min-h-screen bg-background pt-16 flex items-center justify-center">
        <Card className="max-w-md p-8 text-center">
          <p className="text-muted-foreground mb-4">초고가 아직 생성되지 않았어요.</p>
          <Button onClick={() => setLocation(`/sessions/${sessionId}`)}>
            인터뷰로 돌아가기
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Header */}
      <div className="border-b border-border bg-card sticky top-16 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLocation(`/sessions/${sessionId}`)}
              data-testid="button-back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold truncate" data-testid="text-session-title">
                {session.title}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  초고 편집
                </Badge>
              </div>
            </div>

            <Button
              onClick={handleCopyAll}
              disabled={blocks.length === 0}
              data-testid="button-copy-all"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  복사됨
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  전체 복사
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Draft Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary/20 border-l-4 border-l-primary rounded-sm"></div>
              <span className="text-sm text-muted-foreground">내가 한 말</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-muted/50 border-l-4 border-l-muted rounded-sm"></div>
              <span className="text-sm text-muted-foreground">AI가 다듬은 말</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            문단을 클릭해서 직접 수정하거나, AI로 다듬기 버튼을 눌러보세요.
          </p>
        </div>

        {blocks.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">초고 블록이 없어요.</p>
          </Card>
        ) : (
          <div className="space-y-4" data-testid="list-draft-blocks">
            {blocks
              .sort((a, b) => a.order - b.order)
              .map((block) => (
                <DraftBlockCard
                  key={block.id}
                  block={block}
                  onUpdate={handleUpdateBlock}
                  onDelete={handleDeleteBlock}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
