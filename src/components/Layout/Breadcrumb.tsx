import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronRight, Home, Search } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  
  const pathnames = location.pathname.split('/').filter((x) => x);
  
  if (pathnames.length === 0 || (pathnames.length === 1 && pathnames[0] === 'dashboard')) {
    return null;
  }

  // Get the active tab from URL hash or query params if available
  const getActiveTab = () => {
    const hash = location.hash.replace('#', '');
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');
    
    return hash || tab || '';
  };

  const activeTab = getActiveTab();

  const getBreadcrumbName = (path: string, index: number) => {
    // Special cases for nested routes
    const routeMap: Record<string, string> = {
      'dashboard': t('dashboard'),
      'keywords': t('keywords'),
      'site-audit': t('site-audit'),
      'content-analysis': t('content-analysis'),
      'rank-tracking': t('rank-tracking'),
      'backlink-analysis': t('backlink-analysis'),
      'competitor-analysis': t('competitor-analysis'),
      'reports': t('reports'),
      'pricing': t('pricing'),
      'education': t('education'),
      'contact': t('contact'),
      'seo-task-manager': t('seo-task-manager'),
      'content-calendar': t('content-calendar'),
      'keyword-difficulty-matrix': t('keyword-difficulty-matrix'),
      'semantic-analysis': t('semantic-analysis'),
      'trend-forecasting': t('trend-forecasting'),
      'user-behavior-insights': t('user-behavior-insights'),
      'admin-panel': t('admin-panel'),
      'settings': t('settings'),
      'profile': t('profile'),
      'login': t('login'),
      'register': t('register'),
      'forgot-password': t('forgot-password'),
      
      // Sub-pages and tabs
      'tracking': language === 'en' ? 'Keyword Tracking' : 'Anahtar Kelime Takibi',
      'entrenchment': language === 'en' ? 'SERP Entrenchment' : 'SERP Yerleşimi',
      'title-optimizer': language === 'en' ? 'Title Optimizer' : 'Başlık Optimize Edici',
      'overview': language === 'en' ? 'Overview' : 'Genel Bakış',
      'serp-terrain': language === 'en' ? 'SERP Landscape' : 'SERP Manzarası',
      'serp-features': language === 'en' ? 'SERP Feature Infiltrator' : 'SERP Özellik Sızma Aracı',
      'quality': language === 'en' ? 'Content Quality' : 'İçerik Kalitesi',
      'clarity-builder': language === 'en' ? 'Content Clarity Builder' : 'İçerik Netliği Oluşturucu',
      'cannibalization': language === 'en' ? 'Semantic Cannibalization' : 'Semantik Yamyamlık',
      'nlp-engagement': language === 'en' ? 'NLP Engagement Booster' : 'NLP Etkileşim Artırıcı',
      'crawl-budget': language === 'en' ? 'Crawl Budget Analysis' : 'Tarama Bütçesi Analizi',
      'expansion': language === 'en' ? 'Topical Expansion' : 'Konu Genişletme',
      'thought-vectors': language === 'en' ? 'Thought Vectors' : 'Düşünce Vektörleri',
      'volatility-protection': language === 'en' ? 'Volatility Protection' : 'Volatilite Koruması',
      'risk-assessment': language === 'en' ? 'Risk Assessment' : 'Risk Değerlendirmesi',
      'hedge-strategy': language === 'en' ? 'Hedge Strategy' : 'Hedge Stratejisi',
      'trend-analysis': language === 'en' ? 'Trend Analysis' : 'Trend Analizi',
      'click-bounce': language === 'en' ? 'Click-Bounce Analysis' : 'Tıklama-Çıkış Analizi',
      'user-journey': language === 'en' ? 'User Journey Mapping' : 'Kullanıcı Yolculuğu Haritası',
      'engagement': language === 'en' ? 'Engagement Metrics' : 'Etkileşim Metrikleri',
      'device-analysis': language === 'en' ? 'Device Breakdown' : 'Cihaz Dağılımı',
      'link-magnet': language === 'en' ? 'Link Magnet Analyzer' : 'Bağlantı Mıknatısı Analizörü',
      'backlinks': language === 'en' ? 'All Backlinks' : 'Tüm Backlink\'ler',
      'new': language === 'en' ? 'New Links' : 'Yeni Bağlantılar',
      'lost': language === 'en' ? 'Lost Links' : 'Kaybedilen Bağlantılar',
      'toxic': language === 'en' ? 'Toxic Links' : 'Toksik Bağlantılar',
      'general': language === 'en' ? 'General Settings' : 'Genel Ayarlar',
      'defaults': language === 'en' ? 'Default Project Settings' : 'Varsayılan Proje Ayarları',
      'currency': language === 'en' ? 'Currency Settings' : 'Para Birimi Ayarları',
      'notifications': language === 'en' ? 'Notifications' : 'Bildirimler',
      'security': language === 'en' ? 'Security' : 'Güvenlik',
      'appearance': language === 'en' ? 'Appearance' : 'Görünüm',
      'data': language === 'en' ? 'Data & Privacy' : 'Veri ve Gizlilik',
      'keywords': language === 'en' ? 'All Keywords' : 'Tüm Anahtar Kelimeler',
    };

    return routeMap[path] || path.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  // Add active tab to breadcrumb if it exists
  const breadcrumbItems = [
    { name: t('home'), path: '/dashboard' },
    ...pathnames.map((name, index) => ({
      name: getBreadcrumbName(name, index),
      path: `/${pathnames.slice(0, index + 1).join('/')}`
    }))
  ];

  // Add active tab as the last breadcrumb item if it exists
  if (activeTab && !pathnames.includes(activeTab)) {
    breadcrumbItems.push({
      name: getBreadcrumbName(activeTab, breadcrumbItems.length),
      path: `${location.pathname}${location.search ? location.search : ''}${location.hash ? location.hash : ''}`
    });
  }

  return (
    <nav className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm overflow-x-auto">
          <Link
            to="/dashboard"
            className="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            <Home className="w-4 h-4" />
          </Link>
          
          {breadcrumbItems.slice(1).map((item, index) => (
            <React.Fragment key={item.path}>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              {index === breadcrumbItems.length - 2 ? (
                <span className="text-gray-900 dark:text-white font-medium">
                  {item.name}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </React.Fragment>
          ))}
        </div>
        
        {/* Quick section search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={language === 'en' ? "Search sections..." : "Bölümleri ara..."}
            className="pl-10 pr-4 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </nav>
  );
};

export default Breadcrumb;