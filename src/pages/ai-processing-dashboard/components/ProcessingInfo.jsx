import React from 'react';
import Icon from '../../../components/AppIcon';

const ProcessingInfo = ({ 
  queuePosition, 
  processingHistory, 
  systemResources,
  uploadedFile 
}) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes > 0) {
      return `${minutes}분 ${remainingSeconds}초`;
    }
    return `${remainingSeconds}초`;
  };

  return (
    <div className="space-y-6">
      {/* Current File Info */}
      {uploadedFile && (
        <div className="bg-white rounded-lg border border-border p-4 shadow-elevation-1">
          <h3 className="font-semibold text-foreground mb-3 flex items-center">
            <Icon name="FileImage" size={20} className="mr-2" />
            처리 중인 파일
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">파일명:</span>
              <span className="text-sm font-medium text-foreground">{uploadedFile?.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">크기:</span>
              <span className="text-sm font-medium text-foreground">{formatFileSize(uploadedFile?.size)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">형식:</span>
              <span className="text-sm font-medium text-foreground">{uploadedFile?.type}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">업로드 시간:</span>
              <span className="text-sm font-medium text-foreground">
                {new Date(uploadedFile.uploadTime)?.toLocaleString('ko-KR')}
              </span>
            </div>
          </div>
        </div>
      )}
      {/* Queue Position */}
      <div className="bg-white rounded-lg border border-border p-4 shadow-elevation-1">
        <h3 className="font-semibold text-foreground mb-3 flex items-center">
          <Icon name="Clock" size={20} className="mr-2" />
          대기열 정보
        </h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">현재 위치:</span>
            <span className="text-sm font-medium text-primary">#{queuePosition}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">대기 중인 작업:</span>
            <span className="text-sm font-medium text-foreground">{queuePosition - 1}개</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">예상 대기 시간:</span>
            <span className="text-sm font-medium text-warning">
              {queuePosition > 1 ? `${(queuePosition - 1) * 3}분` : '즉시 처리'}
            </span>
          </div>
        </div>
      </div>
      {/* System Resources */}
      <div className="bg-white rounded-lg border border-border p-4 shadow-elevation-1">
        <h3 className="font-semibold text-foreground mb-3 flex items-center">
          <Icon name="Activity" size={20} className="mr-2" />
          시스템 리소스
        </h3>
        <div className="space-y-3">
          {/* CPU Usage */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-muted-foreground">CPU 사용률:</span>
              <span className="text-sm font-medium text-foreground">{systemResources?.cpu}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${systemResources?.cpu}%` }}
              />
            </div>
          </div>

          {/* Memory Usage */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-muted-foreground">메모리 사용률:</span>
              <span className="text-sm font-medium text-foreground">{systemResources?.memory}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-success h-2 rounded-full transition-all duration-300"
                style={{ width: `${systemResources?.memory}%` }}
              />
            </div>
          </div>

          {/* GPU Usage */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-muted-foreground">GPU 사용률:</span>
              <span className="text-sm font-medium text-foreground">{systemResources?.gpu}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-warning h-2 rounded-full transition-all duration-300"
                style={{ width: `${systemResources?.gpu}%` }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Processing History */}
      <div className="bg-white rounded-lg border border-border p-4 shadow-elevation-1">
        <h3 className="font-semibold text-foreground mb-3 flex items-center">
          <Icon name="History" size={20} className="mr-2" />
          최근 처리 기록
        </h3>
        <div className="space-y-3">
          {processingHistory?.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-muted/20 rounded">
              <div className="flex items-center space-x-2">
                <Icon 
                  name={item?.status === 'completed' ? 'CheckCircle' : item?.status === 'error' ? 'XCircle' : 'Clock'} 
                  size={16} 
                  className={
                    item?.status === 'completed' ? 'text-success' : 
                    item?.status === 'error' ? 'text-error' : 'text-warning'
                  }
                />
                <span className="text-sm font-medium text-foreground">{item?.fileName}</span>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">
                  {formatDuration(item?.processingTime)}
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(item.completedAt)?.toLocaleDateString('ko-KR')}
                </div>
              </div>
            </div>
          ))}
          
          {processingHistory?.length === 0 && (
            <div className="text-center py-4">
              <Icon name="FileX" size={32} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">처리 기록이 없습니다</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProcessingInfo;