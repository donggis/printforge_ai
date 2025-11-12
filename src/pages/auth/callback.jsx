import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);
  const [processingStep, setProcessingStep] = useState('초기화 중...');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const fullUrl = window?.location?.href;
        setProcessingStep('OAuth 콜백 처리 중...');
        
        console.log('🔍 Processing OAuth callback...');
        console.log('📍 Full callback URL:', fullUrl);
        console.log('📍 Location search:', location?.search);
        console.log('📍 Location hash:', window?.location?.hash);
        
        // Parse URL parameters from both search and hash
        const hashParams = new URLSearchParams(window?.location?.hash?.substring(1));
        const searchParams = new URLSearchParams(location?.search);
        
        const debugData = {
          fullUrl,
          hash: window?.location?.hash,
          search: location?.search,
          hashParams: Object.fromEntries(hashParams),
          searchParams: Object.fromEntries(searchParams),
          timestamp: new Date()?.toISOString()
        };
        
        setDebugInfo(debugData);
        console.log('📊 Debug info:', debugData);
        
        // Check for error parameters first
        const errorParam = searchParams?.get('error') || hashParams?.get('error');
        const errorDescription = searchParams?.get('error_description') || hashParams?.get('error_description');
        
        if (errorParam) {
          console.error('❌ OAuth error in URL:', errorParam, errorDescription);
          
          // Handle specific OAuth errors
          if (errorParam === 'access_denied') {
            setError('구글 로그인이 사용자에 의해 취소되었습니다.');
          } else if (errorParam === 'invalid_request') {
            setError(
              'OAuth 요청이 잘못되었습니다.\n\n' + '가능한 원인:\n'+ '1. Google Cloud Console 설정 오류\n'+ '2. 잘못된 redirect URI\n'+ '3. 클라이언트 ID 설정 문제\n\n' +
              `상세 오류: ${errorDescription || errorParam}`
            );
          } else if (errorDescription?.includes('redirect_uri_mismatch')) {
            setError(
              'Redirect URI 불일치 오류입니다.\n\n' + 'Google Cloud Console에서 다음을 확인해주세요:\n'+ '1. OAuth 2.0 클라이언트 ID 선택\n'+ '2. "Authorized redirect URIs"에 Supabase callback URL 추가\n'+ '3. URI 형식이 정확한지 확인\n\n' +
              `상세 오류: ${errorDescription}`
            );
          } else if (errorDescription?.includes('403') || errorDescription?.includes('Forbidden')) {
            setError(
              'Google OAuth 접근 권한 오류 (403)가 발생했습니다.\n\n' +
              '해결 방법:\n'+ '1. Google Cloud Console → APIs & Services → Credentials\n'+ '2. OAuth 2.0 Client ID 선택\n' +
              `3. "Authorized JavaScript origins"에 "${window?.location?.origin}" 추가\n` +
              '4. "OAuth consent screen"에서 앱 상태 확인\n'+ '5. 변경사항 저장 후 5-10분 대기\n'+ '6. 브라우저 캐시 삭제 후 재시도\n\n' +
              `상세 오류: ${errorDescription}`
            );
          } else {
            setError(`Google 인증 오류: ${errorDescription || errorParam}`);
          }
          
          setTimeout(() => navigate('/user-authentication'), 5000);
          return;
        }
        
        setProcessingStep('세션 확인 중...');
        
        // Check for existing session first
        console.log('🔐 Checking for existing session...');
        const { data: sessionData, error: sessionError } = await supabase?.auth?.getSession();
        
        if (sessionError) {
          console.error('❌ Session check error:', sessionError);
          setError(`세션 확인 중 오류 발생: ${sessionError?.message}`);
          setTimeout(() => navigate('/user-authentication'), 3000);
          return;
        }

        if (sessionData?.session?.user) {
          console.log('✅ Found existing session:', sessionData?.session?.user?.email);
          console.log('🔗 Provider:', sessionData?.session?.user?.app_metadata?.provider);
          setProcessingStep('로그인 성공! 리디렉션 중...');
          
          // Wait a moment to ensure auth state is fully updated
          setTimeout(() => {
            navigate('/file-upload-workspace', { replace: true });
          }, 1000);
          return;
        }

        setProcessingStep('인증 코드 처리 중...');
        
        // Look for authorization code
        const code = searchParams?.get('code');
        
        if (code) {
          console.log('📝 Found authorization code, processing...');
          
          // Supabase should automatically handle code exchange with detectSessionInUrl: true
          // Wait for the exchange to complete
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          const { data: newSessionData, error: newSessionError } = await supabase?.auth?.getSession();
          
          if (newSessionError) {
            console.error('❌ Session exchange error:', newSessionError);
            setError(`인증 코드 처리 중 오류 발생: ${newSessionError?.message}`);
            setTimeout(() => navigate('/user-authentication'), 3000);
            return;
          }
          
          if (newSessionData?.session?.user) {
            console.log('✅ Session exchange successful:', newSessionData?.session?.user?.email);
            setProcessingStep('로그인 성공! 리디렉션 중...');
            
            setTimeout(() => {
              navigate('/file-upload-workspace', { replace: true });
            }, 1000);
            return;
          }
        }
        
        setProcessingStep('토큰 확인 중...');
        
        // Check for access token in URL fragments (fallback)
        const accessToken = hashParams?.get('access_token') || searchParams?.get('access_token');
        const refreshToken = hashParams?.get('refresh_token') || searchParams?.get('refresh_token');
        
        if (accessToken) {
          console.log('🎫 Found access token, setting session manually...');
          
          const { data: manualSessionData, error: manualSessionError } = await supabase?.auth?.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          });
          
          if (manualSessionError) {
            console.error('❌ Manual session setting error:', manualSessionError);
            setError(`토큰 설정 중 오류 발생: ${manualSessionError?.message}`);
            setTimeout(() => navigate('/user-authentication'), 3000);
            return;
          }
          
          console.log('✅ Manual session set successfully:', manualSessionData?.user?.email);
          setProcessingStep('로그인 성공! 리디렉션 중...');
          
          setTimeout(() => {
            navigate('/file-upload-workspace', { replace: true });
          }, 1000);
          return;
        }
        
        // If we reach here, no valid auth data was found
        console.log('❓ No valid authentication data found in callback');
        setError(
          '인증 정보를 찾을 수 없습니다.\n\n' + '가능한 원인:\n'+ '1. OAuth 흐름이 완료되지 않음\n'+ '2. Supabase 설정 문제\n'+ '3. 네트워크 연결 문제\n\n'+ '다시 로그인을 시도해주세요.'
        );
        setTimeout(() => navigate('/user-authentication'), 3000);
        
      } catch (err) {
        console.error('❌ Unexpected callback processing error:', err);
        setError(`인증 처리 중 예기치 못한 오류 발생: ${err?.message}`);
        setTimeout(() => navigate('/user-authentication'), 3000);
      } finally {
        setLoading(false);
      }
    };

    // Start processing immediately
    handleAuthCallback();
  }, [navigate, location]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Google 인증 처리중</h2>
          <p className="text-gray-600 text-lg mb-2">{processingStep}</p>
          <p className="text-gray-500 text-sm">잠시만 기다려주세요...</p>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800 text-sm">
              💡 <strong>팁:</strong> 이 과정은 보통 5초 이내에 완료됩니다.
            </p>
          </div>
          
          {debugInfo && (
            <details className="mt-4 text-left text-xs bg-gray-100 p-3 rounded">
              <summary className="cursor-pointer text-gray-700 font-medium">디버그 정보 보기</summary>
              <pre className="mt-2 whitespace-pre-wrap text-gray-600 overflow-auto max-h-32">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </details>
          )}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            
            <h2 className="text-xl font-semibold mb-3 text-gray-900">Google 인증 오류</h2>
            
            <div className="text-gray-700 mb-6 text-sm whitespace-pre-line text-left bg-gray-50 p-4 rounded-lg border">
              {error}
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => navigate('/user-authentication')}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                로그인 페이지로 돌아가기
              </button>
              
              <button
                onClick={() => {
                  navigator?.clipboard?.writeText(error);
                  alert('오류 내용이 클립보드에 복사되었습니다.');
                }}
                className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors text-sm"
              >
                📋 오류 내용 복사하기
              </button>
              
              <p className="text-xs text-gray-500 mt-4">
                🔄 5초 후 자동으로 로그인 페이지로 이동합니다...
              </p>
            </div>
            
            {debugInfo && (
              <details className="mt-6 text-left text-xs bg-gray-100 p-3 rounded">
                <summary className="cursor-pointer text-gray-700 font-medium">기술적 세부사항 보기</summary>
                <pre className="mt-2 whitespace-pre-wrap text-gray-600 overflow-auto max-h-40">
                  {JSON.stringify(debugInfo, null, 2)}
                </pre>
              </details>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default AuthCallback;