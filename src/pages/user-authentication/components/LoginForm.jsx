import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onSuccess }) => {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

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

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});
    
    try {
      const { data, error } = await signIn(formData?.email, formData?.password);
      
      if (error) {
        setErrors({ 
          submit: error?.message || '로그인에 실패했습니다. 다시 시도해주세요.' 
        });
        return;
      }

      if (data?.user) {
        if (onSuccess) {
          onSuccess(data?.user);
        }
        navigate('/file-upload-workspace');
      }
    } catch (error) {
      setErrors({ submit: '로그인에 실패했습니다. 다시 시도해주세요.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await signInWithGoogle();
      
      if (error) {
        setErrors({ submit: error?.message || 'Google 로그인에 실패했습니다.' });
        return;
      }

      // Google OAuth redirects, so success handling happens in callback
    } catch (error) {
      setErrors({ submit: 'Google 로그인에 실패했습니다. 다시 시도해주세요.' });
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

  const handleForgotPassword = async () => {
    if (!formData?.email) {
      setErrors({ email: '비밀번호 재설정을 위해 이메일을 입력해주세요' });
      return;
    }

    setShowForgotPassword(true);
    setTimeout(() => setShowForgotPassword(false), 3000);
  };

  return (
    <>
      {/* Demo Credentials Section */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
        <h4 className="text-sm font-medium text-blue-900 mb-2">테스트 계정 정보:</h4>
        <div className="space-y-1 text-xs text-blue-800">
          <div><strong>관리자:</strong> admin@printforge.ai / admin123</div>
          <div><strong>일반 사용자:</strong> user@printforge.ai / password123</div>
          <div><strong>프리미엄:</strong> premium@printforge.ai / premium123</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
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
        <div className="flex items-center justify-between">
          <Checkbox
            label="로그인 상태 유지"
            checked={formData?.rememberMe}
            onChange={(e) => handleInputChange('rememberMe', e?.target?.checked)}
          />
          
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-primary hover:underline"
          >
            비밀번호 찾기
          </button>
        </div>
        {showForgotPassword && (
          <div className="p-3 bg-success/10 border border-success/20 rounded-md">
            <div className="flex items-center space-x-2">
              <Icon name="Mail" size={16} className="text-success" />
              <p className="text-sm text-success">
                비밀번호 재설정 링크를 {formData?.email}로 전송했습니다.
              </p>
            </div>
          </div>
        )}
        {errors?.submit && (
          <div className="p-3 bg-error/10 border border-error/20 rounded-md">
            <p className="text-sm text-error">{errors?.submit}</p>
          </div>
        )}
        <Button
          type="submit"
          variant="default"
          loading={isLoading}
          fullWidth
          className="mt-6"
        >
          로그인
        </Button>
        
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
              onClick={handleGoogleSignIn}
              loading={isLoading}
            >
              Google로 로그인
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginForm;