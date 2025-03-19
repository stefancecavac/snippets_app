import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const snippetsTable = pgTable("snippets", {
  id: uuid("id").primaryKey().defaultRandom(),
  code: text("code").notNull(),
});
