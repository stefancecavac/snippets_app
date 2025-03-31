import { snippetsTable } from "../db/schema/snippets";
import { db } from "../db";
import AppError from "../middlewares/errorHandler";
import { usersTable } from "../db/schema/users";
import { and, desc, eq, ilike, inArray, or, sql } from "drizzle-orm";
import { snippetsTagsTable } from "../db/schema/snippetsTags";
import { tagsTable } from "../db/schema/tags";

export const getAllSnippetService = async ({ q, page }: { q: string; page: number }) => {
  try {
    const limit = 8;
    const offset = (page - 1) * limit;

    const keywords = q ? q.split(" ").filter(Boolean) : [];

    const matchingSnippetIds = db
      .select({ snippetId: snippetsTagsTable.snippetId })
      .from(snippetsTagsTable)
      .leftJoin(tagsTable, eq(tagsTable.id, snippetsTagsTable.tagId))
      .where(or(...keywords.map((key) => ilike(tagsTable.tagName, `%${key}%`))));

    const searchCondition =
      keywords.length > 1
        ? and(
            ...keywords.map((key) =>
              or(
                ilike(snippetsTable.snippetName, `%${key}%`),
                ilike(snippetsTable.language, `%${key}%`),
                inArray(snippetsTable.id, matchingSnippetIds)
              )
            )
          )
        : keywords.length === 1
        ? or(
            ilike(snippetsTable.snippetName, `%${keywords[0]}%`),
            ilike(snippetsTable.language, `%${keywords[0]}%`),
            inArray(snippetsTable.id, matchingSnippetIds)
          )
        : undefined;

    const snippets = await db
      .select({
        id: snippetsTable.id,
        snippetName: snippetsTable.snippetName,
        snippetDescription: snippetsTable.snippetDescription,
        code: snippetsTable.code,
        language: snippetsTable.language,
        user: { id: usersTable.id, email: usersTable.email },
        tags: sql<string>`ARRAY_AGG(DISTINCT ${tagsTable.tagName})`,
      })
      .from(snippetsTable)
      .leftJoin(usersTable, eq(snippetsTable.userId, usersTable.id))
      .leftJoin(snippetsTagsTable, eq(snippetsTagsTable.snippetId, snippetsTable.id))
      .leftJoin(tagsTable, eq(tagsTable.id, snippetsTagsTable.tagId))
      .where(searchCondition)
      .groupBy(snippetsTable.id, usersTable.id)
      .limit(limit)
      .offset(offset);

    const totalCountQuery = db
      .select({ count: sql<number>`COUNT(*)` })
      .from(snippetsTable)
      .where(searchCondition)
      .leftJoin(snippetsTagsTable, eq(snippetsTagsTable.snippetId, snippetsTable.id))
      .leftJoin(tagsTable, eq(tagsTable.id, snippetsTagsTable.tagId));

    const totalCount = (await totalCountQuery)[0].count;
    const hasNextPage = page * limit < totalCount;

    return { snippets, hasNextPage };
  } catch (error) {
    console.log(error);
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
  tags,
}: {
  code: string;
  language: string;
  snippetName: string;
  snippetDescription: string;
  userId: string;
  tags: [];
}) => {
  try {
    const snippet = await db.insert(snippetsTable).values({ code, language, snippetName, snippetDescription, userId }).returning();

    if (tags.length > 0) {
      const tagNames = tags.map((tag) => tag);
      const existingTags = await db.select().from(tagsTable).where(inArray(tagsTable.tagName, tagNames));
      const existingTagNames = new Set(existingTags.map((etag) => etag.tagName));

      const newTags = tagNames.filter((tag) => !existingTagNames.has(tag));

      if (newTags.length > 0) {
        await db
          .insert(tagsTable)
          .values(newTags.map((tag) => ({ tagName: tag })))
          .returning();
      }

      const allTags = await db.select().from(tagsTable).where(inArray(tagsTable.tagName, tagNames));

      await db.insert(snippetsTagsTable).values(allTags.map((tag) => ({ snippetId: snippet[0].id, tagId: tag.id })));
    }

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
