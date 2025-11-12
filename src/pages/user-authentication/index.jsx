import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MainHeader from '../../components/ui/MainHeader';
import AuthenticationTabs from './components/AuthenticationTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ProBenefitsPanel from './components/ProBenefitsPanel';
import Icon from '../../components/AppIcon';

const UserAuthentication = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user is already authenticated
    const storedUser = localStorage.getItem('user');
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    
    if (storedUser && isAuthenticated === 'true') {
      setUser(JSON.parse(storedUser));
      navigate('/file-upload-workspace');
    }

    // Check if there's a preferred tab from URL params
    const urlParams = new URLSearchParams(location.search);
    const tab = urlParams?.get('tab');
    if (tab === 'register') {
      setActiveTab('register');
    }
  }, [navigate, location]);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    // Navigation is handled within the form components
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Update URL without causing a page reload
    const newUrl = new URL(window.location);
    newUrl?.searchParams?.set('tab', tab);
    window.history?.replaceState({}, '', newUrl);
  };

  return (
    <div className="min-h-screen bg-background">
      <MainHeader 
        isAuthenticated={!!user}
        onAuthClick={() => setActiveTab('login')}
      />
      <div className="pt-16">
        <div className="min-h-screen flex">
          {/* Main Authentication Area */}
          <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
            <div className="w-full max-w-md">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name="Box" size={32} color="white" />
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  PrintForge AI에 오신 것을 환영합니다
                </h1>
                <p className="text-muted-foreground">
                  {activeTab === 'login' ?'계정에 로그인하여 3D 모델 생성을 시작하세요' :'새 계정을 만들어 AI 기반 3D 모델링을 경험해보세요'
                  }
                </p>
              </div>

              {/* Authentication Tabs */}
              <AuthenticationTabs 
                activeTab={activeTab} 
                onTabChange={handleTabChange} 
              />

              {/* Authentication Forms */}
              <div className="bg-white rounded-lg shadow-elevation-2 p-6">
                {activeTab === 'login' ? (
                  <LoginForm onSuccess={handleAuthSuccess} />
                ) : (
                  <RegisterForm onSuccess={handleAuthSuccess} />
                )}
              </div>

              {/* Additional Info */}
              <div className="mt-6 text-center">
                <p className="text-xs text-muted-foreground">
                  계속 진행하시면{' '}
                  <button className="text-primary hover:underline">이용약관</button> 및{' '}
                  <button className="text-primary hover:underline">개인정보처리방침</button>에 동의하는 것으로 간주됩니다.
                </p>
              </div>
            </div>
          </div>

          {/* Pro Benefits Panel - Desktop Only */}
          <div className="hidden lg:block w-96 bg-muted/30 p-8">
            <div className="sticky top-24">
              <ProBenefitsPanel />
            </div>
          </div>
        </div>

        {/* Mobile Pro Benefits */}
        <div className="lg:hidden bg-muted/30 p-4">
          <ProBenefitsPanel />
        </div>

        {/* Trust Indicators */}
        <div className="bg-white border-t border-border py-8">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                신뢰할 수 있는 AI 3D 모델링 플랫폼
              </h3>
              <p className="text-muted-foreground">
                전 세계 10,000+ 디자이너들이 선택한 PrintForge AI
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon name="Shield" size={24} className="text-success" />
                </div>
                <h4 className="font-medium text-foreground mb-1">보안 인증</h4>
                <p className="text-sm text-muted-foreground">
                  ISO 27001 인증 및 GDPR 준수
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon name="Zap" size={24} className="text-primary" />
                </div>
                <h4 className="font-medium text-foreground mb-1">빠른 처리</h4>
                <p className="text-sm text-muted-foreground">
                  평균 30초 내 3D 모델 생성
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon name="Award" size={24} className="text-accent" />
                </div>
                <h4 className="font-medium text-foreground mb-1">품질 보장</h4>
                <p className="text-sm text-muted-foreground">
                  99.9% 성공률의 AI 변환 기술
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-foreground text-white py-8">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
                  <Icon name="Box" size={14} color="white" />
                </div>
                <span className="font-semibold">PrintForge AI</span>
              </div>
              
              <div className="flex items-center space-x-6 text-sm">
                <button className="hover:text-primary transition-colors">
                  고객지원
                </button>
                <button className="hover:text-primary transition-colors">
                  개인정보처리방침
                </button>
                <button className="hover:text-primary transition-colors">
                  이용약관
                </button>
              </div>
            </div>
            
            <div className="border-t border-white/20 mt-6 pt-6 text-center text-sm text-white/70">
              © {new Date()?.getFullYear()} PrintForge AI. 모든 권리 보유.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default UserAuthentication;