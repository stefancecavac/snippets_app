import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { z } from "zod";

export const snippetsTable = pgTable("snippets", {
  id: uuid("id").primaryKey().defaultRandom(),
  code: text("code").notNull(),
});

export const snippetSchema = z.object({
  id: z.string().uuid({ message: "Invalid snippet ID format" }),
  code: z.string().min(1, { message: "Code field must not be empty" }),
});
