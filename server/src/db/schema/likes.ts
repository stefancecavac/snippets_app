import { pgTable, uuid } from "drizzle-orm/pg-core";
import { usersTable } from "./users";
import { snippetsTable } from "./snippets";

export const likesTable = pgTable("likes", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("userId")
    .notNull()
    .references(() => usersTable.id),
  snippetId: uuid("snippetId")
    .notNull()
    .references(() => snippetsTable.id),
});
