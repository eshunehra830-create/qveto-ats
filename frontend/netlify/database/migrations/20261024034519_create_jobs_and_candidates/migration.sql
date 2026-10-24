CREATE TABLE "candidates" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"email" text NOT NULL UNIQUE,
	"phone" text DEFAULT '' NOT NULL,
	"stage" text DEFAULT 'Applied' NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "jobs" (
	"id" serial PRIMARY KEY,
	"title" text NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"department" text DEFAULT '' NOT NULL,
	"location" text DEFAULT '' NOT NULL,
	"status" text DEFAULT 'Open' NOT NULL,
	"created_at" timestamp DEFAULT now()
);
