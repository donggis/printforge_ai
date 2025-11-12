import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const AuthenticationModal = ({ isOpen, onClose, onAuthenticated, initialMode = 'login' }) => {
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const [mode, setMode] = useState(initialMode);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        agreeToTerms: false
      });
      setErrors({});
    }
  }, [isOpen, initialMode]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e?.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = '이메일을 입력해주세요';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요';
    }

    if (!formData?.password) {
      newErrors.password = '비밀번호를 입력해주세요';
    } else if (formData?.password?.length < 6) {
      newErrors.password = '비밀번호는 최소 6자 이상이어야 합니다';
    }

    if (mode === 'register') {
      if (!formData?.name) {
        newErrors.name = '이름을 입력해주세요';
      }

      if (!formData?.confirmPassword) {
        newErrors.confirmPassword = '비밀번호 확인을 입력해주세요';
      } else if (formData?.password !== formData?.confirmPassword) {
        newErrors.confirmPassword = '비밀번호가 일치하지 않습니다';
      }

      if (!formData?.agreeToTerms) {
        newErrors.agreeToTerms = '이용약관에 동의해주세요';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});
    
    try {
      let result;
      
      if (mode === 'login') {
        result = await signIn(formData?.email, formData?.password);
      } else {
        result = await signUp(formData?.email, formData?.password, {
          fullName: formData?.name
        });
      }

      const { data, error } = result;

      if (error) {
        setErrors({ 
          submit: error?.message || '인증에 실패했습니다. 다시 시도해주세요.' 
        });
        return;
      }

      if (data?.user) {
        if (onAuthenticated) {
          onAuthenticated(data?.user);
        }
        onClose();
      }
    } catch (error) {
      setErrors({ submit: '인증에 실패했습니다. 다시 시도해주세요.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      console.log('🚀 User clicked Google Auth button');
      setIsLoading(true);
      setErrors({});
      
      // Clear any previous errors
      const { data, error } = await signInWithGoogle();
      
      if (error) {
        console.error('❌ Google auth failed:', error);
        setErrors({ 
          submit: error?.message || 'Google 인증에 실패했습니다.' 
        });
        return;
      }

      console.log('✅ Google auth initiated, closing modal');
      // Google OAuth redirects automatically, so close the modal
      onClose();
    } catch (error) {
      console.error('❌ Google auth exception:', error);
      setErrors({ 
        submit: error?.message || 'Google 인증에 실패했습니다. 다시 시도해주세요.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 bg-white rounded-lg shadow-elevation-3 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            {mode === 'login' ? '로그인' : '회원가입'}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-muted"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <Input
                label="이름"
                type="text"
                placeholder="이름을 입력하세요"
                value={formData?.name}
                onChange={(e) => handleInputChange('name', e?.target?.value)}
                error={errors?.name}
                required
              />
            )}

            <Input
              label="이메일"
              type="email"
              placeholder="이메일을 입력하세요"
              value={formData?.email}
              onChange={(e) => handleInputChange('email', e?.target?.value)}
              error={errors?.email}
              required
            />

            <Input
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={formData?.password}
              onChange={(e) => handleInputChange('password', e?.target?.value)}
              error={errors?.password}
              required
            />

            {mode === 'register' && (
              <>
                <Input
                  label="비밀번호 확인"
                  type="password"
                  placeholder="비밀번호를 다시 입력하세요"
                  value={formData?.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
                  error={errors?.confirmPassword}
                  required
                />

                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    checked={formData?.agreeToTerms}
                    onChange={(e) => handleInputChange('agreeToTerms', e?.target?.checked)}
                    className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-primary"
                  />
                  <label htmlFor="agreeToTerms" className="text-sm text-muted-foreground">
                    <span className="text-primary cursor-pointer hover:underline">이용약관</span> 및{' '}
                    <span className="text-primary cursor-pointer hover:underline">개인정보처리방침</span>에 동의합니다
                  </label>
                </div>
                {errors?.agreeToTerms && (
                  <p className="text-sm text-error">{errors?.agreeToTerms}</p>
                )}
              </>
            )}

            {errors?.submit && (
              <div className="p-3 bg-error/10 border border-error/20 rounded-md">
                <p className="text-sm text-error whitespace-pre-line">{errors?.submit}</p>
                {errors?.submit?.includes('Google Cloud Console') && (
                  <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-800">
                    💡 <strong>도움말:</strong> 이 오류는 Google OAuth 설정 문제입니다. 
                    위의 단계를 따라 Google Cloud Console에서 설정을 확인해주세요.
                  </div>
                )}
              </div>
            )}

            <Button
              type="submit"
              variant="default"
              loading={isLoading}
              fullWidth
              className="mt-6"
            >
              {mode === 'login' ? '로그인' : '회원가입'}
            </Button>
          </form>

          {/* Social Login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-muted-foreground">또는</span>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <Button
                type="button"
                variant="outline"
                fullWidth
                iconName="Mail"
                iconPosition="left"
                onClick={handleGoogleAuth}
                loading={isLoading}
                disabled={isLoading}
                className="relative"
              >
                {isLoading ? (
                  <>
                    <span className="opacity-0">Google로 계속하기</span>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      <span className="ml-2 text-sm">Google 인증 중...</span>
                    </div>
                  </>
                ) : (
                  'Google로 계속하기'
                )}
              </Button>
              
              <div className="text-xs text-gray-500 text-center mt-2">
                🔒 Google 계정으로 안전하게 로그인하세요
              </div>
            </div>
          </div>

          {/* Mode Switch */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {mode === 'login' ? '계정이 없으신가요?' : '이미 계정이 있으신가요?'}{' '}
              <button
                type="button"
                onClick={switchMode}
                className="text-primary hover:underline font-medium"
              >
                {mode === 'login' ? '회원가입' : '로그인'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationModal;