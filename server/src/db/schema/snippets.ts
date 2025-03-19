import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { z } from "zod";

export const snippetsTable = pgTable("snippets", {
  id: uuid("id").primaryKey().defaultRandom(),
  code: text("code").notNull(),
});

export const insertSnippetSchema = z.object({
  code: z.string().min(1, { message: "Code field must not be empty" }),
});

export const deleteSnippetSchema = z.object({
  id: z.string().uuid({ message: "Invalid snippet ID format" }),
});
