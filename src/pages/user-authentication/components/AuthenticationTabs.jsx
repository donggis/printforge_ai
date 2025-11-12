import React, { useState } from 'react';

import Icon from '../../../components/AppIcon';

const AuthenticationTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'login', label: '로그인', icon: 'LogIn' },
    { id: 'register', label: '회원가입', icon: 'UserPlus' }
  ];

  return (
    <div className="flex bg-muted rounded-lg p-1 mb-6">
      {tabs?.map((tab) => (
        <button
          key={tab?.id}
          onClick={() => onTabChange(tab?.id)}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-all duration-200 ${
            activeTab === tab?.id
              ? 'bg-white text-foreground shadow-elevation-1'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon name={tab?.icon} size={16} />
          <span className="text-sm font-medium">{tab?.label}</span>
        </button>
      ))}
    </div>
  );
};

export default AuthenticationTabs;