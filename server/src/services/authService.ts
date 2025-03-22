import { eq } from "drizzle-orm";
import { db } from "../db";
import { usersTable } from "../db/schema/users";

export const checkExistingUserService = async (email: string) => {
  const user = await db.select().from(usersTable).where(eq(usersTable.email, email));
  return user[0];
};

export const saveUserToDbService = async ({ email, password }: { email: string; password: string }) => {
  const user = await db.insert(usersTable).values({ email: email, password: password }).returning();
  return user[0];
};

export const getUserByIdService = async (id: string) => {
  const user = await db.select({ email: usersTable.email, id: usersTable.id }).from(usersTable).where(eq(usersTable.id, id));
  return user;
};
