import { snippetsTable } from "../db/schema/snippets";
import { db } from "../db";
import AppError from "../middlewares/errorHandler";
import { usersTable } from "../db/schema/users";
import { likesTable } from "../db/schema/likes";
import { count, eq, ilike, or } from "drizzle-orm";

export const getAllSnippetService = async ({ q }: { q: string }) => {
  try {
    const snippets = await db
      .select({
        id: snippetsTable.id,
        snippetName: snippetsTable.snippetName,
        snippetDescription: snippetsTable.snippetDescription,
        code: snippetsTable.code,
        language: snippetsTable.language,
        user: { id: usersTable.id, email: usersTable.email },
        likes: count(likesTable.snippetId),
      })
      .from(snippetsTable)
      .leftJoin(usersTable, eq(snippetsTable.userId, usersTable.id))
      .leftJoin(likesTable, eq(likesTable.snippetId, snippetsTable.id))
      .groupBy(snippetsTable.id, usersTable.id)
      .where(q ? or(ilike(snippetsTable.snippetName, `%${q}%`), ilike(snippetsTable.language, `%${q}%`)) : undefined);

    return snippets;
  } catch (error) {
    throw new AppError("Database error", 500);
  }
};

export const getAllSnippetsByUserId = async (userId: string) => {
  try {
    const snippets = await db
      .select({
        id: snippetsTable.id,
        snippetName: snippetsTable.snippetName,
        snippetDescription: snippetsTable.snippetDescription,
        code: snippetsTable.code,
        language: snippetsTable.language,
        user: { id: usersTable.id, email: usersTable.email },
      })
      .from(snippetsTable)
      .where(eq(snippetsTable.id, userId))
      .fullJoin(usersTable, eq(snippetsTable.userId, usersTable.id));
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
