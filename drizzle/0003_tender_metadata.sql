ALTER TABLE "tenders"
  ADD COLUMN IF NOT EXISTS "project_name" text,
  ADD COLUMN IF NOT EXISTS "uploaded_by" text,
  ADD COLUMN IF NOT EXISTS "purpose" text;

UPDATE "tenders"
SET "project_name" = "agency_name"
WHERE "project_name" IS NULL
  AND "agency_name" IS NOT NULL;

ALTER TABLE "tenders"
  DROP COLUMN IF EXISTS "agency_name";
