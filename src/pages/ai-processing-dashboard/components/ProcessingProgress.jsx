import React from 'react';
import Icon from '../../../components/AppIcon';

const ProcessingProgress = ({ 
  currentStage, 
  progress, 
  estimatedTime, 
  status,
  onPause,
  onResume,
  onCancel,
  isPaused = false
}) => {
  const stages = [
    { id: 'analyzing', label: '이미지 분석', description: '업로드된 이미지를 AI가 분석하고 있습니다' },
    { id: 'generating', label: '3D 모델 생성', description: 'OpenSCAD 코드를 생성하고 있습니다' },
    { id: 'optimizing', label: '모델 최적화', description: '3D 모델을 최적화하고 있습니다' },
    { id: 'finalizing', label: '완료 처리', description: 'STL 파일을 준비하고 있습니다' }
  ];

  const getCurrentStageIndex = () => {
    return stages?.findIndex(stage => stage?.id === currentStage);
  };

  const currentStageIndex = getCurrentStageIndex();
  const currentStageInfo = stages?.[currentStageIndex];

  const getStatusColor = () => {
    switch (status) {
      case 'processing': return 'text-primary';
      case 'paused': return 'text-warning';
      case 'error': return 'text-error';
      case 'completed': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'processing': return 'Loader2';
      case 'paused': return 'Pause';
      case 'error': return 'AlertCircle';
      case 'completed': return 'CheckCircle';
      default: return 'Clock';
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}분 ${remainingSeconds}초`;
  };

  return (
    <div className="bg-white rounded-lg border border-border p-6 shadow-elevation-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${status === 'processing' ? 'bg-primary/10' : status === 'error' ? 'bg-error/10' : 'bg-muted'}`}>
            <Icon 
              name={getStatusIcon()} 
              size={24} 
              className={`${getStatusColor()} ${status === 'processing' ? 'animate-spin' : ''}`}
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">AI 처리 진행 상황</h2>
            <p className="text-sm text-muted-foreground">
              {status === 'processing' && !isPaused && '처리 중...'}
              {status === 'paused' && '일시 정지됨'}
              {status === 'error' && '오류 발생'}
              {status === 'completed' && '처리 완료'}
            </p>
          </div>
        </div>

        {/* Processing Controls */}
        {status === 'processing' && (
          <div className="flex items-center space-x-2">
            {!isPaused ? (
              <button
                onClick={onPause}
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-warning hover:bg-warning/10 rounded-md transition-colors duration-150"
              >
                <Icon name="Pause" size={16} />
                <span>일시정지</span>
              </button>
            ) : (
              <button
                onClick={onResume}
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-md transition-colors duration-150"
              >
                <Icon name="Play" size={16} />
                <span>재개</span>
              </button>
            )}
            <button
              onClick={onCancel}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-error hover:bg-error/10 rounded-md transition-colors duration-150"
            >
              <Icon name="X" size={16} />
              <span>취소</span>
            </button>
          </div>
        )}
      </div>
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            전체 진행률: {progress}%
          </span>
          {estimatedTime > 0 && (
            <span className="text-sm text-muted-foreground">
              예상 완료: {formatTime(estimatedTime)}
            </span>
          )}
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${
              status === 'error' ? 'bg-error' : 'bg-primary'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      {/* Current Stage Info */}
      {currentStageInfo && (
        <div className="mb-6 p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <h3 className="font-medium text-foreground">{currentStageInfo?.label}</h3>
          </div>
          <p className="text-sm text-muted-foreground ml-5">
            {currentStageInfo?.description}
          </p>
        </div>
      )}
      {/* Stage Progress */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-foreground mb-3">처리 단계</h4>
        {stages?.map((stage, index) => {
          const isCompleted = index < currentStageIndex;
          const isCurrent = index === currentStageIndex;
          const isPending = index > currentStageIndex;

          return (
            <div key={stage?.id} className="flex items-center space-x-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                isCompleted ? 'bg-success text-success-foreground' :
                isCurrent ? 'bg-primary text-primary-foreground': 'bg-muted text-muted-foreground'
              }`}>
                {isCompleted ? (
                  <Icon name="Check" size={12} />
                ) : (
                  <span className="text-xs font-medium">{index + 1}</span>
                )}
              </div>
              <div className="flex-1">
                <div className={`text-sm font-medium ${
                  isCompleted ? 'text-success' : isCurrent ?'text-primary': 'text-muted-foreground'
                }`}>
                  {stage?.label}
                </div>
              </div>
              {isCurrent && status === 'processing' && (
                <Icon name="Loader2" size={16} className="text-primary animate-spin" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProcessingProgress;