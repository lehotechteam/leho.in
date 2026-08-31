import { NextRequest, NextResponse } from 'next/server';
import { del } from '@vercel/blob';
import { revalidateTag } from 'next/cache';
import { eq } from 'drizzle-orm';
import { db } from '../../lib/db';
import { tenders } from '../../lib/schema';

export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json();
    
    if (typeof id !== 'string' || !id) {
      return NextResponse.json({ error: 'No tender ID provided' }, { status: 400 });
    }

    const [tender] = await db.select({
      blobPathname: tenders.blobPathname,
    }).from(tenders).where(eq(tenders.id, id)).limit(1);

    if (!tender) {
      return NextResponse.json({ error: 'Tender not found' }, { status: 404 });
    }

    await del(tender.blobPathname);
    await db.delete(tenders).where(eq(tenders.id, id));
    revalidateTag('tender-files', 'max');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Delete failed' },
      { status: 500 }
    );
  }
}
