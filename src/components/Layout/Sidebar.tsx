import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart3, 
  Key, 
  CheckCircle, 
  FileText, 
  TrendingUp, 
  Link, 
  Users, 
  FileBarChart, 
  CreditCard, 
  BookOpen, 
  Mail, 
  Calendar,
  Grid3X3,
  UserCog,
  Settings,
  Menu,
  X,
  Home,
  Brain,
  Target,
  Activity
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const { t } = useLanguage();
  const { isAdmin } = useAuth();

  const mainModules = [
    { id: 'dashboard', icon: Home, label: t('dashboard'), path: '/dashboard' },
    { id: 'keywords', icon: Key, label: t('keywords'), path: '/keywords' },
    { id: 'site-audit', icon: CheckCircle, label: t('site-audit'), path: '/site-audit' },
    { id: 'content-analysis', icon: FileText, label: t('content-analysis'), path: '/content-analysis' },
    { id: 'rank-tracking', icon: TrendingUp, label: t('rank-tracking'), path: '/rank-tracking' },
    { id: 'backlink-analysis', icon: Link, label: t('backlink-analysis'), path: '/backlink-analysis' },
    { id: 'competitor-analysis', icon: Users, label: t('competitor-analysis'), path: '/competitor-analysis' },
    { id: 'reports', icon: FileBarChart, label: t('reports'), path: '/reports' },
  ];

  const advancedModules = [
    { id: 'seo-task-manager', icon: BarChart3, label: t('seo-task-manager'), path: '/seo-task-manager' },
    { id: 'content-calendar', icon: Calendar, label: t('content-calendar'), path: '/content-calendar' },
    { id: 'keyword-difficulty-matrix', icon: Grid3X3, label: t('keyword-difficulty-matrix'), path: '/keyword-difficulty-matrix' },
    { id: 'semantic-analysis', icon: Brain, label: t('semantic-analysis'), path: '/semantic-analysis' },
    { id: 'trend-forecasting', icon: Target, label: t('trend-forecasting'), path: '/trend-forecasting' },
  ];

  const aiInsightsModules = [
    { id: 'user-behavior-insights', icon: Activity, label: t('user-behavior-insights'), path: '/user-behavior-insights' },
  ];

  const businessModules = [
    { id: 'pricing', icon: CreditCard, label: t('pricing'), path: '/pricing' },
    { id: 'education', icon: BookOpen, label: t('education'), path: '/education' },
    { id: 'contact', icon: Mail, label: t('contact'), path: '/contact' },
  ];

  const systemModules = [
    ...(isAdmin ? [{ id: 'admin-panel', icon: UserCog, label: t('admin-panel'), path: '/admin-panel' }] : []),
    { id: 'settings', icon: Settings, label: t('settings'), path: '/settings' },
  ];

  const renderNavSection = (title: string, modules: typeof mainModules) => (
    <div className="mb-6">
      {!isCollapsed && (
        <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
          {title}
        </h3>
      )}
      <nav className="space-y-1">
        {modules.map((module) => {
          const Icon = module.icon;
          
          return (
            <NavLink
              key={module.id}
              to={module.path}
              id={`sidebar-${module.id}`}
              className={({ isActive }) =>
                `flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-r-2 border-blue-500'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                }`
              }
              title={isCollapsed ? module.label : undefined}
            >
              <Icon className={`w-5 h-5 ${isCollapsed ? 'mx-auto' : 'mr-3'} flex-shrink-0`} />
              {!isCollapsed && (
                <span className="truncate">{module.label}</span>
              )}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );

  return (
    <div className={`bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } flex flex-col h-full`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <img src="/workexe logo.png" alt="Workexe Logo" className="w-8 h-8" />
            <span className="font-bold text-xl text-gray-800 dark:text-white">Workexe SEO Checker</span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {isCollapsed ? (
            <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          ) : (
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-2">
        {renderNavSection(t('main-tools'), mainModules)}
        {renderNavSection(t('advanced-tools'), advancedModules)}
        {renderNavSection(t('ai-insights'), aiInsightsModules)}
        {renderNavSection(t('business'), businessModules)}
        {renderNavSection(t('system'), systemModules)}
      </div>
    </div>
  );
};

export default Sidebar;