import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

interface AuditUsage {
  count: number;
  lastReset: string;
}

interface AuditContextType {
  auditUsage: AuditUsage;
  canRunAudit: boolean;
  runAudit: (url: string) => Promise<boolean>;
  getRemainingAudits: () => number;
  getAuditLimit: () => number;
}

const AuditContext = createContext<AuditContextType | undefined>(undefined);

export const useAudit = () => {
  const context = useContext(AuditContext);
  if (context === undefined) {
    throw new Error('useAudit must be used within an AuditProvider');
  }
  return context;
};

export const AuditProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [auditUsage, setAuditUsage] = useState<AuditUsage>({ count: 0, lastReset: new Date().toISOString() });

  const getAuditLimit = () => {
    switch (user?.plan) {
      case 'starter':
        return 10;
      case 'professional':
        return 50;
      case 'enterprise':
        return -1; // unlimited
      default:
        return 1; // free plan
    }
  };

  const resetIfNewMonth = () => {
    const now = new Date();
    const lastReset = new Date(auditUsage.lastReset);
    
    if (now.getMonth() !== lastReset.getMonth() || now.getFullYear() !== lastReset.getFullYear()) {
      setAuditUsage({ count: 0, lastReset: now.toISOString() });
      localStorage.setItem('auditUsage', JSON.stringify({ count: 0, lastReset: now.toISOString() }));
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem('auditUsage');
    if (stored) {
      const usage = JSON.parse(stored);
      setAuditUsage(usage);
    }
    resetIfNewMonth();
  }, []);

  const canRunAudit = () => {
    const limit = getAuditLimit();
    return limit === -1 || auditUsage.count < limit;
  };

  const getRemainingAudits = () => {
    const limit = getAuditLimit();
    if (limit === -1) return -1; // unlimited
    return Math.max(0, limit - auditUsage.count);
  };

  const runAudit = async (url: string): Promise<boolean> => {
    if (!canRunAudit()) {
      toast.error('Audit limit reached. Please upgrade your plan.', { duration: 1000 });
      return false;
    }

    try {
      // Simulate audit API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newUsage = { ...auditUsage, count: auditUsage.count + 1 };
      setAuditUsage(newUsage);
      localStorage.setItem('auditUsage', JSON.stringify(newUsage));
      
      toast.success('Audit completed successfully!', { duration: 1000 });
      return true;
    } catch (error) {
      toast.error('Audit failed. Please try again.', { duration: 1000 });
      return false;
    }
  };

  return (
    <AuditContext.Provider value={{
      auditUsage,
      canRunAudit: canRunAudit(),
      runAudit,
      getRemainingAudits,
      getAuditLimit
    }}>
      {children}
    </AuditContext.Provider>
  );
};