import React from 'react';
import { BrowserRouter, Routes as RouterRoutes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './contexts/AuthContext';

// Pages
import NotFound from './pages/NotFound';
import HomeLanding from './pages/home-landing';
import UserAuthentication from './pages/user-authentication';
import FileUploadWorkspace from './pages/file-upload-workspace';
import AIProcessingDashboard from './pages/ai-processing-dashboard';
import ModelDownloadCenter from './pages/model-download-center';
import AuthCallback from './pages/auth/callback';

const Routes = () => {
  const basename = import.meta.env.BASE_URL || '/';

  return (
    <BrowserRouter basename={basename}>
      <ErrorBoundary>
        <AuthProvider>
          <ScrollToTop />
          <RouterRoutes>
            <Route path="/" element={<HomeLanding />} />
            <Route path="/user-authentication" element={<UserAuthentication />} />
            <Route path="/file-upload-workspace" element={<FileUploadWorkspace />} />
            <Route path="/ai-processing-dashboard" element={<AIProcessingDashboard />} />
            <Route path="/model-download-center" element={<ModelDownloadCenter />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </AuthProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;