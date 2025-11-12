import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const MobileNavigation = ({ 
  isOpen, 
  onClose, 
  isAuthenticated = false, 
  onAuthClick,
  className = '' 
}) => {
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const navigationSections = [
    {
      title: '주요 기능',
      items: [
        { label: '기능 소개', href: '#features', type: 'section', icon: 'Zap' },
        { label: '요금제', href: '#pricing', type: 'section', icon: 'CreditCard' },
        { label: 'FAQ', href: '#faq', type: 'section', icon: 'HelpCircle' },
        { label: '문서', href: '#documentation', type: 'section', icon: 'BookOpen' },
      ]
    },
    {
      title: '워크플로우',
      items: [
        { label: '파일 업로드', href: '/file-upload-workspace', type: 'route', icon: 'Upload' },
        { label: 'AI 처리 현황', href: '/ai-processing-dashboard', type: 'route', icon: 'Cpu' },
        { label: '모델 다운로드', href: '/model-download-center', type: 'route', icon: 'Download' },
      ]
    }
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNavigation = (item) => {
    if (item?.type === 'section') {
      if (location?.pathname !== '/home-landing') {
        navigate('/home-landing');
        setTimeout(() => {
          const element = document.querySelector(item?.href);
          if (element) {
            element?.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        const element = document.querySelector(item?.href);
        if (element) {
          element?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else if (item?.type === 'route') {
      navigate(item?.href);
    }
    onClose();
  };

  const handleStartNow = () => {
    if (isAuthenticated) {
      navigate('/file-upload-workspace');
    } else {
      navigate('/user-authentication');
    }
    onClose();
  };

  const handleAuthClick = () => {
    if (onAuthClick) {
      onAuthClick();
    } else {
      navigate('/user-authentication');
    }
    onClose();
  };

  const toggleSection = (sectionTitle) => {
    setActiveSection(activeSection === sectionTitle ? '' : sectionTitle);
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 ${className}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Slide-out Menu */}
      <div className="absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-elevation-3 animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
              <Icon name="Box" size={14} color="white" />
            </div>
            <span className="font-semibold text-foreground">PrintForge AI</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-muted"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Navigation Content */}
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-4">
            {/* Quick Actions */}
            <div className="mb-6">
              <Button
                variant="default"
                onClick={handleStartNow}
                iconName="ArrowRight"
                iconPosition="right"
                fullWidth
                className="justify-center mb-3"
              >
                시작하기
              </Button>
              
              {!isAuthenticated && (
                <Button
                  variant="outline"
                  onClick={handleAuthClick}
                  iconName="LogIn"
                  iconPosition="left"
                  fullWidth
                  className="justify-center"
                >
                  로그인
                </Button>
              )}
            </div>

            {/* Navigation Sections */}
            <div className="space-y-4">
              {navigationSections?.map((section) => (
                <div key={section?.title} className="border border-border rounded-lg overflow-hidden">
                  {/* Section Header */}
                  <button
                    onClick={() => toggleSection(section?.title)}
                    className="w-full flex items-center justify-between p-3 bg-muted/50 hover:bg-muted transition-colors duration-150"
                  >
                    <span className="font-medium text-sm text-foreground">
                      {section?.title}
                    </span>
                    <Icon 
                      name="ChevronDown" 
                      size={16} 
                      className={`transform transition-transform duration-200 ${
                        activeSection === section?.title ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Section Items */}
                  {activeSection === section?.title && (
                    <div className="bg-white">
                      {section?.items?.map((item) => (
                        <button
                          key={item?.label}
                          onClick={() => handleNavigation(item)}
                          className="w-full flex items-center space-x-3 p-3 hover:bg-muted/30 transition-colors duration-150 border-t border-border first:border-t-0"
                        >
                          <Icon name={item?.icon} size={16} className="text-muted-foreground" />
                          <span className="text-sm text-foreground">{item?.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* User Status */}
            {isAuthenticated && (
              <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="User" size={16} className="text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">계정 정보</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  무료 플랜 사용 중
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Crown"
                  iconPosition="left"
                  fullWidth
                  className="justify-center"
                >
                  Pro로 업그레이드
                </Button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border bg-muted/20">
            <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
              <button className="hover:text-foreground transition-colors">
                개인정보처리방침
              </button>
              <span>•</span>
              <button className="hover:text-foreground transition-colors">
                이용약관
              </button>
            </div>
            <div className="text-center mt-2 text-xs text-muted-foreground">
              © 2024 PrintForge AI
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;