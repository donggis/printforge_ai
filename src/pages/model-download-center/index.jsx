import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainHeader from '../../components/ui/MainHeader';
import WorkflowProgress from '../../components/ui/WorkflowProgress';
import DownloadSection from './components/DownloadSection';
import ModelPreview from './components/ModelPreview';
import QualityMetrics from './components/QualityMetrics';
import DownloadHistory from './components/DownloadHistory';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ModelDownloadCenter = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [activeTab, setActiveTab] = useState('current');
  const [isSharing, setIsSharing] = useState(false);

  // Mock current model data
  const currentModel = {
    id: "model_2024_001",
    name: "커스텀 피규어 모델",
    previewImage: "https://images.unsplash.com/photo-1733483363627-fcbd13ae1ebd",
    previewImageAlt: "3D printed figurine model with detailed surface texture and geometric patterns",
    fileSize: 15728640, // 15MB in bytes
    createdAt: new Date('2024-11-09T08:45:00'),
    status: 'completed',
    downloadUrl: '/downloads/custom-figurine-model.stl'
  };

  // Mock quality metrics
  const qualityMetrics = {
    overallQuality: 92,
    geometricAccuracy: 89,
    surfaceQuality: 94,
    structuralIntegrity: 91,
    processingTime: "2분 34초",
    aiModel: "PrintForge AI v2.1",
    resolution: "0.1mm",
    optimization: "3D 프린팅 최적화"
  };

  // Mock download history
  const downloadHistory = [
  {
    id: "model_2024_002",
    name: "미니어처 하우스",
    previewImage: "https://images.unsplash.com/photo-1578999803415-318fb718973e",
    previewImageAlt: "Miniature house model with detailed architectural features and windows",
    fileSize: 8945120,
    createdAt: new Date('2024-11-08T14:20:00')
  },
  {
    id: "model_2024_003",
    name: "기계 부품 프로토타입",
    previewImage: "https://images.unsplash.com/photo-1625464659809-ec3a3f878f59",
    previewImageAlt: "Mechanical gear component with precise engineering details and metallic finish",
    fileSize: 12582912,
    createdAt: new Date('2024-11-07T16:45:00')
  },
  {
    id: "model_2024_004",
    name: "장식용 화분",
    previewImage: "https://images.unsplash.com/photo-1663888672535-956677e08412",
    previewImageAlt: "Decorative ceramic planter with geometric patterns and smooth curved surfaces",
    fileSize: 6291456,
    createdAt: new Date('2024-11-06T10:15:00')
  },
  {
    id: "model_2024_005",
    name: "스마트폰 케이스",
    previewImage: "https://images.unsplash.com/photo-1640808653098-18d14a5b9b27",
    previewImageAlt: "Custom smartphone case with textured grip surface and precise camera cutouts",
    fileSize: 4194304,
    createdAt: new Date('2024-11-05T09:30:00')
  },
  {
    id: "model_2024_006",
    name: "아트 조각품",
    previewImage: "https://images.unsplash.com/photo-1678972903677-b3399c2f9844",
    previewImageAlt: "Abstract art sculpture with flowing organic curves and artistic surface details",
    fileSize: 18874368,
    createdAt: new Date('2024-11-04T13:22:00')
  },
  {
    id: "model_2024_007",
    name: "교육용 모형",
    previewImage: "https://images.unsplash.com/photo-1707863080685-177f4f6e850d",
    previewImageAlt: "Educational molecular model showing atomic structure with color-coded elements",
    fileSize: 7340032,
    createdAt: new Date('2024-11-03T11:18:00')
  }];


  const tabs = [
  { id: 'current', label: '현재 모델', icon: 'Download' },
  { id: 'history', label: '다운로드 기록', icon: 'History' }];


  useEffect(() => {
    // Simulate checking authentication status
    const checkAuth = () => {
      const authStatus = localStorage.getItem('isAuthenticated');
      setIsAuthenticated(authStatus === 'true');
    };

    checkAuth();
  }, []);

  const handleDownload = async (model) => {
    try {
      // Simulate download process
      console.log('Downloading model:', model?.name);

      // In a real app, this would trigger the actual file download
      const link = document.createElement('a');
      link.href = model?.downloadUrl || '#';
      link.download = `${model?.name}.stl`;
      document.body?.appendChild(link);
      link?.click();
      document.body?.removeChild(link);

      // Show success message (could use toast notification)
      alert(`${model?.name} 다운로드가 시작되었습니다.`);
    } catch (error) {
      console.error('Download failed:', error);
      alert('다운로드에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleShare = async (model) => {
    setIsSharing(true);
    try {
      if (navigator.share) {
        await navigator.share({
          title: `PrintForge AI - ${model?.name}`,
          text: `AI로 생성한 3D 모델을 확인해보세요: ${model?.name}`,
          url: window.location?.href
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        await navigator.clipboard?.writeText(window.location?.href);
        alert('링크가 클립보드에 복사되었습니다.');
      }
    } catch (error) {
      console.error('Sharing failed:', error);
    } finally {
      setIsSharing(false);
    }
  };

  const handleDeleteModel = (modelId) => {
    if (window.confirm('이 모델을 삭제하시겠습니까?')) {
      console.log('Deleting model:', modelId);
      // In a real app, this would make an API call to delete the model
      alert('모델이 삭제되었습니다.');
    }
  };

  const handleNewUpload = () => {
    navigate('/file-upload-workspace');
  };

  const handleAuthClick = () => {
    navigate('/user-authentication');
  };

  const handleStepClick = (step) => {
    navigate(step?.path);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <MainHeader
        isAuthenticated={isAuthenticated}
        onAuthClick={handleAuthClick} />

      {/* Workflow Progress */}
      <WorkflowProgress
        currentStep="download"
        onStepClick={handleStepClick} />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              모델 다운로드 센터
            </h1>
            <p className="text-muted-foreground">
              생성된 3D 모델을 다운로드하고 관리하세요
            </p>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <Button
              variant="outline"
              onClick={handleNewUpload}
              iconName="Plus"
              iconPosition="left">

              새 모델 생성
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg w-fit">
          {tabs?.map((tab) =>
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === tab?.id ?
            'bg-white text-foreground shadow-sm' :
            'text-muted-foreground hover:text-foreground'}`
            }>

              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          )}
        </div>

        {/* Tab Content */}
        {activeTab === 'current' ?
        <div className="space-y-6">
            {/* Current Model Download Section */}
            <DownloadSection
            model={currentModel}
            onDownload={handleDownload}
            onShare={handleShare} />


            {/* Quality Metrics */}
            <QualityMetrics metrics={qualityMetrics} />

            {/* 3D Model Preview */}
            <ModelPreview model={currentModel} />

            {/* Next Steps */}
            <div className="bg-white rounded-lg shadow-elevation-2 p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                다음 단계
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                  <Icon name="Upload" size={24} className="text-primary" />
                  <div>
                    <h4 className="font-medium text-foreground">새 모델 생성</h4>
                    <p className="text-sm text-muted-foreground">다른 이미지로 3D 모델 만들기</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                  <Icon name="Crown" size={24} className="text-warning" />
                  <div>
                    <h4 className="font-medium text-foreground">Pro 업그레이드</h4>
                    <p className="text-sm text-muted-foreground">고품질 모델과 추가 기능</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                  <Icon name="BookOpen" size={24} className="text-success" />
                  <div>
                    <h4 className="font-medium text-foreground">사용 가이드</h4>
                    <p className="text-sm text-muted-foreground">3D 프린팅 팁과 가이드</p>
                  </div>
                </div>
              </div>
            </div>
          </div> : (

        /* Download History Tab */
        <DownloadHistory
          models={downloadHistory}
          onDownload={handleDownload}
          onDelete={handleDeleteModel} />)

        }
      </main>
      {/* Footer */}
      <footer className="bg-white border-t border-border mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
                <Icon name="Box" size={14} color="white" />
              </div>
              <span className="font-semibold text-foreground">PrintForge AI</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <button className="hover:text-foreground transition-colors">
                도움말
              </button>
              <button className="hover:text-foreground transition-colors">
                문의하기
              </button>
              <button className="hover:text-foreground transition-colors">
                개인정보처리방침
              </button>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-border text-center text-sm text-muted-foreground">
            © {new Date()?.getFullYear()} PrintForge AI. 모든 권리 보유.
          </div>
        </div>
      </footer>
    </div>);

};

export default ModelDownloadCenter;