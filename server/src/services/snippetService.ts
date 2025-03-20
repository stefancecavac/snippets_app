import { snippetsTable } from "../db/schema/snippets";
import { db } from "../db";
import { eq } from "drizzle-orm";

export const getAllSnippetService = async () => {
  const snippets = await db.select().from(snippetsTable);
  return snippets;
};

export const getSingleSnippetService = async (id: string) => {
  const snippets = await db.select().from(snippetsTable).where(eq(snippetsTable.id, id));
  return snippets;
};

export const postSnippetService = async ({
  code,
  language,
  snippetName,
  snippetDescription,
}: {
  code: string;
  language: string;
  snippetName: string;
  snippetDescription: string;
}) => {
  const snippet = await db
    .insert(snippetsTable)
    .values({ code: code, language: language, snippetName: snippetName, snippetDescription: snippetDescription })
    .returning();
  return snippet;
};

export const deleteSnippetService = async (id: string) => {
  const snippet = await db.delete(snippetsTable).where(eq(snippetsTable.id, id)).returning();
  return snippet;
};
