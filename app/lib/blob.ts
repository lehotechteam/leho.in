export interface TenderFile {
  id: string;
  startDate: string;
  endDate: string;
  projectName?: string | null;
  uploadedBy?: string | null;
  purpose?: string | null;
  docUrl: string;
  fileName: string;
  fileSize: number;
  uploadedAt: string;
  contentType: string;
}

export async function uploadTenderFile(
  file: File,
  startDate: string,
  endDate: string,
  projectName?: string | null,
  uploadedBy?: string | null,
  purpose?: string | null,
): Promise<TenderFile> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('startDate', startDate);
  formData.append('endDate', endDate);
  formData.append('projectName', projectName ?? '');
  formData.append('uploadedBy', uploadedBy ?? '');
  formData.append('purpose', purpose ?? '');

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Upload failed');
  }

  const { tender } = await response.json();
  return tender;
}

export async function listTenderFiles(): Promise<TenderFile[]> {
  try {
    const response = await fetch('/api/files');
    
    if (!response.ok) {
      throw new Error('Failed to list files');
    }

    const { tenders } = await response.json();
    return tenders;
  } catch (error) {
    console.error('Error in listTenderFiles:', error);
    throw error;
  }
}

export async function deleteTenderFile(id: string): Promise<void> {
  const response = await fetch('/api/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    throw new Error('Delete failed');
  }
}