import { pgTable, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Sessions - 인터뷰 세션
export const sessions = pgTable("sessions", {
  id: varchar("id").primaryKey(),
  clientId: varchar("client_id").notNull(),
  title: text("title").notNull(),
  topicTag: varchar("topic_tag").notNull(), // 커리어, 제품, 삶, 기타
  language: varchar("language").notNull().default("한국어"), // 한국어, 영어
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertSessionSchema = createInsertSchema(sessions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertSession = z.infer<typeof insertSessionSchema>;
export type Session = typeof sessions.$inferSelect;

// Messages - 대화 메시지
export const messages = pgTable("messages", {
  id: varchar("id").primaryKey(),
  sessionId: varchar("session_id").notNull(),
  role: varchar("role").notNull(), // "user" | "assistant"
  content: text("content").notNull(),
  source: varchar("source").notNull(), // "voice_transcript" | "typed" | "system"
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  createdAt: true,
});

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;

// Drafts - 초고
export const drafts = pgTable("drafts", {
  id: varchar("id").primaryKey(),
  sessionId: varchar("session_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertDraftSchema = createInsertSchema(drafts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertDraft = z.infer<typeof insertDraftSchema>;
export type Draft = typeof drafts.$inferSelect;

// DraftBlocks - 초고 블록
export const draftBlocks = pgTable("draft_blocks", {
  id: varchar("id").primaryKey(),
  draftId: varchar("draft_id").notNull(),
  blockType: varchar("block_type").notNull(), // "title" | "heading" | "paragraph"
  content: text("content").notNull(),
  source: varchar("source").notNull(), // "user" | "ai"
  order: integer("order").notNull(),
});

export const insertDraftBlockSchema = createInsertSchema(draftBlocks).omit({
  id: true,
});

export type InsertDraftBlock = z.infer<typeof insertDraftBlockSchema>;
export type DraftBlock = typeof draftBlocks.$inferSelect;
