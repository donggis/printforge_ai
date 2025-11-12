import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UploadProgress = ({ 
  totalFiles, 
  uploadedFiles, 
  failedFiles, 
  isUploading, 
  onRetryFailed,
  onClearAll 
}) => {
  const successRate = totalFiles > 0 ? (uploadedFiles / totalFiles) * 100 : 0;
  const failureRate = totalFiles > 0 ? (failedFiles / totalFiles) * 100 : 0;
  const progressRate = totalFiles > 0 ? ((uploadedFiles + failedFiles) / totalFiles) * 100 : 0;

  if (totalFiles === 0) {
    return null;
  }

  return (
    <div className="bg-white border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center">
          <Icon name="BarChart3" size={20} className="mr-2" />
          업로드 현황
        </h3>
        {(uploadedFiles > 0 || failedFiles > 0) && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearAll}
            iconName="RotateCcw"
            iconPosition="left"
          >
            초기화
          </Button>
        )}
      </div>

      {/* Progress Overview */}
      <div className="space-y-4">
        {/* Overall Progress Bar */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">전체 진행률</span>
            <span className="font-medium text-foreground">
              {Math.round(progressRate)}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div className="h-full flex">
              <div 
                className="bg-success transition-all duration-500"
                style={{ width: `${successRate}%` }}
              />
              <div 
                className="bg-error transition-all duration-500"
                style={{ width: `${failureRate}%` }}
              />
            </div>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Total Files */}
          <div className="bg-muted/30 rounded-lg p-4 text-center">
            <div className="w-8 h-8 mx-auto mb-2 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Files" size={16} className="text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground">{totalFiles}</div>
            <div className="text-xs text-muted-foreground">총 파일</div>
          </div>

          {/* Uploaded Files */}
          <div className="bg-success/10 rounded-lg p-4 text-center">
            <div className="w-8 h-8 mx-auto mb-2 bg-success/20 rounded-full flex items-center justify-center">
              <Icon name="CheckCircle" size={16} className="text-success" />
            </div>
            <div className="text-2xl font-bold text-success">{uploadedFiles}</div>
            <div className="text-xs text-muted-foreground">업로드 완료</div>
          </div>

          {/* Failed Files */}
          <div className="bg-error/10 rounded-lg p-4 text-center">
            <div className="w-8 h-8 mx-auto mb-2 bg-error/20 rounded-full flex items-center justify-center">
              <Icon name="AlertCircle" size={16} className="text-error" />
            </div>
            <div className="text-2xl font-bold text-error">{failedFiles}</div>
            <div className="text-xs text-muted-foreground">업로드 실패</div>
          </div>
        </div>

        {/* Current Status */}
        {isUploading && (
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="animate-spin w-5 h-5 border-2 border-warning border-t-transparent rounded-full" />
              <div>
                <div className="text-sm font-medium text-foreground">업로드 진행 중</div>
                <div className="text-xs text-muted-foreground">
                  파일을 처리하고 있습니다. 잠시만 기다려주세요.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Retry Failed Uploads */}
        {failedFiles > 0 && !isUploading && (
          <div className="bg-error/10 border border-error/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="AlertTriangle" size={20} className="text-error" />
                <div>
                  <div className="text-sm font-medium text-foreground">
                    {failedFiles}개 파일 업로드 실패
                  </div>
                  <div className="text-xs text-muted-foreground">
                    실패한 파일을 다시 업로드할 수 있습니다.
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={onRetryFailed}
                iconName="RotateCcw"
                iconPosition="left"
              >
                재시도
              </Button>
            </div>
          </div>
        )}

        {/* Success Message */}
        {uploadedFiles > 0 && uploadedFiles === totalFiles && !isUploading && (
          <div className="bg-success/10 border border-success/20 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Icon name="CheckCircle" size={20} className="text-success" />
              <div>
                <div className="text-sm font-medium text-foreground">
                  모든 파일 업로드 완료!
                </div>
                <div className="text-xs text-muted-foreground">
                  이제 AI 처리 단계로 진행할 수 있습니다.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadProgress;