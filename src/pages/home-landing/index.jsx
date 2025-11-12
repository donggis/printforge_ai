import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import MainHeader from '../../components/ui/MainHeader';
import AuthenticationModal from '../../components/ui/AuthenticationModal';
import HeroSection from './components/HeroSection';
import ProcessSection from './components/ProcessSection';
import FeaturesSection from './components/FeaturesSection';
import PricingSection from './components/PricingSection';
import DemoSection from './components/DemoSection';
import FAQSection from './components/FAQSection';
import FooterSection from './components/FooterSection';

const HomeLanding = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');

  useEffect(() => {
    // Smooth scroll behavior for anchor links
    const handleHashChange = () => {
      const hash = window.location?.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          setTimeout(() => {
            element?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    };

    // Handle initial hash on page load
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleAuthClick = (mode = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleAuthModalClose = () => {
    setIsAuthModalOpen(false);
  };

  const handleAuthenticated = (userData) => {
    // Handle successful authentication
    console.log('User authenticated:', userData);
    setIsAuthModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>PrintForge AI - 2D 이미지를 3D 모델로 변환하는 AI 플랫폼</title>
        <meta 
          name="description" 
          content="AI의 힘으로 JPG, PNG, SVG 이미지를 전문적인 STL 3D 모델로 변환하세요. 복잡한 3D 모델링 소프트웨어 없이도 몇 분 안에 고품질 3D 모델을 생성할 수 있습니다." 
        />
        <meta name="keywords" content="AI, 3D 모델링, 이미지 변환, STL, 3D 프린팅, PrintForge" />
        <meta property="og:title" content="PrintForge AI - 2D 이미지를 3D 모델로 변환" />
        <meta property="og:description" content="AI 기반 3D 모델 생성 플랫폼으로 2D 이미지를 전문적인 3D 모델로 변환하세요." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://printforge.ai/home-landing" />
      </Helmet>

      {/* Header */}
      <MainHeader 
        isAuthenticated={false} 
        onAuthClick={handleAuthClick}
        onSignUpClick={handleAuthClick}
      />

      {/* Authentication Modal */}
      <AuthenticationModal
        isOpen={isAuthModalOpen}
        onClose={handleAuthModalClose}
        onAuthenticated={handleAuthenticated}
        initialMode={authModalMode}
      />

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <HeroSection />

        {/* Process Section */}
        <ProcessSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* Demo Section */}
        <DemoSection />

        {/* Pricing Section */}
        <PricingSection />

        {/* FAQ Section */}
        <FAQSection />
      </main>

      {/* Footer */}
      <FooterSection />
    </div>
  );
};

export default HomeLanding;