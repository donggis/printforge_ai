import React from 'react';
import Icon from '../../../components/AppIcon';

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      title: "AI 기반 변환",
      description: "최신 머신러닝 알고리즘을 사용하여 2D 이미지에서 정확한 3D 형상을 추출하고 고품질 모델을 생성합니다.",
      icon: "Brain",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      id: 2,
      title: "다양한 파일 형식 지원",
      description: "JPG, PNG, SVG 등 일반적인 이미지 형식을 모두 지원하며, 스케치나 도면도 처리할 수 있습니다.",
      icon: "FileImage",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      id: 3,
      title: "빠른 처리 속도",
      description: "클라우드 기반 GPU 가속을 통해 몇 분 안에 3D 모델을 생성하여 작업 효율성을 극대화합니다.",
      icon: "Zap",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    },
    {
      id: 4,
      title: "전문가급 품질",
      description: "3D 프린팅과 CAD 소프트웨어에서 바로 사용할 수 있는 고해상도 STL 파일을 제공합니다.",
      icon: "Award",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
            <Icon name="Star" size={16} className="mr-2" />
            주요 기능
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            PrintForge AI의 강력한 기능들
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            전문적인 3D 모델링 지식 없이도 누구나 쉽게 사용할 수 있는 혁신적인 기능들을 제공합니다.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features?.map((feature) => (
            <div
              key={feature?.id}
              className="bg-white rounded-2xl p-8 shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-300 border border-border group hover:-translate-y-1"
            >
              {/* Icon */}
              <div className={`w-16 h-16 ${feature?.bgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <Icon name={feature?.icon} size={32} className={feature?.color} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {feature?.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature?.description}
              </p>

              {/* Learn More Link */}
              <div className="mt-6 flex items-center text-primary hover:text-primary/80 transition-colors cursor-pointer">
                <span className="text-sm font-medium">자세히 보기</span>
                <Icon name="ArrowRight" size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="mt-16 bg-white rounded-2xl p-8 lg:p-12 shadow-elevation-2">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                더 많은 고급 기능들
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Icon name="Check" size={20} className="text-success mt-0.5" />
                  <div>
                    <div className="font-medium text-foreground">배치 처리</div>
                    <div className="text-sm text-muted-foreground">여러 이미지를 한 번에 처리</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Icon name="Check" size={20} className="text-success mt-0.5" />
                  <div>
                    <div className="font-medium text-foreground">품질 조정</div>
                    <div className="text-sm text-muted-foreground">해상도와 디테일 수준 선택</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Icon name="Check" size={20} className="text-success mt-0.5" />
                  <div>
                    <div className="font-medium text-foreground">클라우드 저장소</div>
                    <div className="text-sm text-muted-foreground">프로젝트 히스토리 관리</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Icon name="Check" size={20} className="text-success mt-0.5" />
                  <div>
                    <div className="font-medium text-foreground">API 접근</div>
                    <div className="text-sm text-muted-foreground">개발자를 위한 RESTful API</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 text-center">
              <Icon name="Sparkles" size={48} className="mx-auto mb-4 text-primary" />
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Pro 플랜으로 업그레이드
              </h4>
              <p className="text-muted-foreground mb-4">
                모든 고급 기능을 무제한으로 사용하세요
              </p>
              <div className="text-2xl font-bold text-primary">
                ₩33,000<span className="text-sm font-normal text-muted-foreground">/월</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;