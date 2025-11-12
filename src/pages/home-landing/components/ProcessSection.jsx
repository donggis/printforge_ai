import React from 'react';
import Icon from '../../../components/AppIcon';

const ProcessSection = () => {
  const processSteps = [
    {
      id: 1,
      title: "파일 업로드",
      description: "JPG, PNG, SVG 형식의 2D 이미지나 스케치를 업로드하세요. 드래그 앤 드롭으로 간편하게 파일을 추가할 수 있습니다.",
      icon: "Upload",
      color: "bg-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      id: 2,
      title: "AI 처리",
      description: "고급 AI 알고리즘이 이미지를 분석하고 OpenSCAD 코드를 생성하여 정확한 3D 모델을 만듭니다.",
      icon: "Cpu",
      color: "bg-purple-500",
      bgColor: "bg-purple-50"
    },
    {
      id: 3,
      title: "STL 다운로드",
      description: "완성된 3D 모델을 STL 형식으로 다운로드하여 3D 프린터나 다른 3D 소프트웨어에서 사용하세요.",
      icon: "Download",
      color: "bg-green-500",
      bgColor: "bg-green-50"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            간단한 3단계 프로세스
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            복잡한 설정이나 전문 지식 없이도 몇 분 안에 2D 이미지를 3D 모델로 변환할 수 있습니다.
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Lines - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-muted transform -translate-y-1/2 z-0"></div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative z-10">
            {processSteps?.map((step, index) => (
              <div key={step?.id} className="relative">
                {/* Mobile Connection Line */}
                {index < processSteps?.length - 1 && (
                  <div className="md:hidden absolute left-1/2 top-24 w-0.5 h-16 bg-muted transform -translate-x-1/2 z-0"></div>
                )}

                {/* Step Card */}
                <div className="relative bg-white rounded-2xl p-8 shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-300 border border-border">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-8 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {step?.id}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 ${step?.bgColor} rounded-xl flex items-center justify-center mb-6`}>
                    <Icon name={step?.icon} size={32} className={`${step?.color?.replace('bg-', 'text-')}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {step?.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step?.description}
                  </p>

                  {/* Progress Indicator */}
                  <div className="mt-6 flex items-center space-x-2">
                    <div className={`w-2 h-2 ${step?.color} rounded-full`}></div>
                    <div className="text-sm text-muted-foreground">
                      단계 {step?.id}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">30초</div>
            <div className="text-sm text-muted-foreground">평균 업로드 시간</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">2분</div>
            <div className="text-sm text-muted-foreground">AI 처리 시간</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">95%</div>
            <div className="text-sm text-muted-foreground">정확도</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">STL</div>
            <div className="text-sm text-muted-foreground">출력 형식</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;