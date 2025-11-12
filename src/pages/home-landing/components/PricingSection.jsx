import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PricingSection = () => {
  const navigate = useNavigate();

  const pricingPlans = [
    {
      id: 'free',
      name: '무료 플랜',
      price: '₩0',
      period: '/월',
      description: '개인 사용자와 소규모 프로젝트에 적합',
      popular: false,
      features: [
        '월 5개 파일 변환',
        '기본 해상도 (512x512)',
        '표준 처리 속도',
        'STL 파일 다운로드',
        '커뮤니티 지원',
        '7일 클라우드 저장'
      ],
      limitations: [
        '배치 처리 불가',
        '고해상도 출력 제한',
        'API 접근 불가'
      ],
      ctaText: '무료로 시작하기',
      ctaVariant: 'outline'
    },
    {
      id: 'pro',
      name: 'Pro 플랜',
      price: '₩33,000',
      period: '/월',
      description: '전문가와 비즈니스 사용자를 위한 완전한 솔루션',
      popular: true,
      features: [
        '무제한 파일 변환',
        '고해상도 출력 (2048x2048)',
        '우선 처리 (2배 빠름)',
        '배치 처리 지원',
        '고급 품질 조정',
        '무제한 클라우드 저장',
        'API 접근 권한',
        '우선 고객 지원',
        '상업적 사용 라이선스'
      ],
      limitations: [],
      ctaText: 'Pro로 업그레이드',
      ctaVariant: 'default'
    }
  ];

  const handlePlanSelect = (planId) => {
    if (planId === 'free') {
      navigate('/file-upload-workspace');
    } else {
      navigate('/user-authentication');
    }
  };

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
            <Icon name="CreditCard" size={16} className="mr-2" />
            요금제
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            투명하고 합리적인 가격
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            필요에 맞는 플랜을 선택하세요. 언제든지 업그레이드하거나 다운그레이드할 수 있습니다.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {pricingPlans?.map((plan) => (
            <div
              key={plan?.id}
              className={`relative bg-white rounded-2xl shadow-elevation-2 border-2 transition-all duration-300 hover:shadow-elevation-3 ${
                plan?.popular 
                  ? 'border-primary scale-105 lg:scale-110' :'border-border hover:border-primary/50'
              }`}
            >
              {/* Popular Badge */}
              {plan?.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium">
                    가장 인기있는 플랜
                  </div>
                </div>
              )}

              <div className="p-8 lg:p-10">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {plan?.name}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {plan?.description}
                  </p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl lg:text-5xl font-bold text-foreground">
                      {plan?.price}
                    </span>
                    <span className="text-lg text-muted-foreground ml-1">
                      {plan?.period}
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <div className="mb-8">
                  <h4 className="font-semibold text-foreground mb-4 flex items-center">
                    <Icon name="Check" size={16} className="text-success mr-2" />
                    포함된 기능
                  </h4>
                  <ul className="space-y-3">
                    {plan?.features?.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Icon name="Check" size={16} className="text-success mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Limitations */}
                {plan?.limitations?.length > 0 && (
                  <div className="mb-8">
                    <h4 className="font-semibold text-foreground mb-4 flex items-center">
                      <Icon name="X" size={16} className="text-muted-foreground mr-2" />
                      제한사항
                    </h4>
                    <ul className="space-y-3">
                      {plan?.limitations?.map((limitation, index) => (
                        <li key={index} className="flex items-start">
                          <Icon name="X" size={16} className="text-muted-foreground mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA Button */}
                <Button
                  variant={plan?.ctaVariant}
                  size="lg"
                  fullWidth
                  onClick={() => handlePlanSelect(plan?.id)}
                  iconName="ArrowRight"
                  iconPosition="right"
                  className="text-lg py-4"
                >
                  {plan?.ctaText}
                </Button>

                {/* Additional Info */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    {plan?.id === 'free' ?'신용카드 불필요 • 즉시 시작' :'30일 무료 체험 • 언제든지 취소 가능'
                    }
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise Section */}
        <div className="mt-16 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 lg:p-12 text-center">
          <Icon name="Building" size={48} className="mx-auto mb-6 text-primary" />
          <h3 className="text-2xl font-bold text-foreground mb-4">
            기업용 솔루션이 필요하신가요?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            대량 처리, 맞춤형 통합, 전담 지원이 필요한 기업을 위한 특별 요금제를 제공합니다.
          </p>
          <Button
            variant="outline"
            size="lg"
            iconName="Mail"
            iconPosition="left"
          >
            영업팀 문의하기
          </Button>
        </div>

        {/* FAQ Link */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            요금제에 대해 궁금한 점이 있으신가요?{' '}
            <button 
              onClick={() => {
                const faqSection = document.querySelector('#faq');
                if (faqSection) {
                  faqSection?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-primary hover:underline font-medium"
            >
              자주 묻는 질문
            </button>
            을 확인해보세요.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;