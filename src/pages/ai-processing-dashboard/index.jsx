import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MainHeader from '../../components/ui/MainHeader';
import WorkflowProgress from '../../components/ui/WorkflowProgress';
import ProcessingProgress from './components/ProcessingProgress';
import TechnicalPreview from './components/TechnicalPreview';
import ProcessingInfo from './components/ProcessingInfo';
import ErrorHandler from './components/ErrorHandler';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const AIProcessingDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Processing state
  const [processingState, setProcessingState] = useState({
    currentStage: 'analyzing',
    progress: 15,
    estimatedTime: 180,
    status: 'processing',
    isPaused: false
  });

  const [error, setError] = useState(null);
  const [openscadCode, setOpenscadCode] = useState('');
  const [codeGenerationProgress, setCodeGenerationProgress] = useState(0);

  const handleAuthClick = () => {
    // Handle authentication action
    navigate('/login');
  };

  // Mock data
  const mockUploadedFile = {
    name: "sketch_design_v2.png",
    size: 2457600,
    type: "image/png",
    uploadTime: new Date(Date.now() - 300000)?.toISOString()
  };

  const mockSystemResources = {
    cpu: 78,
    memory: 65,
    gpu: 92
  };

  const mockProcessingHistory = [
    {
      fileName: "product_sketch.jpg",
      status: "completed",
      processingTime: 145,
      completedAt: new Date(Date.now() - 86400000)?.toISOString()
    },
    {
      fileName: "logo_design.png",
      status: "completed", 
      processingTime: 98,
      completedAt: new Date(Date.now() - 172800000)?.toISOString()
    },
    {
      fileName: "concept_art.svg",
      status: "error",
      processingTime: 67,
      completedAt: new Date(Date.now() - 259200000)?.toISOString()
    }
  ];

  // Simulate processing progression
  useEffect(() => {
    if (processingState?.status === 'processing' && !processingState?.isPaused) {
      const interval = setInterval(() => {
        setProcessingState(prev => {
          let newProgress = prev?.progress + Math.random() * 3;
          let newStage = prev?.currentStage;
          let newEstimatedTime = Math.max(0, prev?.estimatedTime - 5);
          let newStatus = prev?.status;

          // Stage progression
          if (newProgress >= 25 && prev?.currentStage === 'analyzing') {
            newStage = 'generating';
          } else if (newProgress >= 60 && prev?.currentStage === 'generating') {
            newStage = 'optimizing';
          } else if (newProgress >= 85 && prev?.currentStage === 'optimizing') {
            newStage = 'finalizing';
          }

          // Complete processing
          if (newProgress >= 100) {
            newProgress = 100;
            newStatus = 'completed';
            newEstimatedTime = 0;
            
            // Navigate to download center after completion
            setTimeout(() => {
              navigate('/model-download-center', { 
                state: { 
                  completedFile: mockUploadedFile,
                  processingTime: 180 - prev?.estimatedTime
                }
              });
            }, 2000);
          }

          return {
            ...prev,
            progress: Math.min(100, newProgress),
            currentStage: newStage,
            estimatedTime: newEstimatedTime,
            status: newStatus
          };
        });

        // Update code generation progress
        setCodeGenerationProgress(prev => Math.min(100, prev + Math.random() * 5));
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [processingState?.status, processingState?.isPaused, navigate]);

  // Simulate random errors (5% chance)
  useEffect(() => {
    const errorCheck = setTimeout(() => {
      if (Math.random() < 0.05 && processingState?.status === 'processing') {
        const errorTypes = ['processing_failed', 'network_error', 'server_error'];
        const randomError = errorTypes?.[Math.floor(Math.random() * errorTypes?.length)];
        
        setError({
          type: randomError,
          code: `ERR_${randomError?.toUpperCase()}_${Date.now()}`,
          details: `Processing failed at stage: ${processingState?.currentStage}`
        });
        
        setProcessingState(prev => ({ ...prev, status: 'error' }));
      }
    }, 10000);

    return () => clearTimeout(errorCheck);
  }, [processingState?.currentStage, processingState?.status]);

  const handlePause = () => {
    setProcessingState(prev => ({ ...prev, isPaused: true, status: 'paused' }));
  };

  const handleResume = () => {
    setProcessingState(prev => ({ ...prev, isPaused: false, status: 'processing' }));
  };

  const handleCancel = () => {
    navigate('/file-upload-workspace');
  };

  const handleRetry = () => {
    setError(null);
    setProcessingState({
      currentStage: 'analyzing',
      progress: 0,
      estimatedTime: 180,
      status: 'processing',
      isPaused: false
    });
    setCodeGenerationProgress(0);
  };

  const handleContactSupport = () => {
    // Mock support contact
    window.open('mailto:support@printforge.ai?subject=Processing Error&body=Error Code: ' + error?.code);
  };

  const handleStepClick = (step) => {
    navigate(step?.path);
  };

  return (
    <div className="min-h-screen bg-background">
      <MainHeader isAuthenticated={true} onAuthClick={handleAuthClick} />
      <WorkflowProgress currentStep="processing" onStepClick={handleStepClick} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">AI 처리 대시보드</h1>
              <p className="text-muted-foreground">
                실시간으로 3D 모델 생성 과정을 확인하세요
              </p>
            </div>
            
            {/* Quick Actions */}
            <div className="hidden md:flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => navigate('/file-upload-workspace')}
                iconName="Upload"
                iconPosition="left"
              >
                새 파일 업로드
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate('/model-download-center')}
                iconName="Download"
                iconPosition="left"
              >
                다운로드 센터
              </Button>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-8">
            <ErrorHandler
              error={error}
              onRetry={handleRetry}
              onCancel={handleCancel}
              onContactSupport={handleContactSupport}
            />
          </div>
        )}

        {/* Main Content */}
        {!error && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Processing */}
            <div className="lg:col-span-2 space-y-6">
              {/* Processing Progress */}
              <ProcessingProgress
                currentStage={processingState?.currentStage}
                progress={processingState?.progress}
                estimatedTime={processingState?.estimatedTime}
                status={processingState?.status}
                isPaused={processingState?.isPaused}
                onPause={handlePause}
                onResume={handleResume}
                onCancel={handleCancel}
              />

              {/* Technical Preview */}
              <TechnicalPreview
                openscadCode={openscadCode}
                isGenerating={processingState?.currentStage === 'generating'}
                generationProgress={codeGenerationProgress}
              />

              {/* Mobile Actions */}
              <div className="md:hidden flex flex-col space-y-3">
                <Button
                  variant="outline"
                  onClick={() => navigate('/file-upload-workspace')}
                  iconName="Upload"
                  iconPosition="left"
                  fullWidth
                >
                  새 파일 업로드
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/model-download-center')}
                  iconName="Download"
                  iconPosition="left"
                  fullWidth
                >
                  다운로드 센터
                </Button>
              </div>
            </div>

            {/* Right Column - Processing Info */}
            <div className="lg:col-span-1">
              <ProcessingInfo
                queuePosition={1}
                processingHistory={mockProcessingHistory}
                systemResources={mockSystemResources}
                uploadedFile={mockUploadedFile}
              />
            </div>
          </div>
        )}

        {/* Status Footer */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  processingState?.status === 'processing' ? 'bg-primary animate-pulse' :
                  processingState?.status === 'completed' ? 'bg-success' :
                  processingState?.status === 'error' ? 'bg-error' : 'bg-warning'
                }`} />
                <span>
                  {processingState?.status === 'processing' && '처리 중'}
                  {processingState?.status === 'paused' && '일시 정지'}
                  {processingState?.status === 'completed' && '처리 완료'}
                  {processingState?.status === 'error' && '오류 발생'}
                </span>
              </div>
              <span>•</span>
              <span>마지막 업데이트: {new Date()?.toLocaleTimeString('ko-KR')}</span>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Shield" size={16} />
              <span>안전한 AI 처리</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIProcessingDashboard;