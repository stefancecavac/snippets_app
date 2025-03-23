import { snippetsTable } from "../db/schema/snippets";
import { db } from "../db";
import { eq } from "drizzle-orm";
import AppError from "../middlewares/errorHandler";

export const getAllSnippetService = async () => {
  try {
    const snippets = await db.select().from(snippetsTable);
    return snippets;
  } catch (error) {
    throw new AppError("Database error", 500);
  }
};

export const getSnippetByIdService = async (id: string) => {
  try {
    const snippets = await db.select().from(snippetsTable).where(eq(snippetsTable.id, id));
    return snippets;
  } catch (error) {
    throw new AppError("Database error", 500);
  }
};

export const createSnippetService = async ({
  code,
  language,
  snippetName,
  snippetDescription,
  userId,
}: {
  code: string;
  language: string;
  snippetName: string;
  snippetDescription: string;
  userId: string;
}) => {
  try {
    const snippet = await db.insert(snippetsTable).values({ code, language, snippetName, snippetDescription, userId }).returning();
    return snippet;
  } catch (error) {
    throw new AppError("Database error", 500);
  }
};

export const deleteSnippetByIdService = async (id: string) => {
  try {
    const snippet = await db.delete(snippetsTable).where(eq(snippetsTable.id, id)).returning();
    return snippet;
  } catch (error) {
    throw new AppError("Database error", 500);
  }
};
