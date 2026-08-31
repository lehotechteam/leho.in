CREATE TABLE "tenders" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"start_date" text NOT NULL,
	"end_date" text NOT NULL,
	"doc_url" text NOT NULL,
	"blob_pathname" text NOT NULL,
	"file_name" text NOT NULL,
	"content_type" text NOT NULL,
	"file_size" integer NOT NULL,
	"uploaded_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "tenders_blob_pathname_unique" UNIQUE("blob_pathname")
);
--> statement-breakpoint
CREATE INDEX "tenders_start_date_id_idx" ON "tenders" USING btree ("start_date","id");