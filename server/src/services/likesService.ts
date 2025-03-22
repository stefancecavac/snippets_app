import { eq } from "drizzle-orm";
import { db } from "../db";
import { snippetsTable } from "../db/schema/snippets";

export const toggleLikeService = async (id: string) => {
  const toggleLike = await db.update(snippetsTable).set({ likes: +1 }).where(eq(snippetsTable.id, id));
};
