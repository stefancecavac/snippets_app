import { snippetsTable } from "../db/schema/snippets";
import { db } from "../db";
import { eq } from "drizzle-orm";

export const getSnippetService = async () => {
  const snippets = await db.select().from(snippetsTable);
  return snippets;
};

export const postSnippetService = async (code: string) => {
  const snippet = await db.insert(snippetsTable).values({ code: code }).returning();
  return snippet;
};

export const deleteSnippetService = async (id: string) => {
  const snippet = await db.delete(snippetsTable).where(eq(snippetsTable.id, id)).returning();
  return snippet;
};
