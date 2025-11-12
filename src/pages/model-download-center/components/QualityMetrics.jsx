import React from 'react';
import Icon from '../../../components/AppIcon';

const QualityMetrics = ({ metrics }) => {
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-error';
  };

  const getScoreBgColor = (score) => {
    if (score >= 90) return 'bg-success';
    if (score >= 70) return 'bg-warning';
    return 'bg-error';
  };

  const qualityItems = [
    {
      label: '전체 품질',
      score: metrics?.overallQuality,
      icon: 'Award',
      description: 'AI 생성 모델의 전반적인 품질 점수'
    },
    {
      label: '기하학적 정확도',
      score: metrics?.geometricAccuracy,
      icon: 'Triangle',
      description: '원본 이미지와의 형태 일치도'
    },
    {
      label: '표면 품질',
      score: metrics?.surfaceQuality,
      icon: 'Layers',
      description: '3D 프린팅에 적합한 표면 매끄러움'
    },
    {
      label: '구조적 안정성',
      score: metrics?.structuralIntegrity,
      icon: 'Shield',
      description: '물리적 강도 및 프린팅 가능성'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-elevation-2 p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">
            품질 분석 결과
          </h3>
          <p className="text-sm text-muted-foreground">
            AI가 분석한 3D 모델의 품질 지표입니다
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${getScoreBgColor(metrics?.overallQuality)}`}></div>
          <span className={`text-sm font-medium ${getScoreColor(metrics?.overallQuality)}`}>
            {metrics?.overallQuality >= 90 ? '우수' : metrics?.overallQuality >= 70 ? '양호' : '개선 필요'}
          </span>
        </div>
      </div>
      {/* Quality Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {qualityItems?.map((item) => (
          <div key={item?.label} className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Icon name={item?.icon} size={16} className="text-primary" />
                <span className="font-medium text-foreground">{item?.label}</span>
              </div>
              <span className={`text-lg font-semibold ${getScoreColor(item?.score)}`}>
                {item?.score}%
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-muted rounded-full h-2 mb-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${getScoreBgColor(item?.score)}`}
                style={{ width: `${item?.score}%` }}
              />
            </div>
            
            <p className="text-xs text-muted-foreground">
              {item?.description}
            </p>
          </div>
        ))}
      </div>
      {/* Generation Details */}
      <div className="bg-muted/30 rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-3 flex items-center">
          <Icon name="Info" size={16} className="mr-2 text-primary" />
          생성 세부 정보
        </h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground block">처리 시간</span>
            <span className="font-medium text-foreground">{metrics?.processingTime}</span>
          </div>
          <div>
            <span className="text-muted-foreground block">AI 모델</span>
            <span className="font-medium text-foreground">{metrics?.aiModel}</span>
          </div>
          <div>
            <span className="text-muted-foreground block">해상도</span>
            <span className="font-medium text-foreground">{metrics?.resolution}</span>
          </div>
          <div>
            <span className="text-muted-foreground block">최적화</span>
            <span className="font-medium text-foreground">{metrics?.optimization}</span>
          </div>
        </div>
      </div>
      {/* Recommendations */}
      {metrics?.overallQuality < 90 && (
        <div className="mt-4 p-4 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" size={20} className="text-warning mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground mb-2">개선 제안</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {metrics?.overallQuality < 70 && (
                  <li>• 더 높은 해상도의 원본 이미지를 사용해보세요</li>
                )}
                {metrics?.geometricAccuracy < 80 && (
                  <li>• 명확한 윤곽선이 있는 이미지를 선택해보세요</li>
                )}
                {metrics?.surfaceQuality < 80 && (
                  <li>• Pro 플랜으로 업그레이드하여 고품질 생성을 이용해보세요</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QualityMetrics;