import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const tagsTable = pgTable("tags", {
  id: uuid("id").primaryKey().defaultRandom(),
  tagName: varchar("tag_name", { length: 255 }).notNull().unique(),
});
