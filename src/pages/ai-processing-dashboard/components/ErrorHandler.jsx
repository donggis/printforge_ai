import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ErrorHandler = ({ 
  error, 
  onRetry, 
  onCancel,
  onContactSupport 
}) => {
  const getErrorDetails = (errorType) => {
    switch (errorType) {
      case 'file_format':
        return {
          title: '지원되지 않는 파일 형식',
          message: '업로드된 파일이 지원되지 않는 형식입니다. JPG, PNG, SVG 파일만 지원됩니다.',
          suggestions: [
            '파일 형식을 JPG, PNG, 또는 SVG로 변환해주세요',
            '파일이 손상되지 않았는지 확인해주세요',
            '다른 파일로 다시 시도해주세요'
          ],
          canRetry: true
        };
      case 'file_size':
        return {
          title: '파일 크기 초과',
          message: '업로드된 파일이 최대 허용 크기(10MB)를 초과했습니다.',
          suggestions: [
            '이미지 크기를 줄여주세요',
            '이미지 품질을 낮춰주세요',
            '다른 파일로 시도해주세요'
          ],
          canRetry: true
        };
      case 'processing_failed':
        return {
          title: 'AI 처리 실패',
          message: 'AI가 이미지를 3D 모델로 변환하는 중 오류가 발생했습니다.',
          suggestions: [
            '이미지가 명확하고 선명한지 확인해주세요',
            '배경이 단순한 이미지를 사용해주세요',
            '잠시 후 다시 시도해주세요'
          ],
          canRetry: true
        };
      case 'network_error':
        return {
          title: '네트워크 연결 오류',
          message: '서버와의 연결에 문제가 발생했습니다.',
          suggestions: [
            '인터넷 연결을 확인해주세요',
            '잠시 후 다시 시도해주세요',
            '방화벽 설정을 확인해주세요'
          ],
          canRetry: true
        };
      case 'server_error':
        return {
          title: '서버 오류',
          message: '서버에서 일시적인 문제가 발생했습니다.',
          suggestions: [
            '잠시 후 다시 시도해주세요',
            '문제가 지속되면 고객지원에 문의해주세요'
          ],
          canRetry: true
        };
      case 'quota_exceeded':
        return {
          title: '처리 한도 초과',
          message: '오늘의 무료 처리 한도를 모두 사용했습니다.',
          suggestions: [
            'Pro 플랜으로 업그레이드하여 무제한 처리를 이용하세요',
            '내일 다시 시도해주세요'
          ],
          canRetry: false
        };
      default:
        return {
          title: '알 수 없는 오류',
          message: '예상치 못한 오류가 발생했습니다.',
          suggestions: [
            '페이지를 새로고침해주세요',
            '잠시 후 다시 시도해주세요',
            '문제가 지속되면 고객지원에 문의해주세요'
          ],
          canRetry: true
        };
    }
  };

  const errorDetails = getErrorDetails(error?.type);

  return (
    <div className="bg-white rounded-lg border border-error/20 p-6 shadow-elevation-1">
      {/* Error Header */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-error/10 rounded-lg">
          <Icon name="AlertTriangle" size={24} className="text-error" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-error">{errorDetails?.title}</h2>
          <p className="text-sm text-muted-foreground">
            오류 코드: {error?.code || 'UNKNOWN'}
          </p>
        </div>
      </div>
      {/* Error Message */}
      <div className="mb-6">
        <p className="text-foreground mb-4">{errorDetails?.message}</p>
        
        {/* Error Details */}
        {error?.details && (
          <div className="p-3 bg-muted/30 rounded-lg mb-4">
            <p className="text-sm text-muted-foreground font-mono">
              {error?.details}
            </p>
          </div>
        )}

        {/* Suggestions */}
        <div>
          <h4 className="font-medium text-foreground mb-2">해결 방법:</h4>
          <ul className="space-y-1">
            {errorDetails?.suggestions?.map((suggestion, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
                <Icon name="ArrowRight" size={14} className="mt-0.5 flex-shrink-0" />
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        {errorDetails?.canRetry && (
          <Button
            variant="default"
            onClick={onRetry}
            iconName="RotateCcw"
            iconPosition="left"
            className="flex-1"
          >
            다시 시도
          </Button>
        )}
        
        <Button
          variant="outline"
          onClick={onCancel}
          iconName="ArrowLeft"
          iconPosition="left"
          className="flex-1"
        >
          파일 업로드로 돌아가기
        </Button>
        
        <Button
          variant="ghost"
          onClick={onContactSupport}
          iconName="MessageCircle"
          iconPosition="left"
          className="flex-1"
        >
          고객지원 문의
        </Button>
      </div>
      {/* Additional Help */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="Clock" size={14} />
            <span>발생 시간: {new Date()?.toLocaleString('ko-KR')}</span>
          </div>
          <button
            onClick={onContactSupport}
            className="text-primary hover:underline"
          >
            문제 신고하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorHandler;