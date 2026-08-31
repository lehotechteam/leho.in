import { asc, desc } from 'drizzle-orm';
import { date, index, integer, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const tenders = pgTable(
  'tenders',
  {
    id: varchar('id', { length: 21 }).primaryKey(),
    startDate: date('start_date', { mode: 'string' }).notNull(),
    endDate: date('end_date', { mode: 'string' }).notNull(),
    projectName: text('project_name'),
    uploadedBy: text('uploaded_by'),
    purpose: text('purpose'),
    docUrl: text('doc_url').notNull(),
    blobPathname: text('blob_pathname').notNull().unique(),
    fileName: text('file_name').notNull(),
    contentType: text('content_type').notNull(),
    fileSize: integer('file_size').notNull(),
    uploadedAt: timestamp('uploaded_at', { withTimezone: true }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [index('tenders_start_date_id_idx').on(desc(table.startDate), asc(table.id))],
);

export type Tender = typeof tenders.$inferSelect;
export type NewTender = typeof tenders.$inferInsert;
