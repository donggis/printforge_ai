import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleStartNow = () => {
    navigate('/file-upload-workspace');
  };

  const handleSeeDemo = () => {
    const demoSection = document.querySelector('#demo');
    if (demoSection) {
      demoSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-white py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-6">
              <Icon name="Sparkles" size={16} className="mr-2" />
              AI 기반 3D 모델 생성
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              2D 이미지를{' '}
              <span className="text-primary">3D 모델로</span>{' '}
              변환하세요
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
              복잡한 3D 모델링 소프트웨어 없이도 AI의 힘으로 JPG, PNG, SVG 이미지를 전문적인 STL 파일로 변환할 수 있습니다.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                variant="default"
                size="lg"
                onClick={handleStartNow}
                iconName="ArrowRight"
                iconPosition="right"
                className="text-lg px-8 py-4"
              >
                지금 시작하기
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleSeeDemo}
                iconName="Play"
                iconPosition="left"
                className="text-lg px-8 py-4"
              >
                데모 보기
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Icon name="Shield" size={16} className="mr-2 text-success" />
                무료로 시작
              </div>
              <div className="flex items-center">
                <Icon name="Zap" size={16} className="mr-2 text-warning" />
                빠른 처리 속도
              </div>
              <div className="flex items-center">
                <Icon name="Download" size={16} className="mr-2 text-primary" />
                STL 파일 다운로드
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-elevation-3 p-8 lg:p-12">
              {/* 3D Cube Visualization */}
              <div className="flex items-center justify-center mb-8">
                <div className="relative w-48 h-48 lg:w-56 lg:h-56">
                  {/* Main Cube */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80 rounded-xl transform rotate-12 shadow-elevation-2"></div>
                  <div className="absolute inset-2 bg-gradient-to-br from-accent to-accent/80 rounded-xl transform -rotate-6 shadow-elevation-2"></div>
                  <div className="absolute inset-4 bg-gradient-to-br from-white to-gray-100 rounded-xl flex items-center justify-center shadow-elevation-1">
                    <Icon name="Box" size={64} className="text-primary" />
                  </div>
                </div>
              </div>

              {/* Process Arrow */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                    <Icon name="Image" size={20} className="text-muted-foreground" />
                  </div>
                  <Icon name="ArrowRight" size={20} className="text-primary" />
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Icon name="Cpu" size={20} className="text-white" />
                  </div>
                  <Icon name="ArrowRight" size={20} className="text-primary" />
                  <div className="w-12 h-12 bg-success rounded-lg flex items-center justify-center">
                    <Icon name="Box" size={20} className="text-white" />
                  </div>
                </div>
              </div>

              {/* Sample Files */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <Icon name="FileImage" size={24} className="mx-auto mb-2 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">JPG</span>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <Icon name="FileImage" size={24} className="mx-auto mb-2 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">PNG</span>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <Icon name="FileText" size={24} className="mx-auto mb-2 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">SVG</span>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-success/20 rounded-full flex items-center justify-center">
              <Icon name="Check" size={24} className="text-success" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-warning/20 rounded-full flex items-center justify-center">
              <Icon name="Zap" size={16} className="text-warning" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;