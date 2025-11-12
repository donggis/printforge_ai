import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const TechnicalPreview = ({ 
  openscadCode, 
  isGenerating = false,
  generationProgress = 0 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [displayedCode, setDisplayedCode] = useState('');

  // Simulate real-time code generation
  useEffect(() => {
    if (isGenerating && openscadCode) {
      const targetLength = Math.floor((openscadCode?.length * generationProgress) / 100);
      setDisplayedCode(openscadCode?.substring(0, targetLength));
    } else {
      setDisplayedCode(openscadCode);
    }
  }, [openscadCode, isGenerating, generationProgress]);

  const mockOpenSCADCode = `// PrintForge AI 생성 코드
// 생성 시간: ${new Date()?.toLocaleString('ko-KR')}

module main_object() {
    difference() {
        // 기본 형태
        hull() {
            translate([0, 0, 0])
                cylinder(h=10, r=15, center=true);
            translate([20, 0, 0])
                cylinder(h=10, r=12, center=true);
        }
        
        // 구멍 생성
        translate([10, 0, 0])
            cylinder(h=12, r=5, center=true);
    }
    
    // 세부 특징 추가
    translate([0, 0, 5])
        cube([30, 5, 2], center=true);
}

// 최종 렌더링
main_object();`;

  const codeToDisplay = displayedCode || mockOpenSCADCode;

  const copyToClipboard = () => {
    navigator.clipboard?.writeText(codeToDisplay);
  };

  return (
    <div className="bg-white rounded-lg border border-border shadow-elevation-1">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-muted rounded-lg">
            <Icon name="Code" size={20} className="text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">OpenSCAD 코드 미리보기</h3>
            <p className="text-sm text-muted-foreground">
              {isGenerating ? '실시간 코드 생성 중...' : 'AI가 생성한 3D 모델 코드'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Generation Progress */}
          {isGenerating && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Loader2" size={16} className="animate-spin" />
              <span>{generationProgress}%</span>
            </div>
          )}

          {/* Copy Button */}
          <button
            onClick={copyToClipboard}
            className="flex items-center space-x-1 px-2 py-1 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors duration-150"
            title="코드 복사"
          >
            <Icon name="Copy" size={16} />
          </button>

          {/* Expand/Collapse Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-1 px-2 py-1 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors duration-150"
          >
            <Icon name={isExpanded ? "Minimize2" : "Maximize2"} size={16} />
          </button>
        </div>
      </div>
      {/* Code Display */}
      <div className={`relative ${isExpanded ? 'h-96' : 'h-48'} transition-all duration-300`}>
        <div className="absolute inset-0 overflow-auto">
          <pre className="p-4 text-sm font-mono text-foreground bg-muted/20 h-full">
            <code className="language-openscad">
              {codeToDisplay}
              {isGenerating && (
                <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1" />
              )}
            </code>
          </pre>
        </div>

        {/* Generation Overlay */}
        {isGenerating && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center">
              <Icon name="Loader2" size={32} className="text-primary animate-spin mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">코드 생성 중...</p>
              <p className="text-xs text-muted-foreground">AI가 3D 모델을 분석하고 있습니다</p>
            </div>
          </div>
        )}
      </div>
      {/* Footer Info */}
      <div className="p-4 border-t border-border bg-muted/10">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span>언어: OpenSCAD</span>
            <span>•</span>
            <span>라인: {codeToDisplay?.split('\n')?.length}</span>
            <span>•</span>
            <span>문자: {codeToDisplay?.length}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Zap" size={12} />
            <span>AI 생성됨</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalPreview;