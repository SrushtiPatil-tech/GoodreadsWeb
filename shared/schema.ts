import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User table with added fields for reading preferences
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  displayName: text("display_name"),
  email: text("email"),
  bio: text("bio"),
  isKidsModeEnabled: boolean("is_kids_mode_enabled").default(false),
  parentalControlLevel: text("parental_control_level").default("moderate"),
  readingSpeedWpm: integer("reading_speed_wpm"),
});

// Books table
export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  coverUrl: text("cover_url"),
  description: text("description"),
  pageCount: integer("page_count"),
  publicationYear: integer("publication_year"),
  genre: text("genre"),
  isKidFriendly: boolean("is_kid_friendly").default(false),
  hasAudiobook: boolean("has_audiobook").default(false),
  audiobookUrl: text("audiobook_url"),
  readingLevel: text("reading_level"),
  isBedtimeStory: boolean("is_bedtime_story").default(false),
  isFiveMinuteStory: boolean("is_five_minute_story").default(false),
});

// Reading Progress table
export const readingProgress = pgTable("reading_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  bookId: integer("book_id").notNull(),
  currentPage: integer("current_page").default(0),
  startDate: text("start_date"),
  lastReadDate: text("last_read_date"),
  isCompleted: boolean("is_completed").default(false),
});

// User Subscription table
export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  tier: text("tier").notNull(), // basic, standard, premium
  startDate: text("start_date").notNull(),
  endDate: text("end_date").notNull(),
  isActive: boolean("is_active").default(true),
});

// Schema validators
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  displayName: true,
  email: true,
  bio: true,
  isKidsModeEnabled: true,
  parentalControlLevel: true,
  readingSpeedWpm: true,
});

export const insertBookSchema = createInsertSchema(books);
export const insertReadingProgressSchema = createInsertSchema(readingProgress);
export const insertSubscriptionSchema = createInsertSchema(subscriptions);

// Type definitions
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertBook = z.infer<typeof insertBookSchema>;
export type Book = typeof books.$inferSelect;

export type InsertReadingProgress = z.infer<typeof insertReadingProgressSchema>;
export type ReadingProgress = typeof readingProgress.$inferSelect;

export type InsertSubscription = z.infer<typeof insertSubscriptionSchema>;
export type Subscription = typeof subscriptions.$inferSelect;
