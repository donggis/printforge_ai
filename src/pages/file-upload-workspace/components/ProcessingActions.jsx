import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProcessingActions = ({ 
  uploadedFiles, 
  totalFiles, 
  isUploading, 
  onStartProcessing,
  onAddMoreFiles 
}) => {
  const navigate = useNavigate();
  const hasUploadedFiles = uploadedFiles > 0;
  const allFilesUploaded = uploadedFiles === totalFiles && totalFiles > 0;

  const handleStartProcessing = () => {
    if (onStartProcessing) {
      onStartProcessing();
    }
    // Navigate to AI processing dashboard
    navigate('/ai-processing-dashboard');
  };

  const handleGoBack = () => {
    navigate('/home-landing');
  };

  return (
    <div className="bg-white border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
        <Icon name="Zap" size={20} className="mr-2" />
        다음 단계
      </h3>

      {/* Processing Requirements */}
      <div className="space-y-4 mb-6">
        <div className="bg-muted/30 rounded-lg p-4">
          <h4 className="text-sm font-medium text-foreground mb-2">
            AI 처리 요구사항
          </h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li className={`flex items-center ${hasUploadedFiles ? 'text-success' : ''}`}>
              <Icon 
                name={hasUploadedFiles ? "CheckCircle" : "Circle"} 
                size={12} 
                className="mr-2" 
              />
              최소 1개 이상의 이미지 업로드
            </li>
            <li className={`flex items-center ${allFilesUploaded ? 'text-success' : ''}`}>
              <Icon 
                name={allFilesUploaded ? "CheckCircle" : "Circle"} 
                size={12} 
                className="mr-2" 
              />
              모든 파일 업로드 완료
            </li>
            <li className={`flex items-center ${!isUploading ? 'text-success' : ''}`}>
              <Icon 
                name={!isUploading ? "CheckCircle" : "Circle"} 
                size={12} 
                className="mr-2" 
              />
              업로드 프로세스 완료
            </li>
          </ul>
        </div>

        {/* Processing Info */}
        {hasUploadedFiles && (
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={16} className="text-primary mt-0.5" />
              <div>
                <div className="text-sm font-medium text-foreground mb-1">
                  AI 처리 예상 시간
                </div>
                <div className="text-xs text-muted-foreground">
                  • 단일 이미지: 2-5분\n
                  • 복수 이미지: 5-15분\n
                  • 복잡한 형태: 최대 30분
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        {/* Primary Action */}
        {hasUploadedFiles ? (
          <Button
            variant="default"
            onClick={handleStartProcessing}
            disabled={isUploading || !allFilesUploaded}
            iconName="ArrowRight"
            iconPosition="right"
            fullWidth
            className="justify-center"
          >
            {isUploading 
              ? '업로드 완료 대기 중...' 
              : allFilesUploaded 
                ? 'AI 처리 시작하기' :'업로드 완료 후 진행 가능'
            }
          </Button>
        ) : (
          <div className="text-center py-4">
            <Icon name="Upload" size={24} className="mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              파일을 업로드하면 AI 처리를 시작할 수 있습니다
            </p>
          </div>
        )}

        {/* Secondary Actions */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={onAddMoreFiles}
            iconName="Plus"
            iconPosition="left"
            fullWidth
            className="justify-center"
          >
            파일 추가
          </Button>
          <Button
            variant="ghost"
            onClick={handleGoBack}
            iconName="ArrowLeft"
            iconPosition="left"
            fullWidth
            className="justify-center"
          >
            홈으로 돌아가기
          </Button>
        </div>
      </div>

      {/* Processing Tips */}
      {hasUploadedFiles && (
        <div className="mt-6 bg-muted/20 rounded-lg p-4">
          <h4 className="text-sm font-medium text-foreground mb-2 flex items-center">
            <Icon name="Lightbulb" size={14} className="mr-2" />
            더 나은 결과를 위한 팁
          </h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• 여러 각도의 이미지를 제공하면 더 정확한 3D 모델이 생성됩니다</li>
            <li>• 배경이 단순하고 대상이 명확한 이미지를 사용하세요</li>
            <li>• 고해상도 이미지일수록 더 세밀한 모델을 얻을 수 있습니다</li>
            <li>• 처리 중에는 브라우저를 닫지 마세요</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProcessingActions;