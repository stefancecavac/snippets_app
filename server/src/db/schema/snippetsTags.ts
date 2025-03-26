import { pgTable, uuid } from "drizzle-orm/pg-core";
import { snippetsTable } from "./snippets";
import { tagsTable } from "./tags";

export const snippetsTagsTable = pgTable("snippets_tags", {
  snippetId: uuid("snippet_id")
    .notNull()
    .references(() => snippetsTable.id, { onDelete: "cascade" }),

  tagId: uuid("tag_id")
    .notNull()
    .references(() => tagsTable.id, { onDelete: "cascade" }),
});
