import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { likesTable } from "../db/schema/likes";
import AppError from "../middlewares/errorHandler";

export const toggleLikeService = async (userId: string, snippetId: string) => {
  try {
    const isLiked = await db
      .select()
      .from(likesTable)
      .where(and(eq(likesTable.userId, userId), eq(likesTable.snippetId, snippetId)));

    if (isLiked.length > 0) {
      const data = await db
        .delete(likesTable)
        .where(and(eq(likesTable.userId, userId), eq(likesTable.snippetId, snippetId)))
        .returning();
      return { liked: false, snippetId: data[0].snippetId };
    } else if (isLiked.length === 0) {
      const data = await db.insert(likesTable).values({ userId: userId, snippetId: snippetId }).returning();
      return { liked: true, snippetId: data[0].snippetId };
    }
  } catch (error) {
    throw new AppError("Database error", 500);
  }
};
