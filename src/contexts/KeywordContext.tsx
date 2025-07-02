import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

interface KeywordUsage {
  totalCount: number;
}

interface KeywordContextType {
  keywordUsage: KeywordUsage;
  canAddKeyword: boolean;
  addKeyword: (keyword: string) => Promise<boolean>;
  getRemainingKeywords: () => number;
  getTotalLimit: () => number;
}

const KeywordContext = createContext<KeywordContextType | undefined>(undefined);

export const useKeyword = () => {
  const context = useContext(KeywordContext);
  if (context === undefined) {
    throw new Error('useKeyword must be used within a KeywordProvider');
  }
  return context;
};

export const KeywordProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [keywordUsage, setKeywordUsage] = useState<KeywordUsage>({ totalCount: 0 });

  const getTotalLimit = () => {
    switch (user?.plan) {
      case 'starter':
        return 50;
      case 'professional':
        return 200;
      case 'enterprise':
        return -1; // unlimited for enterprise plan
      default:
        return 3; // free plan
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem('keywordUsage');
    if (stored) {
      const usage = JSON.parse(stored);
      setKeywordUsage(usage);
    }
  }, []);

  const canAddKeyword = () => {
    const limit = getTotalLimit();
    return limit === -1 || keywordUsage.totalCount < limit;
  };

  const getRemainingKeywords = () => {
    const limit = getTotalLimit();
    if (limit === -1) return -1; // unlimited
    return Math.max(0, limit - keywordUsage.totalCount);
  };

  const addKeyword = async (keyword: string): Promise<boolean> => {
    if (!canAddKeyword()) {
      toast.error(
        user?.plan === 'free' 
          ? 'You\'ve reached your keyword limit. Upgrade for more keywords.' 
          : 'Keyword limit reached. Please contact support to increase your limit.',
        { duration: 1000 }
      );
      return false;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newUsage = { ...keywordUsage, totalCount: keywordUsage.totalCount + 1 };
      setKeywordUsage(newUsage);
      localStorage.setItem('keywordUsage', JSON.stringify(newUsage));
      
      toast.success(`Keyword "${keyword}" added successfully!`, { duration: 1000 });
      return true;
    } catch (error) {
      toast.error('Failed to add keyword. Please try again.', { duration: 1000 });
      return false;
    }
  };

  return (
    <KeywordContext.Provider value={{
      keywordUsage,
      canAddKeyword: canAddKeyword(),
      addKeyword,
      getRemainingKeywords,
      getTotalLimit
    }}>
      {children}
    </KeywordContext.Provider>
  );
};