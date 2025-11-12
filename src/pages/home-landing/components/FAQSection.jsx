import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqData = [
    {
      id: 1,
      question: "PrintForge AI는 어떤 이미지 형식을 지원하나요?",
      answer: "JPG, PNG, SVG 형식의 이미지를 지원합니다. 사진, 스케치, 도면 등 다양한 종류의 2D 이미지를 업로드할 수 있으며, 각 형식에 최적화된 AI 처리 알고리즘을 사용합니다."
    },
    {
      id: 2,
      question: "3D 모델 생성에는 얼마나 시간이 걸리나요?",
      answer: "일반적으로 2-5분 정도 소요됩니다. 이미지의 복잡도와 선택한 품질 설정에 따라 처리 시간이 달라질 수 있습니다. Pro 플랜 사용자는 우선 처리 큐를 통해 더 빠른 결과를 받을 수 있습니다."
    },
    {
      id: 3,
      question: "생성된 3D 모델의 품질은 어느 정도인가요?",
      answer: "AI가 생성한 3D 모델은 3D 프린팅과 CAD 소프트웨어에서 바로 사용할 수 있는 전문가급 품질입니다. STL 형식으로 제공되며, 해상도와 디테일 수준을 조정할 수 있습니다."
    },
    {
      id: 4,
      question: "무료 플랜과 Pro 플랜의 주요 차이점은 무엇인가요?",
      answer: "무료 플랜은 월 5개 파일 제한과 기본 해상도를 제공하며, Pro 플랜은 무제한 변환, 고해상도 출력, 배치 처리, API 접근, 우선 지원 등의 고급 기능을 포함합니다."
    },
    {
      id: 5,
      question: "상업적 목적으로 사용할 수 있나요?",
      answer: "Pro 플랜 구독자는 생성된 3D 모델을 상업적 목적으로 자유롭게 사용할 수 있습니다. 무료 플랜은 개인적, 비상업적 용도로만 사용 가능합니다."
    },
    {
      id: 6,
      question: "데이터 보안과 개인정보 보호는 어떻게 되나요?",
      answer: "업로드된 모든 이미지와 생성된 모델은 암호화되어 저장되며, 사용자만 접근할 수 있습니다. 무료 플랜은 7일, Pro 플랜은 무제한 클라우드 저장을 제공합니다."
    },
    {
      id: 7,
      question: "API를 통한 통합이 가능한가요?",
      answer: "Pro 플랜 사용자는 RESTful API를 통해 PrintForge AI를 자신의 애플리케이션이나 워크플로우에 통합할 수 있습니다. 상세한 API 문서와 SDK를 제공합니다."
    },
    {
      id: 8,
      question: "환불 정책은 어떻게 되나요?",
      answer: "Pro 플랜은 30일 무료 체험을 제공하며, 구독 후 30일 이내에는 전액 환불이 가능합니다. 언제든지 구독을 취소할 수 있으며, 다음 결제일까지 서비스를 계속 이용할 수 있습니다."
    }
  ];

  const toggleFAQ = (faqId) => {
    setOpenFAQ(openFAQ === faqId ? null : faqId);
  };

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
            <Icon name="HelpCircle" size={16} className="mr-2" />
            자주 묻는 질문
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            궁금한 점이 있으신가요?
          </h2>
          <p className="text-xl text-muted-foreground">
            PrintForge AI에 대해 자주 묻는 질문들을 모았습니다. 더 궁금한 점이 있으시면 언제든지 문의해주세요.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqData?.map((faq) => (
            <div
              key={faq?.id}
              className="bg-white rounded-xl shadow-elevation-1 border border-border overflow-hidden"
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(faq?.id)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors duration-150"
              >
                <h3 className="text-lg font-semibold text-foreground pr-4">
                  {faq?.question}
                </h3>
                <Icon
                  name="ChevronDown"
                  size={20}
                  className={`text-muted-foreground transition-transform duration-300 flex-shrink-0 ${
                    openFAQ === faq?.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Answer */}
              {openFAQ === faq?.id && (
                <div className="px-6 pb-6 border-t border-border">
                  <div className="pt-4 text-muted-foreground leading-relaxed">
                    {faq?.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-elevation-2 text-center">
          <Icon name="MessageCircle" size={48} className="mx-auto mb-6 text-primary" />
          <h3 className="text-xl font-bold text-foreground mb-4">
            답변을 찾지 못하셨나요?
          </h3>
          <p className="text-muted-foreground mb-6">
            저희 지원팀이 도와드리겠습니다. 언제든지 문의해주세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
              <Icon name="Mail" size={16} className="mr-2" />
              이메일 문의
            </button>
            <button className="inline-flex items-center justify-center px-6 py-3 border border-border text-foreground rounded-lg hover:bg-gray-50 transition-colors">
              <Icon name="MessageSquare" size={16} className="mr-2" />
              라이브 채팅
            </button>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <Icon name="BookOpen" size={32} className="mx-auto mb-3 text-primary" />
            <h4 className="font-semibold text-foreground mb-2">사용 가이드</h4>
            <p className="text-sm text-muted-foreground">
              단계별 사용법과 팁을 확인하세요
            </p>
          </div>
          <div className="text-center">
            <Icon name="Video" size={32} className="mx-auto mb-3 text-primary" />
            <h4 className="font-semibold text-foreground mb-2">비디오 튜토리얼</h4>
            <p className="text-sm text-muted-foreground">
              영상으로 배우는 PrintForge AI
            </p>
          </div>
          <div className="text-center">
            <Icon name="Users" size={32} className="mx-auto mb-3 text-primary" />
            <h4 className="font-semibold text-foreground mb-2">커뮤니티</h4>
            <p className="text-sm text-muted-foreground">
              다른 사용자들과 경험을 공유하세요
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;