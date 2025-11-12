import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ModelPreview = ({ model }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewMode, setViewMode] = useState('wireframe');

  const viewModes = [
    { id: 'wireframe', label: '와이어프레임', icon: 'Grid3X3' },
    { id: 'solid', label: '솔리드', icon: 'Box' },
    { id: 'textured', label: '텍스처', icon: 'Palette' }
  ];

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="bg-white rounded-lg shadow-elevation-2 p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          3D 모델 미리보기
        </h3>
        <div className="flex items-center space-x-2">
          {/* View Mode Selector */}
          <div className="flex bg-muted rounded-lg p-1">
            {viewModes?.map((mode) => (
              <button
                key={mode?.id}
                onClick={() => setViewMode(mode?.id)}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                  viewMode === mode?.id
                    ? 'bg-white text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={mode?.icon} size={14} />
                <span className="hidden sm:inline">{mode?.label}</span>
              </button>
            ))}
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFullscreen}
            className="hover:bg-muted"
          >
            <Icon name={isFullscreen ? "Minimize2" : "Maximize2"} size={16} />
          </Button>
        </div>
      </div>
      {/* 3D Preview Container */}
      <div className={`relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden ${
        isFullscreen ? 'fixed inset-4 z-50 h-auto' : 'h-96'
      }`}>
        {/* 3D Model Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Box" size={32} className="text-primary" />
            </div>
            <h4 className="text-lg font-medium text-foreground mb-2">
              3D 모델 뷰어
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              마우스로 드래그하여 회전, 휠로 확대/축소
            </p>
            <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="RotateCw" size={12} />
                <span>회전</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="ZoomIn" size={12} />
                <span>확대/축소</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Move" size={12} />
                <span>이동</span>
              </div>
            </div>
          </div>
        </div>

        {/* Control Overlay */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 hover:bg-white/80"
              title="초기화"
            >
              <Icon name="RotateCcw" size={14} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 hover:bg-white/80"
              title="중앙 정렬"
            >
              <Icon name="Target" size={14} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 hover:bg-white/80"
              title="전체 보기"
            >
              <Icon name="Maximize" size={14} />
            </Button>
          </div>
        </div>

        {/* Model Stats Overlay */}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
          <div className="text-xs space-y-1">
            <div className="flex items-center justify-between space-x-4">
              <span className="text-muted-foreground">면 수:</span>
              <span className="font-medium text-foreground">12,847</span>
            </div>
            <div className="flex items-center justify-between space-x-4">
              <span className="text-muted-foreground">꼭짓점:</span>
              <span className="font-medium text-foreground">6,423</span>
            </div>
            <div className="flex items-center justify-between space-x-4">
              <span className="text-muted-foreground">크기:</span>
              <span className="font-medium text-foreground">50×30×25mm</span>
            </div>
          </div>
        </div>

        {/* Fullscreen Close Button */}
        {isFullscreen && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFullscreen}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm hover:bg-white"
          >
            <Icon name="X" size={20} />
          </Button>
        )}
      </div>
      {/* Preview Actions */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Eye" size={14} />
            <span>미리보기 모드</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Layers" size={14} />
            <span>{viewMode === 'wireframe' ? '와이어프레임' : viewMode === 'solid' ? '솔리드' : '텍스처'}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Camera"
            iconPosition="left"
          >
            스크린샷
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Share2"
            iconPosition="left"
          >
            미리보기 공유
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModelPreview;