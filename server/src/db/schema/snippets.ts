import { integer, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { z } from "zod";
import { usersTable } from "./users";

export const snippetsTable = pgTable("snippets", {
  id: uuid("id").primaryKey().defaultRandom(),
  language: varchar("language", { length: 255 }).notNull(),
  likes: integer("likes").notNull().default(0),
  snippetName: varchar("snippet_name", { length: 255 }).notNull(),
  snippetDescription: varchar("snippet_description").notNull(),
  code: text("code").notNull(),

  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id),
});

export const snippetSchema = z.object({
  id: z.string().uuid({ message: "Invalid snippet ID format" }),
  language: z
    .string({ message: "Language is required" })
    .min(1, { message: "Language is required" })
    .max(255, { message: "Language name should not exceed 255 characters" }),
  likes: z.number().int().min(0, { message: "Likes cannot be negative" }).default(0),
  snippetName: z
    .string({ message: "Snippet name is required" })
    .min(1, { message: "Snippet name is required" })
    .max(255, { message: "Snippet name should not exceed 255 characters" }),
  snippetDescription: z
    .string({ message: "Snippet description is required" })
    .min(1, { message: "Snippet description is required" })
    .max(500, { message: "Snippet description should not exceed 500 characters" }),
  code: z
    .string({
      message: "Code is required",
    })
    .min(1, { message: "Code field must not be empty" }),

  userId: z.string(),
});
