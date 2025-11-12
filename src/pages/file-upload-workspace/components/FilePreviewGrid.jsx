import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const FilePreviewGrid = ({ files, onRemoveFile, onRetryUpload }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const getFileTypeIcon = (type) => {
    if (type?.includes('svg')) return 'FileImage';
    if (type?.includes('png')) return 'FileImage';
    if (type?.includes('jpeg') || type?.includes('jpg')) return 'FileImage';
    return 'File';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'uploaded': return 'text-success';
      case 'uploading': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'uploaded': return 'CheckCircle';
      case 'uploading': return 'Loader';
      case 'error': return 'AlertCircle';
      default: return 'Clock';
    }
  };

  if (!files || files?.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
          <Icon name="ImageOff" size={24} className="text-muted-foreground" />
        </div>
        <p className="text-muted-foreground">업로드된 파일이 없습니다</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          업로드된 파일 ({files?.length})
        </h3>
        {files?.some(file => file?.status === 'uploaded') && (
          <Button
            variant="outline"
            size="sm"
            iconName="Trash2"
            iconPosition="left"
            onClick={() => files?.forEach(file => file?.status === 'uploaded' && onRemoveFile(file?.id))}
          >
            모두 삭제
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {files?.map((file) => (
          <div
            key={file?.id}
            className="bg-white border border-border rounded-lg p-4 hover:shadow-elevation-2 transition-all duration-200"
          >
            {/* File Preview */}
            <div className="aspect-square mb-3 bg-muted rounded-lg overflow-hidden relative">
              {file?.preview ? (
                <Image
                  src={file?.preview}
                  alt={`업로드된 이미지 파일 ${file?.name}의 미리보기`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Icon 
                    name={getFileTypeIcon(file?.type)} 
                    size={32} 
                    className="text-muted-foreground" 
                  />
                </div>
              )}

              {/* Status Overlay */}
              <div className="absolute top-2 right-2">
                <div className={`
                  w-6 h-6 rounded-full bg-white shadow-elevation-1 flex items-center justify-center
                  ${getStatusColor(file?.status)}
                `}>
                  <Icon 
                    name={getStatusIcon(file?.status)} 
                    size={14}
                    className={file?.status === 'uploading' ? 'animate-spin' : ''}
                  />
                </div>
              </div>
            </div>

            {/* File Info */}
            <div className="space-y-2">
              <div>
                <h4 className="text-sm font-medium text-foreground truncate" title={file?.name}>
                  {file?.name}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(file?.size)} • {file?.type?.split('/')?.[1]?.toUpperCase()}
                </p>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between">
                <span className={`text-xs font-medium ${getStatusColor(file?.status)}`}>
                  {file?.status === 'uploaded' && '업로드 완료'}
                  {file?.status === 'uploading' && '업로드 중...'}
                  {file?.status === 'error' && '업로드 실패'}
                  {file?.status === 'pending' && '대기 중'}
                </span>

                {/* Actions */}
                <div className="flex items-center space-x-1">
                  {file?.status === 'error' && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRetryUpload(file?.id)}
                      className="w-6 h-6"
                    >
                      <Icon name="RotateCcw" size={12} />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveFile(file?.id)}
                    className="w-6 h-6 hover:bg-error/10 hover:text-error"
                  >
                    <Icon name="X" size={12} />
                  </Button>
                </div>
              </div>

              {/* Error Message */}
              {file?.status === 'error' && file?.error && (
                <div className="mt-2 p-2 bg-error/10 border border-error/20 rounded text-xs text-error">
                  {file?.error}
                </div>
              )}

              {/* Upload Progress */}
              {file?.status === 'uploading' && (
                <div className="mt-2">
                  <div className="w-full bg-muted rounded-full h-1">
                    <div 
                      className="bg-primary h-1 rounded-full transition-all duration-300"
                      style={{ width: `${file?.progress || 0}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {file?.progress || 0}% 완료
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Upload Summary */}
      {files?.length > 0 && (
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <span className="text-muted-foreground">
                총 {files?.length}개 파일
              </span>
              <span className="text-success">
                {files?.filter(f => f?.status === 'uploaded')?.length}개 완료
              </span>
              {files?.some(f => f?.status === 'error') && (
                <span className="text-error">
                  {files?.filter(f => f?.status === 'error')?.length}개 실패
                </span>
              )}
            </div>
            <div className="text-muted-foreground">
              {formatFileSize(files?.reduce((total, file) => total + file?.size, 0))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilePreviewGrid;