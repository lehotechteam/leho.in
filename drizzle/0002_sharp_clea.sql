DROP INDEX "tenders_start_date_id_idx";--> statement-breakpoint
CREATE INDEX "tenders_start_date_id_idx" ON "tenders" USING btree ("start_date" desc,"id" asc);