import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProBenefitsPanel = () => {
  const navigate = useNavigate();

  const proBenefits = [
  {
    icon: 'Zap',
    title: '무제한 변환',
    description: '월 제한 없이 무제한으로 2D 이미지를 3D 모델로 변환하세요'
  },
  {
    icon: 'Clock',
    title: '우선 처리',
    description: 'Pro 사용자 전용 서버로 더 빠른 AI 처리 속도를 경험하세요'
  },
  {
    icon: 'Download',
    title: '고품질 출력',
    description: '최고 해상도의 STL 파일과 추가 포맷 지원을 받으세요'
  },
  {
    icon: 'Headphones',
    title: '우선 지원',
    description: '전담 고객지원팀의 24/7 우선 기술 지원을 받으세요'
  }];


  const testimonials = [
  {
    name: '김민수',
    role: '제품 디자이너',
    company: '테크스타트업',
    content: `PrintForge AI 덕분에 프로토타입 제작 시간이 80% 단축되었습니다.\n정말 혁신적인 도구예요!`,
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1594c6964-1762273590674.png",
    avatarAlt: 'Professional headshot of Korean man in glasses wearing navy blazer'
  },
  {
    name: '박지영',
    role: '건축가',
    company: '디자인스튜디오',
    content: `클라이언트에게 3D 모델을 빠르게 보여줄 수 있어서\n업무 효율성이 크게 향상되었습니다.`,
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1eb79f7aa-1762249002163.png",
    avatarAlt: 'Professional headshot of Korean woman with short black hair in white shirt'
  }];


  return (
    <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-6 rounded-lg">
      {/* Pro Badge */}
      <div className="flex items-center justify-center mb-6">
        <div className="bg-gradient-to-r from-primary to-accent text-white px-4 py-2 rounded-full flex items-center space-x-2">
          <Icon name="Crown" size={16} />
          <span className="font-semibold text-sm">PrintForge AI Pro</span>
        </div>
      </div>
      {/* Pricing */}
      <div className="text-center mb-6">
        <div className="flex items-baseline justify-center space-x-1">
          <span className="text-3xl font-bold text-foreground">₩33,000</span>
          <span className="text-muted-foreground">/월</span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          첫 달 50% 할인 (₩16,500)
        </p>
      </div>
      {/* Benefits */}
      <div className="space-y-4 mb-6">
        {proBenefits?.map((benefit, index) =>
        <div key={index} className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name={benefit?.icon} size={16} className="text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground text-sm">{benefit?.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{benefit?.description}</p>
            </div>
          </div>
        )}
      </div>
      {/* Security Badge */}
      <div className="bg-white/50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Icon name="Shield" size={16} className="text-success" />
          <span className="text-sm font-medium text-foreground">SSL 보안 인증</span>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          256비트 암호화로 안전하게 보호됩니다
        </p>
      </div>
      {/* Testimonials */}
      <div className="space-y-4 mb-6">
        <h4 className="font-semibold text-foreground text-center text-sm">고객 후기</h4>
        {testimonials?.map((testimonial, index) =>
        <div key={index} className="bg-white/70 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
              <Image
              src={testimonial?.avatar}
              alt={testimonial?.avatarAlt}
              className="w-8 h-8 rounded-full object-cover" />

              <div>
                <div className="font-medium text-foreground text-sm">{testimonial?.name}</div>
                <div className="text-xs text-muted-foreground">
                  {testimonial?.role} • {testimonial?.company}
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">
              "{testimonial?.content}"
            </p>
          </div>
        )}
      </div>
      {/* CTA */}
      <Button
        variant="default"
        fullWidth
        iconName="ArrowRight"
        iconPosition="right"
        onClick={() => navigate('/file-upload-workspace')}
        className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">

        Pro로 시작하기
      </Button>
      <p className="text-xs text-muted-foreground text-center mt-3">
        언제든지 취소 가능 • 환불 보장
      </p>
    </div>);

};

export default ProBenefitsPanel;