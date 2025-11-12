import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import MainHeader from '../../components/ui/MainHeader';
import WorkflowProgress from '../../components/ui/WorkflowProgress';
import FileUploadZone from './components/FileUploadZone';
import FilePreviewGrid from './components/FilePreviewGrid';
import UploadProgress from './components/UploadProgress';
import ProcessingActions from './components/ProcessingActions';
import Icon from '../../components/AppIcon';

const FileUploadWorkspace = () => {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadErrors, setUploadErrors] = useState([]);

  // Mock user authentication state
  const [isAuthenticated] = useState(true);

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  const generateFileId = () => {
    return Date.now()?.toString(36) + Math.random()?.toString(36)?.substr(2);
  };

  const createFileObject = (file) => {
    return {
      id: generateFileId(),
      name: file?.name,
      size: file?.size,
      type: file?.type,
      preview: file?.type?.startsWith('image/') ? URL.createObjectURL(file) : null,
      status: 'pending',
      progress: 0,
      error: null,
      file: file
    };
  };

  const simulateUpload = async (fileObj) => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          
          // Simulate occasional upload failures (10% chance)
          const shouldFail = Math.random() < 0.1;
          
          setFiles(prev => prev.map(f => 
            f.id === fileObj.id 
              ? { 
                  ...f, 
                  status: shouldFail ? 'error' : 'uploaded',
                  progress: 100,
                  error: shouldFail ? '네트워크 오류로 업로드에 실패했습니다.' : null
                }
              : f
          ));
          
          resolve(!shouldFail);
        } else {
          setFiles(prev => prev.map(f => 
            f.id === fileObj.id ? { ...f, progress, status: 'uploading' } : f
          ));
        }
      }, 200);
    });
  };

  const handleFilesSelected = async (selectedFiles, errors = []) => {
    if (errors?.length > 0) {
      setUploadErrors(errors);
      return;
    }

    setUploadErrors([]);
    
    // Create file objects
    const newFiles = selectedFiles?.map(createFileObject);
    
    // Add files to state
    setFiles(prev => [...prev, ...newFiles]);
    
    // Start uploading
    setIsUploading(true);
    
    // Upload files sequentially
    for (const fileObj of newFiles) {
      await simulateUpload(fileObj);
    }
    
    setIsUploading(false);
  };

  const handleRemoveFile = (fileId) => {
    setFiles(prev => {
      const fileToRemove = prev?.find(f => f?.id === fileId);
      if (fileToRemove && fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove?.preview);
      }
      return prev?.filter(f => f?.id !== fileId);
    });
  };

  const handleRetryUpload = async (fileId) => {
    const fileObj = files?.find(f => f?.id === fileId);
    if (!fileObj) return;

    setFiles(prev => prev?.map(f => 
      f?.id === fileId 
        ? { ...f, status: 'pending', progress: 0, error: null }
        : f
    ));

    setIsUploading(true);
    await simulateUpload(fileObj);
    setIsUploading(false);
  };

  const handleRetryFailed = async () => {
    const failedFiles = files?.filter(f => f?.status === 'error');
    if (failedFiles?.length === 0) return;

    setIsUploading(true);
    
    for (const fileObj of failedFiles) {
      setFiles(prev => prev?.map(f => 
        f?.id === fileObj?.id 
          ? { ...f, status: 'pending', progress: 0, error: null }
          : f
      ));
      await simulateUpload(fileObj);
    }
    
    setIsUploading(false);
  };

  const handleClearAll = () => {
    // Revoke object URLs to prevent memory leaks
    files?.forEach(file => {
      if (file?.preview) {
        URL.revokeObjectURL(file?.preview);
      }
    });
    
    setFiles([]);
    setUploadErrors([]);
  };

  const handleAddMoreFiles = () => {
    // Trigger file selection (this would typically open file dialog)
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = '.jpg,.jpeg,.png,.svg';
    input.onchange = (e) => {
      const selectedFiles = Array.from(e?.target?.files);
      if (selectedFiles?.length > 0) {
        handleFilesSelected(selectedFiles);
      }
    };
    input?.click();
  };

  const handleStartProcessing = () => {
    // This will be handled by ProcessingActions component navigation
    console.log('Starting AI processing for files:', files?.filter(f => f?.status === 'uploaded'));
  };

  // Calculate statistics
  const totalFiles = files?.length;
  const uploadedFiles = files?.filter(f => f?.status === 'uploaded')?.length;
  const failedFiles = files?.filter(f => f?.status === 'error')?.length;

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      files?.forEach(file => {
        if (file?.preview) {
          URL.revokeObjectURL(file?.preview);
        }
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>파일 업로드 - PrintForge AI</title>
        <meta name="description" content="2D 이미지를 업로드하여 AI 기반 3D 모델 생성을 시작하세요. JPG, PNG, SVG 파일을 지원합니다." />
      </Helmet>
      {/* Header */}
      <MainHeader isAuthenticated={isAuthenticated} onAuthClick={() => {}} />
      {/* Workflow Progress */}
      <WorkflowProgress currentStep="upload" onStepClick={() => {}} />
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Upload" size={32} className="text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            파일 업로드
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            2D 이미지나 스케치를 업로드하여 AI 기반 3D 모델 생성을 시작하세요.
            JPG, PNG, SVG 형식을 지원합니다.
          </p>
        </div>

        {/* Upload Errors */}
        {uploadErrors?.length > 0 && (
          <div className="mb-6">
            <div className="bg-error/10 border border-error/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="AlertTriangle" size={20} className="text-error mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-error mb-2">
                    업로드 오류가 발생했습니다
                  </h3>
                  <ul className="text-xs text-error space-y-1">
                    {uploadErrors?.map((error, index) => (
                      <li key={index}>
                        • {error?.file}: {error?.error}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Upload Zone */}
          <div className="lg:col-span-2 space-y-6">
            {/* File Upload Zone */}
            <FileUploadZone
              onFilesSelected={handleFilesSelected}
              acceptedFiles={files}
              isUploading={isUploading}
            />

            {/* File Preview Grid */}
            {files?.length > 0 && (
              <FilePreviewGrid
                files={files}
                onRemoveFile={handleRemoveFile}
                onRetryUpload={handleRetryUpload}
              />
            )}
          </div>

          {/* Right Column - Progress & Actions */}
          <div className="space-y-6">
            {/* Upload Progress */}
            <UploadProgress
              totalFiles={totalFiles}
              uploadedFiles={uploadedFiles}
              failedFiles={failedFiles}
              isUploading={isUploading}
              onRetryFailed={handleRetryFailed}
              onClearAll={handleClearAll}
            />

            {/* Processing Actions */}
            <ProcessingActions
              uploadedFiles={uploadedFiles}
              totalFiles={totalFiles}
              isUploading={isUploading}
              onStartProcessing={handleStartProcessing}
              onAddMoreFiles={handleAddMoreFiles}
            />
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-12 bg-muted/30 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
            <Icon name="HelpCircle" size={20} className="mr-2" />
            도움말
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-foreground mb-2">
                지원되는 파일 형식
              </h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• JPG/JPEG - 사진 및 복잡한 이미지</li>
                <li>• PNG - 투명 배경이 있는 이미지</li>
                <li>• SVG - 벡터 그래픽 및 스케치</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-foreground mb-2">
                최적화 팁
              </h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 배경이 단순한 이미지 사용</li>
                <li>• 고해상도 이미지 권장</li>
                <li>• 여러 각도의 이미지 제공</li>
                <li>• 명확한 윤곽선이 있는 객체</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FileUploadWorkspace;