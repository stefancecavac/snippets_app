import { eq, sql } from "drizzle-orm";
import { db } from "../db";
import { usersTable } from "../db/schema/users";
import AppError from "../middlewares/errorHandler";
import { likesTable } from "../db/schema/likes";

export const getUserByEmailService = async (email: string) => {
  try {
    const user = await db.select().from(usersTable).where(eq(usersTable.email, email));
    return user[0] || null;
  } catch (error) {
    throw new AppError("Database error", 500);
  }
};

export const createUserService = async ({ email, password }: { email: string; password: string }) => {
  try {
    const user = await db.insert(usersTable).values({ email: email, password: password }).returning();
    return user[0];
  } catch (error) {
    throw new AppError("Database error", 500);
  }
};

export const getUserByIdService = async (id: string) => {
  try {
    const userData = await db
      .select({ id: usersTable.id, email: usersTable.email, snippetId: likesTable.snippetId })
      .from(usersTable)
      .where(eq(usersTable.id, id))
      .leftJoin(likesTable, eq(likesTable.userId, usersTable.id));

    const likes = userData.map((like) => like.snippetId);

    return {
      id: userData[0].id,
      email: userData[0].email,
      likes: likes,
    };
  } catch (error) {
    throw new AppError("Database error", 500);
  }
};
