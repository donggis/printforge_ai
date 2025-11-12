import React, { useState, useCallback } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FileUploadZone = ({ onFilesSelected, acceptedFiles, isUploading }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);

  const acceptedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];
  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const validateFile = (file) => {
    if (!acceptedFormats?.includes(file?.type)) {
      return { valid: false, error: '지원되지 않는 파일 형식입니다. JPG, PNG, SVG 파일만 업로드 가능합니다.' };
    }
    if (file?.size > maxFileSize) {
      return { valid: false, error: '파일 크기가 너무 큽니다. 10MB 이하의 파일만 업로드 가능합니다.' };
    }
    return { valid: true };
  };

  const handleFiles = useCallback((files) => {
    const fileArray = Array.from(files);
    const validFiles = [];
    const errors = [];

    fileArray?.forEach(file => {
      const validation = validateFile(file);
      if (validation?.valid) {
        validFiles?.push(file);
      } else {
        errors?.push({ file: file?.name, error: validation?.error });
      }
    });

    if (validFiles?.length > 0 || errors?.length > 0) {
      onFilesSelected(validFiles, errors);
    }
  }, [onFilesSelected]);

  const handleDragEnter = useCallback((e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragCounter(prev => prev + 1);
    if (e?.dataTransfer?.items && e?.dataTransfer?.items?.length > 0) {
      setIsDragOver(true);
    }
  }, []);

  const handleDragLeave = useCallback((e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragCounter(prev => {
      const newCounter = prev - 1;
      if (newCounter === 0) {
        setIsDragOver(false);
      }
      return newCounter;
    });
  }, []);

  const handleDragOver = useCallback((e) => {
    e?.preventDefault();
    e?.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsDragOver(false);
    setDragCounter(0);

    const files = e?.dataTransfer?.files;
    if (files && files?.length > 0) {
      handleFiles(files);
    }
  }, [handleFiles]);

  const handleFileInput = useCallback((e) => {
    const files = e?.target?.files;
    if (files && files?.length > 0) {
      handleFiles(files);
    }
    // Reset input value to allow same file selection
    e.target.value = '';
  }, [handleFiles]);

  const openFileDialog = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = '.jpg,.jpeg,.png,.svg';
    input.onchange = handleFileInput;
    input?.click();
  };

  return (
    <div className="w-full">
      {/* Main Upload Zone */}
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-8 sm:p-12 text-center transition-all duration-300 cursor-pointer
          ${isDragOver 
            ? 'border-primary bg-primary/5 scale-[1.02]' 
            : 'border-muted hover:border-primary/50 hover:bg-muted/30'
          }
          ${isUploading ? 'pointer-events-none opacity-60' : ''}
        `}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        {/* Upload Icon */}
        <div className={`
          mx-auto w-16 h-16 mb-4 rounded-full flex items-center justify-center transition-all duration-300
          ${isDragOver ? 'bg-primary text-white scale-110' : 'bg-muted text-muted-foreground'}
        `}>
          <Icon 
            name={isDragOver ? "Upload" : "ImagePlus"} 
            size={32} 
          />
        </div>

        {/* Upload Text */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">
            {isDragOver ? '파일을 여기에 놓으세요' : '이미지를 업로드하세요'}
          </h3>
          <p className="text-muted-foreground">
            파일을 드래그하여 놓거나 클릭하여 선택하세요
          </p>
        </div>

        {/* File Format Info */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {['JPG', 'PNG', 'SVG']?.map((format) => (
            <span
              key={format}
              className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full font-medium"
            >
              {format}
            </span>
          ))}
        </div>

        {/* File Size Limit */}
        <p className="mt-4 text-xs text-muted-foreground">
          최대 파일 크기: 10MB
        </p>

        {/* Loading Overlay */}
        {isUploading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <div className="animate-spin w-5 h-5 border-2 border-primary border-t-transparent rounded-full" />
              <span className="text-sm font-medium text-foreground">업로드 중...</span>
            </div>
          </div>
        )}
      </div>
      {/* Alternative Upload Button */}
      <div className="mt-4 text-center">
        <Button
          variant="outline"
          onClick={openFileDialog}
          iconName="FolderOpen"
          iconPosition="left"
          disabled={isUploading}
          className="mx-auto"
        >
          파일 탐색기에서 선택
        </Button>
      </div>
      {/* Upload Instructions */}
      <div className="mt-6 bg-muted/30 rounded-lg p-4">
        <h4 className="text-sm font-medium text-foreground mb-2 flex items-center">
          <Icon name="Info" size={16} className="mr-2" />
          업로드 가이드
        </h4>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• 2D 이미지나 스케치를 업로드하세요</li>
          <li>• 명확하고 선명한 이미지일수록 더 좋은 3D 모델이 생성됩니다</li>
          <li>• 여러 각도의 이미지를 업로드하면 더 정확한 결과를 얻을 수 있습니다</li>
          <li>• 배경이 단순한 이미지를 권장합니다</li>
        </ul>
      </div>
    </div>
  );
};

export default FileUploadZone;