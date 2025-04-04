import { eq, sql } from "drizzle-orm";
import { db } from "../db";
import { usersTable } from "../db/schema/users";
import AppError from "../middlewares/errorHandler";

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
    const userData = await db.select({ id: usersTable.id, email: usersTable.email }).from(usersTable).where(eq(usersTable.id, id));

    return userData[0];
  } catch (error) {
    throw new AppError("Database error", 500);
  }
};
