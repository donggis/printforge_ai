import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from './Button';
import Icon from '../AppIcon';
import AuthenticationModal from './AuthenticationModal';

const MainHeader = () => {
  const { user, userProfile, signOut } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');

  const handleAuthClick = (mode = 'login') => {
    setAuthModalMode(mode);
    setShowAuthModal(true);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.href = '/'; // Redirect to home after logout
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Icon name="Box" size={20} color="white" />
              </div>
              <span className="text-xl font-bold text-foreground">PrintForge AI</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-foreground hover:text-primary transition-colors">
                홈
              </Link>
              <Link to="/file-upload-workspace" className="text-foreground hover:text-primary transition-colors">
                워크스페이스
              </Link>
              <Link to="/model-download-center" className="text-foreground hover:text-primary transition-colors">
                다운로드
              </Link>
              <Link to="/ai-processing-dashboard" className="text-foreground hover:text-primary transition-colors">
                대시보드
              </Link>
            </div>

            {/* User Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name="User" size={16} className="text-primary" />
                    </div>
                    <div className="text-sm">
                      <p className="font-medium text-foreground">
                        {userProfile?.full_name || user?.email?.split('@')?.[0]}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {userProfile?.account_tier === 'pro' ? 'Pro' : 'Free'}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSignOut}
                    iconName="LogOut"
                    iconPosition="left"
                  >
                    로그아웃
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleAuthClick('login')}
                  >
                    로그인
                  </Button>
                  <Button 
                    variant="default"
                    onClick={() => handleAuthClick('register')}
                  >
                    회원가입
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <Icon name={showMobileMenu ? "X" : "Menu"} size={20} />
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {showMobileMenu && (
            <div className="md:hidden py-4 border-t border-border">
              <div className="space-y-4">
                <Link 
                  to="/" 
                  className="block text-foreground hover:text-primary transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  홈
                </Link>
                <Link 
                  to="/file-upload-workspace" 
                  className="block text-foreground hover:text-primary transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  워크스페이스
                </Link>
                <Link 
                  to="/model-download-center" 
                  className="block text-foreground hover:text-primary transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  다운로드
                </Link>
                <Link 
                  to="/ai-processing-dashboard" 
                  className="block text-foreground hover:text-primary transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  대시보드
                </Link>
                
                {user ? (
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon name="User" size={16} className="text-primary" />
                      </div>
                      <div className="text-sm">
                        <p className="font-medium text-foreground">
                          {userProfile?.full_name || user?.email?.split('@')?.[0]}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {userProfile?.account_tier === 'pro' ? 'Pro' : 'Free'}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={handleSignOut}
                      iconName="LogOut"
                      iconPosition="left"
                    >
                      로그아웃
                    </Button>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-border space-y-2">
                    <Button 
                      variant="ghost" 
                      fullWidth
                      onClick={() => {
                        handleAuthClick('login');
                        setShowMobileMenu(false);
                      }}
                    >
                      로그인
                    </Button>
                    <Button 
                      variant="default"
                      fullWidth
                      onClick={() => {
                        handleAuthClick('register');
                        setShowMobileMenu(false);
                      }}
                    >
                      회원가입
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </nav>
      </header>
      {/* Authentication Modal */}
      <AuthenticationModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthenticated={handleAuthSuccess}
        initialMode={authModalMode}
      />
    </>
  );
};

export default MainHeader;