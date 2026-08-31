import { NextRequest, NextResponse } from 'next/server';
import { del, put } from '@vercel/blob';
import { revalidateTag } from 'next/cache';
import { customAlphabet } from 'nanoid';
import { db } from '../../lib/db';
import { tenders } from '../../lib/schema';

const createTenderId = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 12);
const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;

function isValidDate(value: string) {
  if (!isoDatePattern.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const startDate = formData.get('startDate');
    const endDate = formData.get('endDate');
    const projectName = formData.get('projectName');
    const uploadedBy = formData.get('uploadedBy');
    const purpose = formData.get('purpose');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (typeof startDate !== 'string' || typeof endDate !== 'string' ||
      !isValidDate(startDate) || !isValidDate(endDate)) {
      return NextResponse.json({ error: 'Valid start and end dates are required' }, { status: 400 });
    }

    if (endDate < startDate) {
      return NextResponse.json({ error: 'End date cannot be before start date' }, { status: 400 });
    }

    if (typeof purpose !== 'string' || !purpose.trim()) {
      return NextResponse.json({ error: 'Purpose is required' }, { status: 400 });
    }

    const normalizedProjectName = typeof projectName === 'string' ? projectName.trim() || null : null;
    const normalizedUploadedBy = typeof uploadedBy === 'string' ? uploadedBy.trim() || null : null;
    const normalizedPurpose = purpose.trim();

    const blob = await put(file.name, file, {
      access: 'public',
    });

    try {
      const [tender] = await db.insert(tenders).values({
        id: createTenderId(),
        startDate,
        endDate,
        projectName: normalizedProjectName,
        uploadedBy: normalizedUploadedBy,
        purpose: normalizedPurpose,
        docUrl: blob.url,
        blobPathname: blob.pathname,
        fileName: file.name,
        contentType: file.type || 'application/octet-stream',
        fileSize: file.size,
        uploadedAt: new Date(),
      }).returning();

      revalidateTag('tender-files', 'max');
      return NextResponse.json({ tender });
    } catch (error) {
      await del(blob.url).catch((cleanupError) => {
        console.error('Blob cleanup error:', cleanupError);
      });
      throw error;
    }
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}
