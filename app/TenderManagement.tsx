'use client';

import { useState } from 'react';
import { Upload, Trash2, FileText, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { uploadTenderFile, listTenderFiles, deleteTenderFile, type TenderFile } from './lib/blob';

interface UploadStatus {
  uploading: boolean;
  success: boolean;
  error: string | null;
}

export function TenderManagement() {
  const [files, setFiles] = useState<TenderFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [projectName, setProjectName] = useState('');
  const [uploadedBy, setUploadedBy] = useState('');
  const [purpose, setPurpose] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>({
    uploading: false,
    success: false,
    error: null,
  });
  const [deleteStatus, setDeleteStatus] = useState<{ [key: string]: boolean }>({});

  const isUploadReady = Boolean(startDate && endDate && purpose.trim() && selectedFile && endDate >= startDate);

  const loadFiles = async () => {
    try {
      setLoading(true);
      const tenderFiles = await listTenderFiles();
      setFiles(tenderFiles);
      setHasLoaded(true);
    } catch (error) {
      console.error('Error loading files:', error);
      alert(`Failed to load files: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedFile(file);
    setUploadStatus((current) => ({ ...current, error: null }));
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setUploadStatus({ uploading: false, success: false, error: 'Please select a file to upload' });
      return;
    }

    if (!startDate || !endDate) {
      setUploadStatus({ uploading: false, success: false, error: 'Start and end dates are required' });
      return;
    }

    if (endDate < startDate) {
      setUploadStatus({ uploading: false, success: false, error: 'End date cannot be before start date' });
      return;
    }

    if (!purpose.trim()) {
      setUploadStatus({ uploading: false, success: false, error: 'Purpose is required' });
      return;
    }

    setUploadStatus({ uploading: true, success: false, error: null });

    try {
      await uploadTenderFile(selectedFile, startDate, endDate, projectName, uploadedBy, purpose);
      setUploadStatus({ uploading: false, success: true, error: null });
      setSelectedFile(null);
      setProjectName('');
      setUploadedBy('');
      setPurpose('');

      const fileInput = document.getElementById('file-upload') as HTMLInputElement | null;
      if (fileInput) {
        fileInput.value = '';
      }

      await loadFiles();

      setTimeout(() => {
        setUploadStatus({ uploading: false, success: false, error: null });
      }, 3000);
    } catch (error) {
      setUploadStatus({
        uploading: false,
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed',
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    setDeleteStatus({ ...deleteStatus, [id]: true });

    try {
      await deleteTenderFile(id);
      await loadFiles();
    } catch (error) {
      console.error('Error deleting file:', error);
      alert('Failed to delete file');
    } finally {
      setDeleteStatus({ ...deleteStatus, [id]: false });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="tender-management">
      <div className="tender-management-header">
        <h2>Tender File Management</h2>
      </div>

      <div className="upload-section">
        <div className="date-fields">
          <div className="date-field">
            <label htmlFor="start-date">Submission start date</label>
            <input
              type="date"
              id="start-date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              disabled={uploadStatus.uploading}
              required
            />
          </div>
          <div className="date-field">
            <label htmlFor="end-date">Submission end date</label>
            <input
              type="date"
              id="end-date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
              disabled={uploadStatus.uploading}
              required
            />
          </div>
        </div>

        <div className="meta-fields">
          <div className="date-field">
            <label htmlFor="project-name">Project name</label>
            <input
              type="text"
              id="project-name"
              value={projectName}
              onChange={(event) => setProjectName(event.target.value)}
              disabled={uploadStatus.uploading}
              placeholder="Optional"
            />
          </div>
          <div className="date-field">
            <label htmlFor="uploaded-by">Uploaded by</label>
            <input
              type="text"
              id="uploaded-by"
              value={uploadedBy}
              onChange={(event) => setUploadedBy(event.target.value)}
              disabled={uploadStatus.uploading}
              placeholder="Optional"
            />
          </div>
          <div className="date-field full-width">
            <label htmlFor="purpose">Purpose</label>
            <input
              type="text"
              id="purpose"
              value={purpose}
              onChange={(event) => setPurpose(event.target.value)}
              disabled={uploadStatus.uploading}
              placeholder="Required"
              required
            />
          </div>
        </div>

        <div className="upload-controls">
          <div className="upload-area">
            <input
              type="file"
              id="file-upload"
              onChange={handleFileSelection}
              disabled={uploadStatus.uploading}
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            />
            <label htmlFor="file-upload" className={`upload-label ${selectedFile ? 'selected' : ''}`}>
              <Upload size={24} />
              <span>{selectedFile ? selectedFile.name : 'Choose file to upload'}</span>
              <small>Supports PDF, JPG, PNG, DOC, DOCX</small>
            </label>
          </div>

          <button
            type="button"
            className="submit-upload-button"
            onClick={handleFileUpload}
            disabled={!isUploadReady || uploadStatus.uploading}
          >
            {uploadStatus.uploading ? 'Uploading...' : 'Upload Document'}
          </button>
        </div>

        {uploadStatus.uploading && (
          <div className="status-message uploading">
            <RefreshCw size={16} className="spinning" />
            Uploading file...
          </div>
        )}

        {uploadStatus.success && (
          <div className="status-message success">
            <CheckCircle size={16} />
            File uploaded successfully!
          </div>
        )}

        {uploadStatus.error && (
          <div className="status-message error">
            <AlertCircle size={16} />
            {uploadStatus.error}
          </div>
        )}
      </div>

      <div className="files-section">
        <div className="files-header">
          <h3>Tender Files ({files.length})</h3>
          <button
            className="refresh-button"
            onClick={loadFiles}
            disabled={loading}
          >
            <RefreshCw size={16} className={loading ? 'spinning' : ''} />
            {hasLoaded ? 'Refresh' : 'Load files'}
          </button>
        </div>

        {loading ? (
          <div className="loading-state">
            <RefreshCw size={24} className="spinning" />
            <p>Loading files...</p>
          </div>
        ) : !hasLoaded ? (
          <div className="empty-state">
            <FileText size={48} />
            <p>File list not loaded</p>
            <small>Load the tender files only when you need to manage them</small>
          </div>
        ) : files.length === 0 ? (
          <div className="empty-state">
            <FileText size={48} />
            <p>No tender files uploaded yet</p>
            <small>Upload your first tender document to get started</small>
          </div>
        ) : (
          <div className="files-list">
            {files.map((file) => (
              <div key={file.id} className="file-item">
                <div className="file-info">
                  <FileText size={20} />
                  <div className="file-details">
                    <span className="file-name">{file.fileName}</span>
                    <div className="file-meta">
                      <span>{formatFileSize(file.fileSize)}</span>
                      <span>•</span>
                      <span className="date-range-label">Tender period:</span>
                      <span>{formatDate(file.startDate)} to {formatDate(file.endDate)}</span>
                    </div>
                    {(file.projectName || file.uploadedBy || file.purpose) && (
                      <div className="file-metadata-summary">
                        {file.projectName && (
                          <span className="meta-chip"><strong>Project:</strong> {file.projectName}</span>
                        )}
                        {file.uploadedBy && (
                          <span className="meta-chip"><strong>Uploaded by:</strong> {file.uploadedBy}</span>
                        )}
                        {file.purpose && (
                          <span className="meta-chip"><strong>Purpose:</strong> {file.purpose}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="file-actions">
                  <a
                    href={file.docUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="view-button"
                  >
                    View
                  </a>
                  <button
                    onClick={() => handleDelete(file.id)}
                    disabled={deleteStatus[file.id]}
                    className="delete-button"
                    aria-label="Delete file"
                  >
                    {deleteStatus[file.id] ? (
                      <RefreshCw size={16} className="spinning" />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}