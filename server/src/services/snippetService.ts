import { drizzle } from "drizzle-orm/node-postgres";
import { snippetsTable } from "../db/schema/snippets";
import { db } from "../db";

export const snippetService = async () => {
  const snippets = await db.select().from(snippetsTable);
  return snippets;
};
