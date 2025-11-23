import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, MessageCircle, FileText } from "lucide-react";
import type { Session } from "@shared/schema";
import { nanoid } from "nanoid";

export default function SessionList() {
  const [, setLocation] = useLocation();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newSession, setNewSession] = useState({
    title: "",
    topicTag: "커리어",
    language: "한국어",
  });

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = () => {
    const clientId = getClientId();
    const stored = localStorage.getItem(`sessions_${clientId}`);
    if (stored) {
      setSessions(JSON.parse(stored));
    }
  };

  const getClientId = () => {
    let clientId = localStorage.getItem("client_id");
    if (!clientId) {
      clientId = nanoid();
      localStorage.setItem("client_id", clientId);
    }
    return clientId;
  };

  const createSession = () => {
    if (!newSession.title.trim()) {
      return;
    }

    const session: Session = {
      id: nanoid(),
      clientId: getClientId(),
      title: newSession.title,
      topicTag: newSession.topicTag,
      language: newSession.language,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const clientId = getClientId();
    const stored = localStorage.getItem(`sessions_${clientId}`);
    const existingSessions = stored ? JSON.parse(stored) : [];
    const updated = [session, ...existingSessions];
    localStorage.setItem(`sessions_${clientId}`, JSON.stringify(updated));

    setSessions(updated);
    setIsDialogOpen(false);
    setNewSession({ title: "", topicTag: "커리어", language: "한국어" });
    setLocation(`/sessions/${session.id}`);
  };

  const getSessionStatus = (sessionId: string) => {
    const draftKey = `draft_${sessionId}`;
    return localStorage.getItem(draftKey) ? "초고 생성됨" : "인터뷰 중";
  };

  const formatDate = (date: Date) => {
    const d = new Date(date);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return "오늘";
    if (days === 1) return "어제";
    if (days < 7) return `${days}일 전`;
    return d.toLocaleDateString("ko-KR", { month: "long", day: "numeric" });
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="text-welcome">
            오늘은 어떤 이야기를 기록해볼까요?
          </h1>
          <p className="text-base text-muted-foreground mb-8">
            편안한 대화로 생각을 정리하고, 자동으로 글의 초고를 만들어보세요.
          </p>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="px-8" data-testid="button-new-session">
                <Plus className="h-5 w-5 mr-2" />
                새 인터뷰 시작하기
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>새 인터뷰 세션</DialogTitle>
                <DialogDescription>
                  어떤 주제로 이야기를 나눠볼까요?
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">제목</Label>
                  <Input
                    id="title"
                    placeholder="예: 나의 커리어 전환 이야기"
                    value={newSession.title}
                    onChange={(e) => setNewSession({ ...newSession, title: e.target.value })}
                    onKeyDown={(e) => e.key === "Enter" && createSession()}
                    data-testid="input-session-title"
                  />
                </div>

                <div className="space-y-2">
                  <Label>주제</Label>
                  <div className="flex flex-wrap gap-2">
                    {["커리어", "제품", "삶", "기타"].map((tag) => (
                      <Button
                        key={tag}
                        variant={newSession.topicTag === tag ? "default" : "outline"}
                        size="sm"
                        onClick={() => setNewSession({ ...newSession, topicTag: tag })}
                        data-testid={`button-topic-${tag}`}
                      >
                        {tag}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">언어</Label>
                  <Select
                    value={newSession.language}
                    onValueChange={(value) => setNewSession({ ...newSession, language: value })}
                  >
                    <SelectTrigger id="language" data-testid="select-language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="한국어">한국어</SelectItem>
                      <SelectItem value="영어">영어</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={createSession} className="w-full" data-testid="button-create-session">
                인터뷰 시작
              </Button>
            </DialogContent>
          </Dialog>
        </div>

        {/* Sessions Grid */}
        {sessions.length === 0 ? (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="py-16 text-center">
              <MessageCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2 text-foreground">아직 세션이 없어요</h3>
              <p className="text-muted-foreground">
                첫 인터뷰를 시작하고 AI와 대화하며 글을 만들어보세요.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2" data-testid="list-sessions">
            {sessions.map((session) => {
              const status = getSessionStatus(session.id);
              return (
                <Card
                  key={session.id}
                  className="hover-elevate active-elevate-2 cursor-pointer transition-all"
                  onClick={() => setLocation(`/sessions/${session.id}`)}
                  data-testid={`card-session-${session.id}`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg line-clamp-2" data-testid={`text-session-title-${session.id}`}>
                        {session.title}
                      </CardTitle>
                      {status === "초고 생성됨" ? (
                        <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                      ) : (
                        <MessageCircle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary" data-testid={`badge-topic-${session.id}`}>
                        {session.topicTag}
                      </Badge>
                      <Badge
                        variant={status === "초고 생성됨" ? "default" : "outline"}
                        data-testid={`badge-status-${session.id}`}
                      >
                        {status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground" data-testid={`text-date-${session.id}`}>
                      {formatDate(session.createdAt)}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
