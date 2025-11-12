import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const WorkflowProgress = ({ currentStep, onStepClick }) => {
  const location = useLocation();
  
  const workflowSteps = [
    {
      id: 'upload',
      label: '파일 업로드',
      description: '2D 이미지 업로드',
      path: '/file-upload-workspace',
      icon: 'Upload'
    },
    {
      id: 'processing',
      label: 'AI 처리',
      description: '3D 모델 생성 중',
      path: '/ai-processing-dashboard',
      icon: 'Cpu'
    },
    {
      id: 'download',
      label: '다운로드',
      description: '완성된 모델 받기',
      path: '/model-download-center',
      icon: 'Download'
    }
  ];

  // Determine current step based on location if not provided
  const getCurrentStep = () => {
    if (currentStep) return currentStep;
    
    const currentPath = location?.pathname;
    const step = workflowSteps?.find(step => step?.path === currentPath);
    return step ? step?.id : 'upload';
  };

  const activeStep = getCurrentStep();
  const activeStepIndex = workflowSteps?.findIndex(step => step?.id === activeStep);

  const getStepStatus = (stepIndex) => {
    if (stepIndex < activeStepIndex) return 'completed';
    if (stepIndex === activeStepIndex) return 'current';
    return 'pending';
  };

  const handleStepClick = (step, stepIndex) => {
    // Only allow navigation to completed steps or current step
    if (stepIndex <= activeStepIndex && onStepClick) {
      onStepClick(step);
    }
  };

  // Don't show on non-workflow pages
  const workflowPaths = workflowSteps?.map(step => step?.path);
  if (!workflowPaths?.includes(location?.pathname)) {
    return null;
  }

  return (
    <div className="bg-white border-b border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          {workflowSteps?.map((step, index) => {
            const status = getStepStatus(index);
            const isClickable = index <= activeStepIndex && onStepClick;
            
            return (
              <div key={step?.id} className="flex items-center flex-1">
                {/* Step Circle */}
                <div className="flex items-center">
                  <button
                    onClick={() => handleStepClick(step, index)}
                    disabled={!isClickable}
                    className={`
                      relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
                      ${status === 'completed' 
                        ? 'bg-success border-success text-success-foreground hover:bg-success/90' 
                        : status === 'current' ?'bg-primary border-primary text-primary-foreground' :'bg-white border-muted text-muted-foreground'
                      }
                      ${isClickable ? 'cursor-pointer hover:scale-105' : 'cursor-default'}
                    `}
                  >
                    {status === 'completed' ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      <Icon name={step?.icon} size={16} />
                    )}
                  </button>
                  
                  {/* Step Info - Hidden on mobile */}
                  <div className="ml-4 hidden sm:block">
                    <div className={`text-sm font-medium ${
                      status === 'current' ? 'text-foreground' : 
                      status === 'completed' ? 'text-success' : 'text-muted-foreground'
                    }`}>
                      {step?.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {step?.description}
                    </div>
                  </div>
                </div>
                {/* Connector Line */}
                {index < workflowSteps?.length - 1 && (
                  <div className="flex-1 mx-4">
                    <div className={`h-0.5 transition-colors duration-300 ${
                      index < activeStepIndex ? 'bg-success' : 'bg-muted'
                    }`} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Step Info */}
        <div className="sm:hidden mt-4 text-center">
          <div className="text-sm font-medium text-foreground">
            {workflowSteps?.[activeStepIndex]?.label}
          </div>
          <div className="text-xs text-muted-foreground">
            {workflowSteps?.[activeStepIndex]?.description}
          </div>
        </div>

        {/* Progress Bar - Mobile Only */}
        <div className="sm:hidden mt-4">
          <div className="w-full bg-muted rounded-full h-1">
            <div 
              className="bg-primary h-1 rounded-full transition-all duration-500"
              style={{ width: `${((activeStepIndex + 1) / workflowSteps?.length) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>단계 {activeStepIndex + 1}</span>
            <span>{workflowSteps?.length}단계 중</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowProgress;