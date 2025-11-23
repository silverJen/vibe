import { useState, useEffect, useRef } from "react";
import { useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Send, Sparkles, Loader2 } from "lucide-react";
import VoiceRecorder from "@/components/VoiceRecorder";
import type { Session, Message } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { getMessages, saveMessages, saveDraft } from "@/lib/storage";

export default function InterviewChat() {
  const [, params] = useRoute("/sessions/:id");
  const [, setLocation] = useLocation();
  const sessionId = params?.id;
  const [session, setSession] = useState<Session | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Load session and messages
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
        
        // Load messages
        const loadedMessages = getMessages(sessionId);
        
        // Check if this is a new session with no messages
        if (loadedMessages.length === 0) {
          const initialMessage: Message = {
            id: crypto.randomUUID(),
            sessionId,
            role: "assistant",
            content: "반가워요! 이 주제에서 가장 먼저 떠오르는 생각은 뭐예요?",
            source: "system",
            createdAt: new Date().toISOString() as any,
          };
          const initialMessages = [initialMessage];
          saveMessages(sessionId, initialMessages);
          setMessages(initialMessages);
        } else {
          setMessages(loadedMessages);
        }
      } else {
        setLocation("/");
      }
    } else {
      setLocation("/");
    }
  }, [sessionId, setLocation]);

  const sendMessageMutation = useMutation({
    mutationFn: async (data: { content: string; source: string }) => {
      const currentMessages = getMessages(sessionId!);
      return await apiRequest("POST", `/api/sessions/${sessionId}/chat`, {
        content: data.content,
        source: data.source,
        existingMessages: currentMessages,
      });
    },
    onSuccess: (data: any) => {
      const updatedMessages = data.allMessages;
      saveMessages(sessionId!, updatedMessages);
      setMessages(updatedMessages);
      scrollToBottom();
    },
    onError: () => {
      toast({
        title: "메시지 전송 실패",
        description: "잠시 후 다시 시도해 주세요.",
        variant: "destructive",
      });
    },
  });

  const transcribeVoiceMutation = useMutation({
    mutationFn: async (audioBlob: Blob) => {
      const currentMessages = getMessages(sessionId!);
      return await apiRequest("POST", `/api/sessions/${sessionId}/voice`, {
        existingMessages: currentMessages,
      });
    },
    onSuccess: (data: any) => {
      const updatedMessages = data.allMessages;
      saveMessages(sessionId!, updatedMessages);
      setMessages(updatedMessages);
      scrollToBottom();
      toast({
        title: "음성이 텍스트로 변환되었어요",
        description: `"${data.transcription}"`,
      });
    },
    onError: () => {
      toast({
        title: "음성 변환 실패",
        description: "잠시 후 다시 시도해 주세요.",
        variant: "destructive",
      });
    },
  });

  const generateDraftMutation = useMutation({
    mutationFn: async () => {
      const currentMessages = getMessages(sessionId!);
      const userMessageCount = currentMessages.filter(m => m.role === "user").length;
      
      if (userMessageCount < 3) {
        throw new Error("더 많은 대화가 필요해요. 최소 3개 이상의 메시지를 작성해주세요.");
      }
      
      return await apiRequest("POST", `/api/sessions/${sessionId}/draft`, {
        messages: currentMessages,
      });
    },
    onSuccess: (data: any) => {
      // Validate draft data structure
      if (!data || !data.blocks || !Array.isArray(data.blocks)) {
        toast({
          title: "초고 생성 실패",
          description: "초고 데이터 형식이 올바르지 않아요.",
          variant: "destructive",
        });
        return;
      }

      // Save draft to localStorage
      try {
        saveDraft(sessionId!, data);
        toast({
          title: "초고가 생성되었어요!",
          description: "초고 페이지로 이동합니다.",
        });
        setTimeout(() => {
          setLocation(`/sessions/${sessionId}/draft`);
        }, 1000);
      } catch (error) {
        toast({
          title: "초고 저장 실패",
          description: "잠시 후 다시 시도해 주세요.",
          variant: "destructive",
        });
      }
    },
    onError: (error: any) => {
      toast({
        title: "초고 생성 실패",
        description: error.message || "잠시 후 다시 시도해 주세요.",
        variant: "destructive",
      });
    },
  });

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputText.trim() || sendMessageMutation.isPending) return;

    sendMessageMutation.mutate({
      content: inputText,
      source: "typed",
    });

    setInputText("");
  };

  const handleVoiceRecording = (audioBlob: Blob) => {
    transcribeVoiceMutation.mutate(audioBlob);
  };

  const canGenerateDraft = () => {
    if (!messages || messages.length === 0) return false;
    const userMessages = messages.filter((m) => m.role === "user");
    return userMessages.length >= 3;
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-background pt-16 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16 flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLocation("/")}
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
                  {session.topicTag}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {session.language}
                </Badge>
              </div>
            </div>

            {canGenerateDraft() && (
              <Button
                onClick={() => generateDraftMutation.mutate()}
                disabled={generateDraftMutation.isPending}
                data-testid="button-generate-draft"
              >
                {generateDraftMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    생성 중...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    초고 만들기
                  </>
                )}
              </Button>
            )}
          </div>

          <p className="text-sm text-muted-foreground mt-4">
            편하게 말해보세요. 제가 질문하면서 생각을 정리해 드릴게요.
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-start" : "justify-end"}`}
              data-testid={`message-${message.role}-${message.id}`}
            >
              <Card
                className={`max-w-md px-4 py-3 ${
                  message.role === "user"
                    ? "bg-primary/10 border-primary/20"
                    : "bg-card"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap" data-testid={`text-message-content-${message.id}`}>
                  {message.content}
                </p>
                {message.source === "voice_transcript" && (
                  <Badge variant="secondary" className="mt-2 text-xs">
                    음성
                  </Badge>
                )}
              </Card>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-card">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Input
                placeholder="여기에 답변을 적거나, 음성 버튼을 눌러 말해보세요."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                disabled={sendMessageMutation.isPending || transcribeVoiceMutation.isPending}
                data-testid="input-message"
              />
            </div>
            <VoiceRecorder
              onRecordingComplete={handleVoiceRecording}
              disabled={transcribeVoiceMutation.isPending || sendMessageMutation.isPending}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || sendMessageMutation.isPending}
              data-testid="button-send"
            >
              {sendMessageMutation.isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
