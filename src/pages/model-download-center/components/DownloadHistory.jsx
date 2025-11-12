import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DownloadHistory = ({ models, onDownload, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');

  const sortOptions = [
    { value: 'newest', label: '최신순' },
    { value: 'oldest', label: '오래된순' },
    { value: 'name', label: '이름순' },
    { value: 'size', label: '크기순' }
  ];

  const filterOptions = [
    { value: 'all', label: '전체' },
    { value: 'today', label: '오늘' },
    { value: 'week', label: '이번 주' },
    { value: 'month', label: '이번 달' }
  ];

  const formatFileSize = (bytes) => {
    const mb = bytes / (1024 * 1024);
    return `${mb?.toFixed(1)}MB`;
  };

  const formatDate = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '오늘';
    if (diffDays === 2) return '어제';
    if (diffDays <= 7) return `${diffDays}일 전`;
    
    return new Intl.DateTimeFormat('ko-KR', {
      month: 'short',
      day: 'numeric'
    })?.format(date);
  };

  const filteredModels = models?.filter(model => {
      const matchesSearch = model?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      
      if (filterBy === 'all') return matchesSearch;
      
      const now = new Date();
      const modelDate = new Date(model.createdAt);
      
      switch (filterBy) {
        case 'today':
          return matchesSearch && modelDate?.toDateString() === now?.toDateString();
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return matchesSearch && modelDate >= weekAgo;
        case 'month':
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          return matchesSearch && modelDate >= monthAgo;
        default:
          return matchesSearch;
      }
    })?.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'name':
          return a?.name?.localeCompare(b?.name);
        case 'size':
          return b?.fileSize - a?.fileSize;
        default:
          return 0;
      }
    });

  return (
    <div className="bg-white rounded-lg shadow-elevation-2 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">
            다운로드 기록
          </h3>
          <p className="text-sm text-muted-foreground">
            총 {models?.length}개의 모델이 생성되었습니다
          </p>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
          >
            전체 다운로드
          </Button>
        </div>
      </div>
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="모델 이름으로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-full"
          />
        </div>
        
        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="px-3 py-2 border border-border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {sortOptions?.map(option => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
          
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e?.target?.value)}
            className="px-3 py-2 border border-border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {filterOptions?.map(option => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Models Grid */}
      {filteredModels?.length === 0 ? (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h4 className="text-lg font-medium text-foreground mb-2">
            검색 결과가 없습니다
          </h4>
          <p className="text-muted-foreground">
            다른 검색어를 시도하거나 필터를 변경해보세요
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredModels?.map((model) => (
            <div
              key={model?.id}
              className="border border-border rounded-lg p-4 hover:shadow-elevation-2 transition-shadow duration-200"
            >
              {/* Model Preview */}
              <div className="aspect-square bg-muted rounded-lg mb-3 overflow-hidden">
                <Image
                  src={model?.previewImage}
                  alt={model?.previewImageAlt}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Model Info */}
              <div className="mb-3">
                <h4 className="font-medium text-foreground mb-1 truncate">
                  {model?.name}
                </h4>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{formatFileSize(model?.fileSize)}</span>
                  <span>{formatDate(model?.createdAt)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDownload(model)}
                  iconName="Download"
                  iconPosition="left"
                  className="flex-1"
                >
                  다운로드
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(model?.id)}
                  className="hover:bg-error/10 hover:text-error"
                >
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Load More */}
      {filteredModels?.length > 0 && filteredModels?.length >= 9 && (
        <div className="text-center mt-6">
          <Button
            variant="outline"
            iconName="ChevronDown"
            iconPosition="right"
          >
            더 보기
          </Button>
        </div>
      )}
    </div>
  );
};

export default DownloadHistory;