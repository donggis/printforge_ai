import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DemoSection = () => {
  const [activeDemo, setActiveDemo] = useState(0);

  const demoExamples = [
  {
    id: 0,
    title: "스케치에서 3D 모델로",
    description: "손으로 그린 간단한 스케치도 정확한 3D 모델로 변환됩니다.",
    inputImage: "https://images.unsplash.com/photo-1687365039631-324db39b7fee",
    inputAlt: "Hand-drawn architectural sketch of a simple house with pencil on white paper",
    outputImage: "https://images.unsplash.com/photo-1518892974594-4adbf359419c",
    outputAlt: "3D rendered model of a modern house with clean geometric lines and white surfaces",
    processingTime: "2분 30초",
    complexity: "중간"
  },
  {
    id: 1,
    title: "제품 사진에서 3D 모델로",
    description: "제품 사진을 업로드하면 3D 프린팅 가능한 모델을 생성합니다.",
    inputImage: "https://images.unsplash.com/photo-1608231387042-66d1773070a5",
    inputAlt: "White sneaker product photo on clean background showing side profile",
    outputImage: "https://images.unsplash.com/photo-1715693269004-232612f55d4e",
    outputAlt: "3D wireframe model of a sneaker showing geometric mesh structure",
    processingTime: "3분 15초",
    complexity: "높음"
  },
  {
    id: 2,
    title: "로고에서 3D 엠블럼으로",
    description: "2D 로고나 아이콘을 입체적인 3D 엠블럼으로 변환합니다.",
    inputImage: "https://img.rocket.new/generatedImages/rocket_gen_img_102de337d-1762832557331.png",
    inputAlt: "Simple geometric logo design with circular and triangular elements on white background",
    outputImage: "https://images.unsplash.com/photo-1691388772933-318c6cd86a60",
    outputAlt: "3D rendered metallic emblem with raised geometric patterns and reflective surface",
    processingTime: "1분 45초",
    complexity: "낮음"
  }];


  const handleDemoChange = (index) => {
    setActiveDemo(index);
  };

  return (
    <section id="demo" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
            <Icon name="Play" size={16} className="mr-2" />
            라이브 데모
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            실제 변환 과정을 확인해보세요
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            다양한 유형의 이미지가 어떻게 3D 모델로 변환되는지 실제 예시를 통해 확인할 수 있습니다.
          </p>
        </div>

        {/* Demo Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {demoExamples?.map((demo, index) =>
          <button
            key={demo?.id}
            onClick={() => handleDemoChange(index)}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
            activeDemo === index ?
            'bg-primary text-white shadow-elevation-2' :
            'bg-gray-100 text-muted-foreground hover:bg-gray-200'}`
            }>

              {demo?.title}
            </button>
          )}
        </div>

        {/* Demo Content */}
        <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Input Section */}
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  입력 이미지
                </h3>
                <p className="text-muted-foreground mb-6">
                  {demoExamples?.[activeDemo]?.description}
                </p>
              </div>

              <div className="relative bg-white rounded-xl p-6 shadow-elevation-2">
                <div className="aspect-[4/3] rounded-lg overflow-hidden mb-4">
                  <Image
                    src={demoExamples?.[activeDemo]?.inputImage}
                    alt={demoExamples?.[activeDemo]?.inputAlt}
                    className="w-full h-full object-cover" />

                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Icon name="Clock" size={16} className="mr-2" />
                    처리 시간: {demoExamples?.[activeDemo]?.processingTime}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  demoExamples?.[activeDemo]?.complexity === '낮음' ? 'bg-green-100 text-green-700' :
                  demoExamples?.[activeDemo]?.complexity === '중간' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`
                  }>
                    복잡도: {demoExamples?.[activeDemo]?.complexity}
                  </div>
                </div>
              </div>
            </div>

            {/* Process Arrow */}
            <div className="flex lg:flex-col items-center justify-center">
              <div className="hidden lg:block">
                <Icon name="ArrowRight" size={32} className="text-primary" />
              </div>
              <div className="lg:hidden">
                <Icon name="ArrowDown" size={32} className="text-primary" />
              </div>
              
              <div className="mx-4 lg:mx-0 lg:my-4 flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>

            {/* Output Section */}
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  3D 모델 결과
                </h3>
                <p className="text-muted-foreground mb-6">
                  AI가 생성한 고품질 3D 모델을 STL 형식으로 다운로드할 수 있습니다.
                </p>
              </div>

              <div className="relative bg-white rounded-xl p-6 shadow-elevation-2">
                <div className="aspect-[4/3] rounded-lg overflow-hidden mb-4 relative">
                  <Image
                    src={demoExamples?.[activeDemo]?.outputImage}
                    alt={demoExamples?.[activeDemo]?.outputAlt}
                    className="w-full h-full object-cover" />

                  
                  {/* 3D Model Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent flex items-end justify-start p-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center space-x-2">
                      <Icon name="Box" size={16} className="text-primary" />
                      <span className="text-sm font-medium text-foreground">3D 모델</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Icon name="FileText" size={16} className="mr-1" />
                      STL 형식
                    </div>
                    <div className="flex items-center">
                      <Icon name="Download" size={16} className="mr-1" />
                      다운로드 가능
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Eye"
                    iconPosition="left">

                    3D 뷰어
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Demo Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-muted-foreground">정확도</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">2.5분</div>
              <div className="text-sm text-muted-foreground">평균 처리시간</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">STL</div>
              <div className="text-sm text-muted-foreground">출력 형식</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">4K+</div>
              <div className="text-sm text-muted-foreground">완료된 변환</div>
            </div>
          </div>
        </div>

        {/* Try It Now CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            직접 체험해보세요
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            무료 플랜으로 지금 바로 시작하여 여러분의 이미지를 3D 모델로 변환해보세요.
          </p>
          <Button
            variant="default"
            size="lg"
            iconName="Upload"
            iconPosition="left"
            className="text-lg px-8 py-4"
            onClick={() => {
              const uploadSection = document.querySelector('#upload');
              if (uploadSection) {
                uploadSection?.scrollIntoView({ behavior: 'smooth' });
              }
            }}>

            무료로 시작하기
          </Button>
        </div>
      </div>
    </section>);

};

export default DemoSection;