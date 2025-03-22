import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { z } from "zod";

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  password: varchar("password", { length: 60 }).notNull(),
});

export const usersSchema = z.object({
  id: z.string().uuid({ message: "Invalid snippet ID format" }),
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Not a valid email" })
    .max(255, { message: "Language name should not exceed 255 characters" }),
  password: z
    .string({ message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[\W_]/, { message: "Password must contain at least one special character" })
    .max(60, { message: "Password must be a maximum of 60 characters long" }),
});
