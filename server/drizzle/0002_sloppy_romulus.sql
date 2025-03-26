CREATE TABLE "snippets_tags" (
	"snippet_id" uuid NOT NULL,
	"tag_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tag_name" varchar(255) NOT NULL,
	CONSTRAINT "tags_tag_name_unique" UNIQUE("tag_name")
);
--> statement-breakpoint
ALTER TABLE "snippets_tags" ADD CONSTRAINT "snippets_tags_snippet_id_snippets_id_fk" FOREIGN KEY ("snippet_id") REFERENCES "public"."snippets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "snippets_tags" ADD CONSTRAINT "snippets_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;