import { NextResponse } from 'next/server';
import { desc, asc } from 'drizzle-orm';
import { db } from '../../lib/db';
import { tenders } from '../../lib/schema';

export async function GET() {
  try {
    const tenderFiles = await db
      .select({
        id: tenders.id,
        startDate: tenders.startDate,
        endDate: tenders.endDate,
        projectName: tenders.projectName,
        uploadedBy: tenders.uploadedBy,
        purpose: tenders.purpose,
        docUrl: tenders.docUrl,
        fileName: tenders.fileName,
        contentType: tenders.contentType,
        fileSize: tenders.fileSize,
        uploadedAt: tenders.uploadedAt,
      })
      .from(tenders)
      .orderBy(desc(tenders.startDate), asc(tenders.id));

    return NextResponse.json({ tenders: tenderFiles });
  } catch (error) {
    console.error('List error:', error);
    return NextResponse.json(
      { error: 'Failed to list files' },
      { status: 500 }
    );
  }
}
