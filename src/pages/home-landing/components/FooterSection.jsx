import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const FooterSection = () => {
  const navigate = useNavigate();
  const currentYear = new Date()?.getFullYear();

  const footerSections = [
    {
      title: '제품',
      links: [
        { label: '기능', href: '#features', type: 'section' },
        { label: '요금제', href: '#pricing', type: 'section' },
        { label: 'API 문서', href: '#documentation', type: 'section' },
        { label: '업데이트', href: '/updates', type: 'route' }
      ]
    },
    {
      title: '지원',
      links: [
        { label: 'FAQ', href: '#faq', type: 'section' },
        { label: '사용 가이드', href: '/guide', type: 'route' },
        { label: '고객 지원', href: '/support', type: 'route' },
        { label: '커뮤니티', href: '/community', type: 'route' }
      ]
    },
    {
      title: '회사',
      links: [
        { label: '회사 소개', href: '/about', type: 'route' },
        { label: '블로그', href: '/blog', type: 'route' },
        { label: '채용', href: '/careers', type: 'route' },
        { label: '파트너십', href: '/partners', type: 'route' }
      ]
    },
    {
      title: '법적 고지',
      links: [
        { label: '개인정보처리방침', href: '/privacy', type: 'route' },
        { label: '이용약관', href: '/terms', type: 'route' },
        { label: '쿠키 정책', href: '/cookies', type: 'route' },
        { label: '라이선스', href: '/license', type: 'route' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'GitHub', icon: 'Github', href: 'https://github.com' },
    { name: 'Twitter', icon: 'Twitter', href: 'https://twitter.com' },
    { name: 'LinkedIn', icon: 'Linkedin', href: 'https://linkedin.com' },
    { name: 'YouTube', icon: 'Youtube', href: 'https://youtube.com' }
  ];

  const handleNavigation = (link) => {
    if (link?.type === 'section') {
      const element = document.querySelector(link?.href);
      if (element) {
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (link?.type === 'route') {
      navigate(link?.href);
    }
  };

  const handleLogoClick = () => {
    navigate('/home-landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <button
              onClick={handleLogoClick}
              className="flex items-center space-x-2 mb-6 hover:opacity-80 transition-opacity duration-150"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Box" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold">PrintForge AI</span>
            </button>
            
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              AI의 힘으로 2D 이미지를 전문적인 3D 모델로 변환하는 혁신적인 플랫폼입니다. 
              복잡한 3D 모델링 지식 없이도 누구나 쉽게 사용할 수 있습니다.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <Icon name="Mail" size={16} className="text-gray-400" />
                <span className="text-gray-300">support@printforge.ai</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Phone" size={16} className="text-gray-400" />
                <span className="text-gray-300">+82 2-1234-5678</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="MapPin" size={16} className="text-gray-400" />
                <span className="text-gray-300">서울특별시 강남구 테헤란로 123</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks?.map((social) => (
                <a
                  key={social?.name}
                  href={social?.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors duration-300"
                  aria-label={social?.name}
                >
                  <Icon name={social?.icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerSections?.map((section) => (
              <div key={section?.title}>
                <h3 className="font-semibold text-white mb-4">
                  {section?.title}
                </h3>
                <ul className="space-y-3">
                  {section?.links?.map((link) => (
                    <li key={link?.label}>
                      <button
                        onClick={() => handleNavigation(link)}
                        className="text-gray-300 hover:text-white transition-colors duration-150 text-sm"
                      >
                        {link?.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Newsletter Section */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                최신 소식을 받아보세요
              </h3>
              <p className="text-gray-300 text-sm">
                새로운 기능과 업데이트 소식을 가장 먼저 받아보세요.
              </p>
            </div>
            <div className="flex space-x-3">
              <input
                type="email"
                placeholder="이메일 주소를 입력하세요"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-150 flex items-center space-x-2">
                <span>구독</span>
                <Icon name="ArrowRight" size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} PrintForge AI. 모든 권리 보유.
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <button className="text-gray-400 hover:text-white transition-colors">
                개인정보처리방침
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                이용약관
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                쿠키 설정
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-primary text-white rounded-full shadow-elevation-3 hover:bg-primary/90 transition-all duration-300 hover:scale-110 z-40"
        aria-label="맨 위로 이동"
      >
        <Icon name="ArrowUp" size={20} className="mx-auto" />
      </button>
    </footer>
  );
};

export default FooterSection;