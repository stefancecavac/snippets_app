ALTER TABLE "snippets" ADD COLUMN "language" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "snippets" ADD COLUMN "likes" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "snippets" ADD COLUMN "snippet_name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "snippets" ADD COLUMN "snippet_description" varchar NOT NULL;