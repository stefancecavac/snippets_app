import { z } from "zod";

export const snippetSchema = z.object({
  id: z.string().uuid({ message: "Invalid snippet ID format" }),
  language: z
    .string({ message: "Language is required" })
    .min(1, { message: "Language is required" })
    .max(255, { message: "Language name should not exceed 255 characters" }),
  likes: z.number().int().min(0, { message: "Likes cannot be negative" }).default(0),
  snippetName: z
    .string({ message: "Snippet name is required" })
    .min(1, { message: "Snippet name is required" })
    .max(255, { message: "Snippet name should not exceed 255 characters" }),
  snippetDescription: z
    .string({ message: "Snippet description is required" })
    .min(1, { message: "Snippet description is required" })
    .max(500, { message: "Snippet description should not exceed 500 characters" }),
  code: z
    .string({
      message: "Code is required",
    })
    .min(1, { message: "Code field must not be empty" })
    .max(5000, { message: "Code should not exceed 5000 characters" }),
  user: z.object({ id: z.string(), email: z.string() }),
  tags: z.array(z.string() || null),
});

export type snippetData = z.infer<typeof snippetSchema>;

export const createSnippetSchema = z.object({
  language: z
    .string({ message: "Language is required" })
    .min(1, { message: "Language is required" })
    .max(255, { message: "Language name should not exceed 255 characters" }),
  snippetName: z
    .string({ message: "Snippet name is required" })
    .min(1, { message: "Snippet name is required" })
    .max(255, { message: "Snippet name should not exceed 255 characters" }),
  snippetDescription: z
    .string({ message: "Snippet description is required" })
    .min(1, { message: "Snippet description is required" })
    .max(500, { message: "Snippet description should not exceed 500 characters" }),
  code: z
    .string({
      message: "Code is required",
    })
    .min(1, { message: "Code field must not be empty" })
    .max(5000, { message: "Code should not exceed 5000 characters" }),
});

export type createSnippetData = z.infer<typeof createSnippetSchema>;

export const usersSchema = z.object({
  id: z.string().uuid({ message: "Invalid snippet ID format" }),
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Not a valid email" })
    .max(255, { message: "Language name should not exceed 255 characters" }),
  likes: z.array(z.string()),
});

export type userData = z.infer<typeof usersSchema>;

export const createUserSchema = z.object({
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

export type createUserData = z.infer<typeof createUserSchema>;
