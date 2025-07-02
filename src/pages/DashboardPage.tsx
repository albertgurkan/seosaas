import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Calendar, Users, RefreshCw, Code, Shield, Target, Fuel as Funnel, Search, Link2, FileText, Brain, Grid3X3, TrendingDown, Sigma as Sitemap, Bell, BookOpen, Zap } from 'lucide-react';
import QuickStats from '../components/Dashboard/QuickStats';
import RecentActivity from '../components/Dashboard/RecentActivity';
import ModuleCard from '../components/modules/ModuleCard';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import AboutUs from '../components/sections/AboutUs';
import OurServices from '../components/sections/OurServices';
import SucceedingTogether from '../components/sections/SucceedingTogether';
import FAQ from '../components/sections/FAQ';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { user } = useAuth();

  const modules = [
    {
      id: 'seo-task-manager',
      title: t('seo-task-manager'),
      description: language === 'en' 
        ? 'Manage SEO tasks with AI-powered priority suggestions and drag & drop interface'
        : 'Yapay zeka destekli öncelik önerileri ve sürükle & bırak arayüzü ile SEO görevlerini yönetin',
      icon: BarChart3,
      color: 'bg-blue-500',
      stats: [
        { label: language === 'en' ? 'Active Tasks' : 'Aktif Görevler', value: '23' },
        { label: language === 'en' ? 'Completed' : 'Tamamlanan', value: '45' }
      ],
      path: '/seo-task-manager'
    },
    {
      id: 'content-calendar',
      title: t('content-calendar'),
      description: language === 'en'
        ? 'Schedule content with AI-powered optimal timing and trend-based recommendations'
        : 'Yapay zeka destekli optimal zamanlama ve trend tabanlı önerilerle içerik planlayın',
      icon: Calendar,
      color: 'bg-green-500',
      stats: [
        { label: language === 'en' ? 'Scheduled' : 'Planlanmış', value: '12' },
        { label: language === 'en' ? 'This Month' : 'Bu Ay', value: '28' }
      ],
      path: '/content-calendar'
    },
    {
      id: 'keywords',
      title: t('keywords'),
      description: language === 'en'
        ? 'Research keywords with difficulty scoring and search volume analysis'
        : 'Zorluk puanlaması ve arama hacmi analizi ile anahtar kelime araştırması yapın',
      icon: Search,
      color: 'bg-purple-500',
      stats: [
        { label: language === 'en' ? 'Tracked' : 'Takip Edilen', value: '342' },
        { label: language === 'en' ? 'Opportunities' : 'Fırsatlar', value: '28' }
      ],
      path: '/keywords'
    },
    {
      id: 'site-audit',
      title: t('site-audit'),
      description: language === 'en'
        ? 'Technical SEO audit with page speed analysis and mobile-friendly testing'
        : 'Sayfa hızı analizi ve mobil uyumluluk testi ile teknik SEO denetimi',
      icon: Shield,
      color: 'bg-orange-500',
      stats: [
        { label: language === 'en' ? 'Issues Found' : 'Bulunan Sorunlar', value: '15' },
        { label: language === 'en' ? 'Fixed' : 'Düzeltilen', value: '32' }
      ],
      path: '/site-audit'
    },
    {
      id: 'rank-tracking',
      title: t('rank-tracking'),
      description: language === 'en'
        ? 'Daily rank monitoring with SERP position tracking and ranking history'
        : 'SERP pozisyon takibi ve sıralama geçmişi ile günlük sıralama izleme',
      icon: TrendingDown,
      color: 'bg-teal-500',
      stats: [
        { label: language === 'en' ? 'Keywords' : 'Anahtar Kelimeler', value: '87' },
        { label: language === 'en' ? 'Avg Position' : 'Ort. Pozisyon', value: '12' }
      ],
      path: '/rank-tracking'
    },
    {
      id: 'backlink-analysis',
      title: t('backlink-analysis'),
      description: language === 'en'
        ? 'Backlink profile analysis with link quality assessment and toxic link detection'
        : 'Bağlantı kalitesi değerlendirmesi ve toksik bağlantı tespiti ile backlink profil analizi',
      icon: Link2,
      color: 'bg-red-500',
      stats: [
        { label: language === 'en' ? 'Total Links' : 'Toplam Bağlantı', value: '1.2K' },
        { label: language === 'en' ? 'Quality Score' : 'Kalite Puanı', value: '78' }
      ],
      path: '/backlink-analysis'
    },
    {
      id: 'competitor-analysis',
      title: t('competitor-analysis'),
      description: language === 'en'
        ? 'Competitor keyword analysis with traffic comparison and content strategy insights'
        : 'Trafik karşılaştırması ve içerik stratejisi içgörüleri ile rakip anahtar kelime analizi',
      icon: Users,
      color: 'bg-indigo-500',
      stats: [
        { label: language === 'en' ? 'Competitors' : 'Rakipler', value: '8' },
        { label: language === 'en' ? 'Gap Keywords' : 'Boşluk Kelimeleri', value: '156' }
      ],
      path: '/competitor-analysis'
    },
    {
      id: 'content-analysis',
      title: t('content-analysis'),
      description: language === 'en'
        ? 'Content quality scoring with readability analysis and SEO optimization'
        : 'Okunabilirlik analizi ve SEO optimizasyonu ile içerik kalitesi puanlaması',
      icon: FileText,
      color: 'bg-pink-500',
      stats: [
        { label: language === 'en' ? 'Avg Score' : 'Ort. Puan', value: '82' },
        { label: language === 'en' ? 'Analyzed' : 'Analiz Edilen', value: '156' }
      ],
      path: '/content-analysis'
    }
  ];

  const renderWelcomeSection = () => {
    if (user) {
      // Existing user dashboard
      return (
        <>
          <div className="text-center py-12 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/10 dark:to-teal-900/10 rounded-xl">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              {t('welcome-back')}, {user.name}!
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {language === 'en' 
                ? 'Traffic overview and personalized recommendations'
                : 'Trafik genel bakışı ve kişiselleştirilmiş öneriler'}
            </p>
          </div>
          <QuickStats />
        </>
      );
    } else {
      // New user welcome
      return (
        <div className="bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/10 dark:to-teal-900/10 rounded-xl p-12 mb-12 shadow-lg">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
              {t('welcome-to-platform')}
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              {language === 'en'
                ? 'Your comprehensive SEO management platform with AI-powered insights. Get started with our powerful tools to improve your search engine rankings.'
                : 'Yapay zeka destekli içgörülerle kapsamlı SEO yönetim platformunuz. Arama motoru sıralamalarınızı iyileştirmek için güçlü araçlarımızla başlayın.'}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('what-we-do')}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {language === 'en'
                    ? 'Comprehensive SEO analysis, keyword research, site audits, and performance tracking'
                    : 'Kapsamlı SEO analizi, anahtar kelime araştırması, site denetimleri ve performans takibi'}
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-green-50 dark:bg-green-900/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('quick-start-guide')}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {language === 'en'
                    ? 'Learn how to use our platform with step-by-step tutorials and best practices'
                    : 'Adım adım eğitimler ve en iyi uygulamalarla platformumuzu nasıl kullanacağınızı öğrenin'}
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-purple-50 dark:bg-purple-900/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('get-started')}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {language === 'en'
                    ? 'Start with a site audit or keyword research to identify optimization opportunities'
                    : 'Optimizasyon fırsatlarını belirlemek için bir site denetimi veya anahtar kelime araştırması ile başlayın'}
                </p>
              </div>
            </div>
            
            <div className="flex justify-center space-x-6 mt-10">
              <button
                onClick={() => navigate('/site-audit')}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-xl hover:from-blue-600 hover:to-teal-500 transition-all font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300"
              >
                {language === 'en' ? 'Start Site Audit' : 'Site Denetimi Başlat'}
              </button>
              <button
                onClick={() => navigate('/education')}
                className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                {language === 'en' ? 'View Tutorials' : 'Eğitimleri Görüntüle'}
              </button>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="space-y-16 bg-white dark:bg-gray-900">
      {/* Welcome Section */}
      {renderWelcomeSection()}

      {/* About Us Section */}
      <AboutUs />

      {/* Our Services Section */}
      <OurServices />

      {/* Modules Grid */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">
          {language === 'en' ? 'SEO Modules' : 'SEO Modülleri'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {modules.map((module) => (
            <ModuleCard
              key={module.id}
              title={module.title}
              description={module.description}
              icon={module.icon}
              color={module.color}
              stats={module.stats}
              onClick={() => navigate(module.path)}
            />
          ))}
        </div>
      </div>

      {/* We Believe in Succeeding Together */}
      <SucceedingTogether />

      {/* Recent Activity and Quick Actions */}
      {user && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <RecentActivity />
          
          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
            <div className="p-8 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{language === 'en' ? 'Quick Actions' : 'Hızlı İşlemler'}</h3>
            </div>
            <div className="p-8">
              <div className="space-y-4">
                <button
                  onClick={() => navigate('/seo-task-manager')}
                  className="w-full text-left p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors hover:border-blue-300 dark:hover:border-blue-700"
                >
                  <div className="font-bold text-gray-900 dark:text-white text-lg">{language === 'en' ? 'Create New SEO Task' : 'Yeni SEO Görevi Oluştur'}</div>
                  <div className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Add a new task to your SEO workflow' : 'SEO iş akışınıza yeni bir görev ekleyin'}</div>
                </button>
                <button
                  onClick={() => navigate('/content-calendar')}
                  className="w-full text-left p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors hover:border-blue-300 dark:hover:border-blue-700"
                >
                  <div className="font-bold text-gray-900 dark:text-white text-lg">{language === 'en' ? 'Schedule Content' : 'İçerik Planla'}</div>
                  <div className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Plan your content publishing schedule' : 'İçerik yayınlama takviminizi planlayın'}</div>
                </button>
                <button
                  onClick={() => navigate('/keywords')}
                  className="w-full text-left p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors hover:border-blue-300 dark:hover:border-blue-700"
                >
                  <div className="font-bold text-gray-900 dark:text-white text-lg">{language === 'en' ? 'Research Keywords' : 'Anahtar Kelime Araştır'}</div>
                  <div className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Find new keyword opportunities' : 'Yeni anahtar kelime fırsatları bulun'}</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FAQ Section */}
      <FAQ />
    </div>
  );
};

export default DashboardPage;