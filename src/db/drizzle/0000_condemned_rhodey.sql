CREATE TABLE "chats" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar DEFAULT 'Untitled Chat' NOT NULL,
	"last_active_date" timestamp DEFAULT now() NOT NULL
);
