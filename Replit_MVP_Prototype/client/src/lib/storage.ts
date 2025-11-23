import type { Message, Draft, DraftBlock } from "@shared/schema";

export const StorageKeys = {
  clientId: "client_id",
  sessions: (clientId: string) => `sessions_${clientId}`,
  messages: (sessionId: string) => `messages_${sessionId}`,
  draft: (sessionId: string) => `draft_${sessionId}`,
};

export function getMessages(sessionId: string): Message[] {
  const key = StorageKeys.messages(sessionId);
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
}

export function saveMessages(sessionId: string, messages: Message[]): void {
  const key = StorageKeys.messages(sessionId);
  localStorage.setItem(key, JSON.stringify(messages));
}

export function getDraft(sessionId: string): (Draft & { blocks: DraftBlock[] }) | null {
  const key = StorageKeys.draft(sessionId);
  const stored = localStorage.getItem(key);
  if (!stored) return null;
  
  try {
    const parsed = JSON.parse(stored);
    // Validate that blocks exist and is an array
    if (!parsed || !Array.isArray(parsed.blocks)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function saveDraft(sessionId: string, draft: Draft & { blocks: DraftBlock[] }): void {
  // Validate draft before saving
  if (!draft || !Array.isArray(draft.blocks) || draft.blocks.length === 0) {
    throw new Error("Invalid draft data: blocks must be a non-empty array");
  }

  const key = StorageKeys.draft(sessionId);
  
  // Ensure dates are ISO strings
  const normalized = {
    id: draft.id,
    sessionId: draft.sessionId,
    blocks: draft.blocks,
    createdAt: draft.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  localStorage.setItem(key, JSON.stringify(normalized));
}

export function clearDraft(sessionId: string): void {
  const key = StorageKeys.draft(sessionId);
  localStorage.removeItem(key);
}
