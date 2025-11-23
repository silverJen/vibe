import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { randomUUID } from "crypto";
import type { Message, DraftBlock } from "@shared/schema";

// Mock AI 인터뷰 질문 생성
const generateAIQuestion = (messages: Message[]): string => {
  const userMessages = messages.filter(m => m.role === "user");
  const questionTemplates = [
    "그 경험에서 가장 기억에 남는 순간은 언제였나요?",
    "그때 어떤 감정을 느꼈는지 좀 더 자세히 말해줄 수 있어요?",
    "그 과정에서 배운 점이 있다면 무엇일까요?",
    "그 선택을 하게 된 가장 큰 이유는 뭐였나요?",
    "지금 돌이켜보면, 그 경험이 당신에게 어떤 의미인가요?",
    "그 이야기와 관련해서 또 떠오르는 게 있나요?",
    "조금 더 구체적으로 설명해줄 수 있을까요?",
    "그 상황에서 가장 어려웠던 점은 무엇이었나요?",
    "만약 다시 그 순간으로 돌아간다면, 다르게 할 것이 있을까요?",
    "그 이야기를 통해 전하고 싶은 메시지가 있다면요?",
  ];

  const summaryTemplates = [
    "지금까지 말씀해주신 내용을 정리해보면, ",
    "듣고 보니 핵심은 이런 것 같아요. ",
    "흥미로운 이야기네요. 요약하자면, ",
  ];

  // 3-4개 메시지마다 요약을 추가
  if (userMessages.length > 0 && userMessages.length % 4 === 0) {
    const lastUserMessage = userMessages[userMessages.length - 1];
    const summary = summaryTemplates[Math.floor(Math.random() * summaryTemplates.length)];
    return `${summary}${lastUserMessage.content.slice(0, 50)}... 이런 부분이 중요한 것 같아요. 다음으로 어떤 이야기를 해볼까요?`;
  }

  return questionTemplates[Math.floor(Math.random() * questionTemplates.length)];
};

// Mock 음성 전사 (실제로는 OpenAI Whisper 사용)
const mockTranscribe = (): string => {
  const samples = [
    "저는 그 프로젝트를 진행하면서 많은 것을 배웠어요. 특히 팀원들과 협업하는 과정에서 커뮤니케이션의 중요성을 깨달았죠.",
    "처음에는 두려웠지만, 결국 그 도전을 받아들이기로 했어요. 제 인생에서 가장 의미 있는 결정 중 하나였습니다.",
    "그때는 정말 힘들었어요. 하지만 지금 돌이켜보면 그 경험이 저를 더 강하게 만들어준 것 같아요.",
  ];
  return samples[Math.floor(Math.random() * samples.length)];
};

// Mock 초고 생성
const generateDraft = (messages: Message[], draftId: string) => {
  const userMessages = messages.filter(m => m.role === "user");
  
  if (userMessages.length === 0) {
    throw new Error("대화 내용이 부족해요. 더 많은 이야기를 나눠주세요.");
  }

  const blocks: DraftBlock[] = [];
  let order = 0;

  // 제목 생성 (사용자의 첫 메시지나 핵심 키워드에서)
  const titleContent = userMessages.length > 0 
    ? `${userMessages[0].content.split('.')[0].slice(0, 30)}에 대한 이야기`
    : "나의 경험 이야기";
  
  blocks.push({
    id: randomUUID(),
    draftId: draftId,
    blockType: "title",
    content: titleContent,
    source: "user",
    order: order++,
  });

  // 도입부 (AI가 생성)
  blocks.push({
    id: randomUUID(),
    draftId: draftId,
    blockType: "paragraph",
    content: "이 이야기는 나의 경험에서 시작된다. 돌이켜보면, 그 순간들이 지금의 나를 만든 중요한 계기였다.",
    source: "ai",
    order: order++,
  });

  // 본론 - 사용자 메시지를 기반으로 문단 생성 (70-80% 사용자 발언 유지)
  const mainMessages = userMessages.slice(0, Math.min(4, userMessages.length));
  
  mainMessages.forEach((msg, idx) => {
    if (idx > 0 && idx % 2 === 0) {
      // 소제목 추가
      blocks.push({
        id: randomUUID(),
        draftId: draftId,
        blockType: "heading",
        content: `${idx === 2 ? "전환점" : "깨달음"}`,
        source: "ai",
        order: order++,
      });
    }

    // 사용자 메시지를 문단으로 (살짝 다듬되 원문 유지)
    let content = msg.content;
    
    // 구어체를 문어체로 살짝 변환
    content = content
      .replace(/저는/g, "나는")
      .replace(/했어요/g, "했다")
      .replace(/있어요/g, "있다")
      .replace(/그래요/g, "그렇다");
    
    blocks.push({
      id: randomUUID(),
      draftId: draftId,
      blockType: "paragraph",
      content: content,
      source: "user",
      order: order++,
    });

    // 가끔 AI가 연결 문장 추가
    if (idx < mainMessages.length - 1 && Math.random() > 0.5) {
      const transitions = [
        "이런 경험을 통해 많은 것을 배울 수 있었다.",
        "그 과정은 쉽지 않았지만, 의미 있는 시간이었다.",
        "돌이켜보면, 그때의 선택이 옳았다고 생각한다.",
      ];
      blocks.push({
        id: randomUUID(),
        draftId: draftId,
        blockType: "paragraph",
        content: transitions[Math.floor(Math.random() * transitions.length)],
        source: "ai",
        order: order++,
      });
    }
  });

  // 마무리
  blocks.push({
    id: randomUUID(),
    draftId: draftId,
    blockType: "heading",
    content: "마치며",
    source: "ai",
    order: order++,
  });

  blocks.push({
    id: randomUUID(),
    draftId: draftId,
    blockType: "paragraph",
    content: "이 경험은 내게 소중한 배움이 되었다. 앞으로도 이런 순간들을 기록하며, 나만의 이야기를 만들어가고 싶다.",
    source: "ai",
    order: order++,
  });

  return blocks;
};

// Mock 문단 다듬기
const polishBlock = (content: string): string => {
  // 간단한 문장 다듬기 시뮬레이션
  let polished = content
    .replace(/\s+/g, " ")
    .trim();
  
  // 문장이 너무 짧으면 살짝 확장
  if (polished.length < 50) {
    polished += " 이는 매우 의미 있는 경험이었다.";
  }
  
  return polished;
};

export async function registerRoutes(app: Express): Promise<Server> {
  // GET /api/sessions/:id/messages - 메시지 목록 조회
  app.get("/api/sessions/:id/messages", (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const messagesKey = `messages_${id}`;
      
      // 클라이언트가 localStorage에서 전달한 데이터 사용
      // 실제로는 여기서 DB에서 조회하지만, Mock이므로 빈 배열 반환 후 클라이언트에서 localStorage 사용
      res.json([]);
    } catch (error) {
      res.status(500).json({ error: "메시지를 불러올 수 없어요." });
    }
  });

  // POST /api/sessions/:id/chat - 메시지 전송 및 AI 응답 생성
  app.post("/api/sessions/:id/chat", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { content, source, existingMessages } = req.body;

      if (!content?.trim()) {
        return res.status(400).json({ error: "메시지 내용이 필요해요." });
      }

      // Validate existingMessages
      if (existingMessages && !Array.isArray(existingMessages)) {
        return res.status(400).json({ error: "잘못된 메시지 형식이에요." });
      }

      // 사용자 메시지 생성
      const userMessage: Message = {
        id: randomUUID(),
        sessionId: id,
        role: "user",
        content: content.trim(),
        source: source || "typed",
        createdAt: new Date().toISOString() as any,
      };

      // 기존 메시지와 합치기
      const storedMessages = existingMessages || [];
      const allMessages = [...storedMessages, userMessage];

      // AI 응답 생성
      const aiResponse: Message = {
        id: randomUUID(),
        sessionId: id,
        role: "assistant",
        content: generateAIQuestion(allMessages),
        source: "system",
        createdAt: new Date().toISOString() as any,
      };

      // localStorage에 저장할 메시지들 반환
      const updatedMessages = [...allMessages, aiResponse];

      res.json({
        userMessage,
        aiMessage: aiResponse,
        allMessages: updatedMessages,
      });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ error: "응답을 생성할 수 없어요." });
    }
  });

  // POST /api/sessions/:id/voice - 음성 전사
  app.post("/api/sessions/:id/voice", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { existingMessages } = req.body;

      // Validate existingMessages
      if (existingMessages && !Array.isArray(existingMessages)) {
        return res.status(400).json({ error: "잘못된 메시지 형식이에요." });
      }

      // Mock 전사 결과
      const transcription = mockTranscribe();

      // 메시지 생성
      const userMessage: Message = {
        id: randomUUID(),
        sessionId: id,
        role: "user",
        content: transcription,
        source: "voice_transcript",
        createdAt: new Date().toISOString() as any,
      };

      // 기존 메시지에 추가
      const storedMessages = existingMessages || [];
      const allMessages = [...storedMessages, userMessage];

      // AI 응답 생성
      const aiResponse: Message = {
        id: randomUUID(),
        sessionId: id,
        role: "assistant",
        content: generateAIQuestion(allMessages),
        source: "system",
        createdAt: new Date().toISOString() as any,
      };

      const updatedMessages = [...allMessages, aiResponse];

      res.json({
        transcription,
        userMessage,
        aiMessage: aiResponse,
        allMessages: updatedMessages,
      });
    } catch (error) {
      console.error("Voice transcription error:", error);
      res.status(500).json({ error: "음성을 변환할 수 없어요." });
    }
  });

  // POST /api/sessions/:id/draft - 초고 생성
  app.post("/api/sessions/:id/draft", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { messages } = req.body;

      if (!messages || messages.length === 0) {
        return res.status(400).json({ error: "메시지가 필요해요." });
      }

      const userMessages = messages.filter((m: Message) => m.role === "user");
      if (userMessages.length < 3) {
        return res.status(400).json({ error: "더 많은 대화가 필요해요. 최소 3개 이상의 메시지를 작성해주세요." });
      }

      // 초고 생성 - sessionId를 draftId로 사용
      const blocks = generateDraft(messages, id);

      const draft = {
        id: id, // sessionId를 draftId로 사용
        sessionId: id,
        blocks: blocks,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      res.json(draft);
    } catch (error: any) {
      console.error("Draft generation error:", error);
      res.status(500).json({ error: error.message || "초고를 생성할 수 없어요." });
    }
  });

  // POST /api/draft-blocks/:id/polish - 문단 다듬기
  app.post("/api/draft-blocks/:id/polish", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { content } = req.body;

      if (!content) {
        return res.status(400).json({ error: "내용이 필요해요." });
      }

      const polished = polishBlock(content);

      res.json({ content: polished });
    } catch (error) {
      console.error("Polish error:", error);
      res.status(500).json({ error: "문단을 다듬을 수 없어요." });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
