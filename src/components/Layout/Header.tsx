import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Search, Sun, Moon, Globe, ChevronDown, User, LogOut, Settings, Command, Check } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import EnhancedGlobalSearch from './EnhancedGlobalSearch';
import toast from 'react-hot-toast';

interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'success' | 'error' | 'warning' | 'info';
  link?: string;
}

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: language === 'en' ? 'Ranking improved for "seo tools"' : '"seo araçları" için sıralama iyileşti',
      description: language === 'en' ? 'Your keyword moved from position 15 to 8' : 'Anahtar kelimeniz 15. pozisyondan 8. pozisyona yükseldi',
      time: language === 'en' ? '2 hours ago' : '2 saat önce',
      read: false,
      type: 'success',
      link: '/rank-tracking'
    },
    {
      id: 2,
      title: language === 'en' ? 'New backlink detected' : 'Yeni backlink tespit edildi',
      description: language === 'en' ? 'You received a new backlink from example.com' : 'example.com\'dan yeni bir backlink aldınız',
      time: language === 'en' ? '5 hours ago' : '5 saat önce',
      read: false,
      type: 'info',
      link: '/backlink-analysis'
    },
    {
      id: 3,
      title: language === 'en' ? 'Site audit completed' : 'Site denetimi tamamlandı',
      description: language === 'en' ? 'Your weekly site audit has been completed' : 'Haftalık site denetiminiz tamamlandı',
      time: language === 'en' ? '1 day ago' : '1 gün önce',
      read: true,
      type: 'info',
      link: '/site-audit'
    },
    {
      id: 4,
      title: language === 'en' ? 'Critical issue detected' : 'Kritik sorun tespit edildi',
      description: language === 'en' ? 'Your homepage has 3 broken links' : 'Ana sayfanızda 3 kırık bağlantı var',
      time: language === 'en' ? '2 days ago' : '2 gün önce',
      read: true,
      type: 'error',
      link: '/site-audit'
    }
  ]);

  // Global search keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close notifications dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showNotifications && !target.closest('.notifications-container')) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showNotifications]);

  const handleLanguageToggle = () => {
    const newLanguage = language === 'en' ? 'tr' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <div className="w-2 h-2 bg-green-500 rounded-full"></div>;
      case 'error':
        return <div className="w-2 h-2 bg-red-500 rounded-full"></div>;
      case 'warning':
        return <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>;
      default:
        return <div className="w-2 h-2 bg-blue-500 rounded-full"></div>;
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    // Mark notification as read
    setNotifications(prev => 
      prev.map(n => 
        n.id === notification.id ? { ...n, read: true } : n
      )
    );

    // Navigate to the relevant page
    if (notification.link) {
      navigate(notification.link);
    }

    // Close the notifications dropdown
    setShowNotifications(false);

    // Show a toast message
    toast.success(
      language === 'en' 
        ? 'Notification marked as read' 
        : 'Bildirim okundu olarak işaretlendi',
      { duration: 1000 }
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setShowNotifications(false);
    
    toast.success(
      language === 'en' 
        ? 'All notifications marked as read' 
        : 'Tüm bildirimler okundu olarak işaretlendi',
      { duration: 1000 }
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Get the correct plan name based on the user's plan
  const getPlanDisplayName = () => {
    if (!user) return '';
    
    switch (user.plan) {
      case 'free':
        return language === 'en' ? 'Free' : 'Ücretsiz';
      case 'starter':
        return language === 'en' ? 'Starter' : 'Başlangıç';
      case 'professional':
        return language === 'en' ? 'Professional' : 'Profesyonel';
      case 'enterprise':
        return language === 'en' ? 'Custom' : 'Özel';
      default:
        return user.plan;
    }
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-md relative mx-4">
          {showSearch ? (
            <EnhancedGlobalSearch isOpen={showSearch} onClose={() => setShowSearch(false)} />
          ) : (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={t('global-search-placeholder')}
                onClick={() => setShowSearch(true)}
                className="w-full pl-10 pr-12 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                readOnly
                autoComplete="off"
                id="global-search"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <Command className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-400">K</span>
              </div>
            </div>
          )}
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          {/* Language Toggle */}
          <button
            id="language-toggle"
            onClick={handleLanguageToggle}
            className="flex items-center space-x-1 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title={t('change-language')}
          >
            <Globe className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase">
              {language}
            </span>
          </button>

          {/* Theme Toggle */}
          <button
            id="theme-toggle"
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title={t('toggle-theme')}
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>

          {/* Notifications - Only show for authenticated users */}
          {user && (
            <div className="relative notifications-container">
              <button 
                id="notifications-button"
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 dark:text-white">{language === 'en' ? 'Notifications' : 'Bildirimler'}</h3>
                    {unreadCount > 0 && (
                      <button 
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                        onClick={markAllAsRead}
                      >
                        <Check className="w-3 h-3 mr-1" />
                        {language === 'en' ? 'Mark all as read' : 'Tümünü okundu olarak işaretle'}
                      </button>
                    )}
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {notifications.map((notification) => (
                          <div 
                            key={notification.id} 
                            className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                              !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                            }`}
                            onClick={() => handleNotificationClick(notification)}
                          >
                            <div className="flex items-start">
                              <div className="flex-shrink-0 mt-1">
                                {getNotificationIcon(notification.type)}
                              </div>
                              <div className="ml-3 flex-1">
                                <p className={`text-sm font-medium ${
                                  !notification.read ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                                }`}>
                                  {notification.title}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                  {notification.description}
                                </p>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                  {notification.time}
                                </p>
                              </div>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 mt-1"></div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                        {language === 'en' ? 'No notifications yet' : 'Henüz bildirim yok'}
                      </div>
                    )}
                  </div>
                  
                  <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-center">
                    <button 
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      onClick={() => {
                        setShowNotifications(false);
                        navigate('/settings?tab=notifications');
                      }}
                    >
                      {language === 'en' ? 'View all notifications' : 'Tüm bildirimleri görüntüle'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Auth Buttons for Guest Users */}
          {!user ? (
            <div className="flex items-center space-x-2">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {t('sign-in')}
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg hover:from-blue-600 hover:to-teal-500 transition-all text-sm font-medium shadow-sm hover:shadow-md"
              >
                {t('sign-up')}
              </Link>
            </div>
          ) : (
            /* User Menu for Authenticated Users */
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user?.name}
                  </div>
                  <Link 
                    to="/pricing"
                    className="text-xs text-blue-600 dark:text-blue-400 capitalize hover:underline"
                  >
                    {getPlanDisplayName()} {t('plan')}
                  </Link>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <User className="w-4 h-4 mr-2" />
                    {t('profile')}
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    {t('settings')}
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    {t('sign-out')}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;