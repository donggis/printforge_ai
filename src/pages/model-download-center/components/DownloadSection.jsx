import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DownloadSection = ({ model, onDownload, onShare }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await onDownload(model);
    } finally {
      setIsDownloading(false);
    }
  };

  const formatFileSize = (bytes) => {
    const mb = bytes / (1024 * 1024);
    return `${mb?.toFixed(1)}MB`;
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })?.format(date);
  };

  return (
    <div className="bg-white rounded-lg shadow-elevation-2 p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            3D 모델 다운로드
          </h2>
          <p className="text-muted-foreground">
            생성된 STL 파일을 다운로드하여 3D 프린팅을 시작하세요
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-success rounded-full"></div>
          <span className="text-sm font-medium text-success">완료</span>
        </div>
      </div>
      {/* Model Preview Card */}
      <div className="border border-border rounded-lg p-4 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6">
          {/* Preview Image */}
          <div className="flex-shrink-0 mb-4 lg:mb-0">
            <div className="w-full lg:w-32 h-32 bg-muted rounded-lg overflow-hidden">
              <Image
                src={model?.previewImage}
                alt={model?.previewImageAlt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Model Info */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {model?.name}
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">파일 크기</span>
                <p className="font-medium text-foreground">
                  {formatFileSize(model?.fileSize)}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">생성 시간</span>
                <p className="font-medium text-foreground">
                  {formatDate(model?.createdAt)}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">파일 형식</span>
                <p className="font-medium text-foreground">STL</p>
              </div>
              <div>
                <span className="text-muted-foreground">품질</span>
                <p className="font-medium text-success">고품질</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Download Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Button
          variant="default"
          size="lg"
          loading={isDownloading}
          onClick={handleDownload}
          iconName="Download"
          iconPosition="left"
          className="flex-1 sm:flex-none"
        >
          STL 파일 다운로드
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          onClick={() => onShare(model)}
          iconName="Share2"
          iconPosition="left"
        >
          공유하기
        </Button>
      </div>
      {/* Compatibility Info */}
      <div className="bg-muted/30 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-2">
              3D 프린팅 소프트웨어 호환성
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              이 STL 파일은 다음 소프트웨어와 호환됩니다:
            </p>
            <div className="flex flex-wrap gap-2">
              {['Cura', 'PrusaSlicer', 'Simplify3D', 'Fusion 360', 'Blender']?.map((software) => (
                <span
                  key={software}
                  className="px-2 py-1 bg-white rounded text-xs font-medium text-foreground border border-border"
                >
                  {software}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadSection;