import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const RegisterForm = ({ onSuccess }) => {
  const navigate = useNavigate();
  const { signUp, signInWithGoogle } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    agreeToMarketing: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name) {
      newErrors.name = '이름을 입력해주세요';
    } else if (formData?.name?.length < 2) {
      newErrors.name = '이름은 최소 2자 이상이어야 합니다';
    }

    if (!formData?.email) {
      newErrors.email = '이메일을 입력해주세요';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요';
    }

    if (!formData?.confirmEmail) {
      newErrors.confirmEmail = '이메일 확인을 입력해주세요';
    } else if (formData?.email !== formData?.confirmEmail) {
      newErrors.confirmEmail = '이메일이 일치하지 않습니다';
    }

    if (!formData?.password) {
      newErrors.password = '비밀번호를 입력해주세요';
    } else if (formData?.password?.length < 8) {
      newErrors.password = '비밀번호는 최소 8자 이상이어야 합니다';
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해주세요';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다';
    }

    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = '이용약관에 동의해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength += 25;
    if (/[a-z]/?.test(password)) strength += 25;
    if (/[A-Z]/?.test(password)) strength += 25;
    if (/[0-9]/?.test(password)) strength += 25;
    return strength;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});
    
    try {
      const { data, error } = await signUp(
        formData?.email, 
        formData?.password,
        {
          fullName: formData?.name,
          marketingConsent: formData?.agreeToMarketing
        }
      );
      
      if (error) {
        setErrors({ 
          submit: error?.message || '회원가입에 실패했습니다. 다시 시도해주세요.' 
        });
        return;
      }

      if (data?.user) {
        if (onSuccess) {
          onSuccess(data?.user);
        }
        // Show email confirmation notice
        setErrors({ 
          success: '회원가입이 완료되었습니다! 이메일을 확인하여 계정을 활성화해주세요.' 
        });
      }
    } catch (error) {
      setErrors({ submit: '회원가입에 실패했습니다. 다시 시도해주세요.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await signInWithGoogle();
      
      if (error) {
        setErrors({ submit: error?.message || 'Google 회원가입에 실패했습니다.' });
        return;
      }

      // Google OAuth redirects, so success handling happens in callback
    } catch (error) {
      setErrors({ submit: 'Google 회원가입에 실패했습니다. 다시 시도해주세요.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
    
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return 'bg-error';
    if (passwordStrength < 50) return 'bg-warning';
    if (passwordStrength < 75) return 'bg-yellow-500';
    return 'bg-success';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return '약함';
    if (passwordStrength < 50) return '보통';
    if (passwordStrength < 75) return '강함';
    return '매우 강함';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="이름"
        type="text"
        placeholder="이름을 입력하세요"
        value={formData?.name}
        onChange={(e) => handleInputChange('name', e?.target?.value)}
        error={errors?.name}
        required
      />
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
        label="이메일 확인"
        type="email"
        placeholder="이메일을 다시 입력하세요"
        value={formData?.confirmEmail}
        onChange={(e) => handleInputChange('confirmEmail', e?.target?.value)}
        error={errors?.confirmEmail}
        required
      />
      <div>
        <Input
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={formData?.password}
          onChange={(e) => handleInputChange('password', e?.target?.value)}
          error={errors?.password}
          required
        />
        
        {formData?.password && (
          <div className="mt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">비밀번호 강도</span>
              <span className={`text-xs font-medium ${
                passwordStrength < 50 ? 'text-error' : 'text-success'
              }`}>
                {getPasswordStrengthText()}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-1">
              <div 
                className={`h-1 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                style={{ width: `${passwordStrength}%` }}
              />
            </div>
          </div>
        )}
      </div>
      <Input
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호를 다시 입력하세요"
        value={formData?.confirmPassword}
        onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
        error={errors?.confirmPassword}
        required
      />
      <div className="space-y-3">
        <Checkbox
          label={
            <span className="text-sm">
              <span className="text-primary cursor-pointer hover:underline">이용약관</span> 및{' '}
              <span className="text-primary cursor-pointer hover:underline">개인정보처리방침</span>에 동의합니다 (필수)
            </span>
          }
          checked={formData?.agreeToTerms}
          onChange={(e) => handleInputChange('agreeToTerms', e?.target?.checked)}
          error={errors?.agreeToTerms}
          required
        />

        <Checkbox
          label="마케팅 정보 수신에 동의합니다 (선택)"
          description="새로운 기능 및 프로모션 정보를 이메일로 받아보실 수 있습니다"
          checked={formData?.agreeToMarketing}
          onChange={(e) => handleInputChange('agreeToMarketing', e?.target?.checked)}
        />
      </div>
      {errors?.success && (
        <div className="p-3 bg-success/10 border border-success/20 rounded-md">
          <p className="text-sm text-success">{errors?.success}</p>
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
        회원가입
      </Button>
      
      {/* Social Registration */}
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
            onClick={handleGoogleSignUp}
            loading={isLoading}
          >
            Google로 회원가입
          </Button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;