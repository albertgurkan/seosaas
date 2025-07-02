import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle, Clock, Zap, Smartphone, Search, Globe, Crown, Plus, BarChart3 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAudit } from '../contexts/AuditContext';
import { useAuth } from '../contexts/AuthContext';
import RecommendationCard from '../components/audit/RecommendationCard';
import UpgradeModal from '../components/common/UpgradeModal';
import { useNavigate } from 'react-router-dom';

const SiteAuditPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { canRunAudit, runAudit, getRemainingAudits, getAuditLimit } = useAudit();
  const [auditUrl, setAuditUrl] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [completedRecommendations, setCompletedRecommendations] = useState<Set<string>>(new Set());
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedRecommendations, setSelectedRecommendations] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState('overview');

  const auditResults = {
    overall: 78,
    technical: 85,
    seo: 72,
    performance: 68,
    mobile: 82,
    security: 90
  };

  const recommendations = [
    {
      id: '1',
      title: language === 'en' ? 'Optimize Images for Better Performance' : 'Daha İyi Performans için Görselleri Optimize Edin',
      description: language === 'en' ? 'Large uncompressed images are slowing down your site' : 'Büyük sıkıştırılmamış görseller sitenizi yavaşlatıyor',
      priority: 'critical' as const,
      impact: 'high' as const,
      effort: 'medium' as const,
      category: language === 'en' ? 'Performance' : 'Performans',
      affectedPages: ['/home', '/about', '/products', '/blog/post-1', '/blog/post-2'],
      howToFix: language === 'en' ? [
        'Compress images using tools like TinyPNG or ImageOptim',
        'Convert images to modern formats (WebP, AVIF)',
        'Implement responsive images with srcset attribute',
        'Add lazy loading to images below the fold'
      ] : [
        'TinyPNG veya ImageOptim gibi araçlarla görselleri sıkıştırın',
        'Görselleri modern formatlara dönüştürün (WebP, AVIF)',
        'srcset özniteliği ile duyarlı görseller uygulayın',
        'Sayfa altındaki görsellere tembel yükleme ekleyin'
      ],
      estimatedTime: language === 'en' ? '2-4 hours' : '2-4 saat',
      resources: [
        { title: 'Image Optimization Guide', url: 'https://web.dev/optimize-images/' },
        { title: 'WebP Converter Tool', url: 'https://squoosh.app/' }
      ],
      metrics: language === 'en' ? '15 images need optimization, potential 1.8MB savings' : '15 görsel optimizasyon gerektiriyor, potansiyel 1.8MB tasarruf'
    },
    {
      id: '2',
      title: language === 'en' ? 'Add Missing Meta Descriptions' : 'Eksik Meta Açıklamaları Ekleyin',
      description: language === 'en' ? 'Multiple pages lack meta descriptions for better search visibility' : 'Birden fazla sayfada daha iyi arama görünürlüğü için meta açıklamaları eksik',
      priority: 'important' as const,
      impact: 'medium' as const,
      effort: 'low' as const,
      category: language === 'en' ? 'On-Page SEO' : 'Sayfa İçi SEO',
      affectedPages: ['/services', '/contact', '/blog/category/seo', '/blog/category/marketing'],
      howToFix: language === 'en' ? [
        'Write unique meta descriptions for each page (150-160 characters)',
        'Include target keywords naturally',
        'Make descriptions compelling to encourage clicks',
        'Avoid duplicate meta descriptions across pages'
      ] : [
        'Her sayfa için benzersiz meta açıklamaları yazın (150-160 karakter)',
        'Hedef anahtar kelimeleri doğal olarak dahil edin',
        'Tıklamaları teşvik etmek için açıklamaları çekici hale getirin',
        'Sayfalar arasında yinelenen meta açıklamalardan kaçının'
      ],
      estimatedTime: language === 'en' ? '1-2 hours' : '1-2 saat',
      resources: [
        { title: 'Meta Description Best Practices', url: 'https://moz.com/learn/seo/meta-description' }
      ],
      metrics: language === 'en' ? '12 pages missing meta descriptions' : '12 sayfada meta açıklamaları eksik'
    },
    {
      id: '3',
      title: language === 'en' ? 'Fix Mobile Usability Issues' : 'Mobil Kullanılabilirlik Sorunlarını Düzeltin',
      description: language === 'en' ? 'Text too small and buttons not easily tappable on mobile devices' : 'Metin çok küçük ve düğmeler mobil cihazlarda kolayca dokunulamıyor',
      priority: 'critical' as const,
      impact: 'high' as const,
      effort: 'medium' as const,
      category: language === 'en' ? 'Mobile SEO' : 'Mobil SEO',
      affectedPages: ['/contact', '/checkout'],
      howToFix: language === 'en' ? [
        'Increase font size to minimum 16px for body text',
        'Ensure buttons are at least 44px in height',
        'Add proper spacing between clickable elements',
        'Test on real mobile devices'
      ] : [
        'Gövde metni için yazı tipi boyutunu minimum 16px\'e yükseltin',
        'Düğmelerin en az 44px yüksekliğinde olduğundan emin olun',
        'Tıklanabilir öğeler arasına uygun boşluk ekleyin',
        'Gerçek mobil cihazlarda test edin'
      ],
      estimatedTime: language === 'en' ? '3-5 hours' : '3-5 saat',
      resources: [
        { title: 'Mobile-Friendly Test', url: 'https://search.google.com/test/mobile-friendly' }
      ],
      metrics: language === 'en' ? '3 pages with mobile usability issues' : '3 sayfada mobil kullanılabilirlik sorunları'
    },
    {
      id: '4',
      title: language === 'en' ? 'Improve Page Loading Speed' : 'Sayfa Yükleme Hızını İyileştirin',
      description: language === 'en' ? 'Core Web Vitals scores need improvement for better user experience' : 'Daha iyi kullanıcı deneyimi için Temel Web Vitalleri puanlarının iyileştirilmesi gerekiyor',
      priority: 'important' as const,
      impact: 'high' as const,
      effort: 'high' as const,
      category: language === 'en' ? 'Technical SEO' : 'Teknik SEO',
      affectedPages: ['/home', '/products'],
      howToFix: language === 'en' ? [
        'Minimize and compress CSS and JavaScript files',
        'Enable browser caching with proper cache headers',
        'Use a Content Delivery Network (CDN)',
        'Optimize server response times'
      ] : [
        'CSS ve JavaScript dosyalarını küçültün ve sıkıştırın',
        'Uygun önbellek başlıklarıyla tarayıcı önbelleğini etkinleştirin',
        'İçerik Dağıtım Ağı (CDN) kullanın',
        'Sunucu yanıt sürelerini optimize edin'
      ],
      estimatedTime: language === 'en' ? '4-8 hours' : '4-8 saat',
      resources: [
        { title: 'PageSpeed Insights', url: 'https://pagespeed.web.dev/' },
        { title: 'Core Web Vitals Guide', url: 'https://web.dev/vitals/' }
      ],
      metrics: 'LCP: 3.2s, FID: 180ms, CLS: 0.15'
    },
    {
      id: '5',
      title: language === 'en' ? 'Add Alt Text to Images' : 'Görsellere Alt Metni Ekleyin',
      description: language === 'en' ? 'Images missing alt text affect accessibility and SEO' : 'Alt metni eksik görseller erişilebilirliği ve SEO\'yu etkiler',
      priority: 'minor' as const,
      impact: 'low' as const,
      effort: 'low' as const,
      category: language === 'en' ? 'Accessibility' : 'Erişilebilirlik',
      affectedPages: ['/gallery', '/team', '/blog/post-3'],
      howToFix: language === 'en' ? [
        'Add descriptive alt text to all images',
        'Keep alt text concise but descriptive',
        'Include keywords naturally when relevant',
        'Use empty alt="" for decorative images'
      ] : [
        'Tüm görsellere açıklayıcı alt metni ekleyin',
        'Alt metni kısa ama açıklayıcı tutun',
        'İlgili olduğunda anahtar kelimeleri doğal olarak dahil edin',
        'Dekoratif görseller için boş alt="" kullanın'
      ],
      estimatedTime: language === 'en' ? '1 hour' : '1 saat',
      resources: [
        { title: 'Alt Text Best Practices', url: 'https://webaim.org/techniques/alttext/' }
      ],
      metrics: language === 'en' ? '8 images missing alt text' : '8 görselde alt metni eksik'
    }
  ];

  const nonPerformingPages = [
    {
      id: 1,
      url: '/old-blog-post-2019',
      crawlFrequency: language === 'en' ? 'daily' : 'günlük',
      lastRanked: language === 'en' ? 'never' : 'hiç',
      trafficLast30Days: 0,
      recommendation: 'noindex',
      crawlBudgetWaste: language === 'en' ? 'high' : 'yüksek'
    },
    {
      id: 2,
      url: '/duplicate-content-page',
      crawlFrequency: language === 'en' ? 'weekly' : 'haftalık',
      lastRanked: language === 'en' ? '6 months ago' : '6 ay önce',
      trafficLast30Days: 2,
      recommendation: language === 'en' ? 'consolidate' : 'birleştir',
      crawlBudgetWaste: language === 'en' ? 'medium' : 'orta'
    }
  ];

  const tabs = [
    { id: 'overview', label: language === 'en' ? 'Overview' : 'Genel Bakış', icon: BarChart3 },
    { id: 'crawl-budget', label: language === 'en' ? 'Crawl Budget Analysis' : 'Tarama Bütçesi Analizi', icon: Globe }
  ];

  const handleRunAudit = async () => {
    if (!auditUrl.trim()) {
      return;
    }

    if (!canRunAudit) {
      setShowUpgradeModal(true);
      return;
    }

    setIsRunning(true);
    const success = await runAudit(auditUrl);
    setIsRunning(false);

    if (success) {
      // Audit completed successfully
    }
  };

  const handleToggleComplete = (id: string) => {
    const newCompleted = new Set(completedRecommendations);
    if (newCompleted.has(id)) {
      newCompleted.delete(id);
    } else {
      newCompleted.add(id);
    }
    setCompletedRecommendations(newCompleted);
  };

  const handleAutoGenerateTasks = () => {
    setSelectedRecommendations(new Set(recommendations.map(r => r.id)));
    setShowTaskModal(true);
  };

  const handleAcceptTasks = () => {
    // Convert selected recommendations to tasks
    const tasksCreated = Array.from(selectedRecommendations).length;
    setShowTaskModal(false);
    setSelectedRecommendations(new Set());
    
    // Navigate to task manager
    navigate('/seo-task-manager');
  };

  const getCompletionStats = () => {
    const total = recommendations.length;
    const completed = completedRecommendations.size;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    const criticalTotal = recommendations.filter(r => r.priority === 'critical').length;
    const criticalCompleted = recommendations.filter(r => r.priority === 'critical' && completedRecommendations.has(r.id)).length;
    
    const importantTotal = recommendations.filter(r => r.priority === 'important').length;
    const importantCompleted = recommendations.filter(r => r.priority === 'important' && completedRecommendations.has(r.id)).length;
    
    const minorTotal = recommendations.filter(r => r.priority === 'minor').length;
    const minorCompleted = recommendations.filter(r => r.priority === 'minor' && completedRecommendations.has(r.id)).length;

    return {
      overall: { completed, total, percentage },
      critical: { completed: criticalCompleted, total: criticalTotal },
      important: { completed: importantCompleted, total: importantTotal },
      minor: { completed: minorCompleted, total: minorTotal }
    };
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getCrawlBudgetWasteColor = (level: string) => {
    switch (level) {
      case 'high':
      case 'yüksek':
        return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
      case 'medium':
      case 'orta':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
      case 'low':
      case 'düşük':
        return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300';
    }
  };

  const remainingAudits = getRemainingAudits();
  const auditLimit = getAuditLimit();
  const stats = getCompletionStats();

  const renderCrawlBudgetAnalysis = () => (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">23</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <div className="relative group">
              <span>{language === 'en' ? 'Non-Performing Pages' : 'Performanssız Sayfalar'}</span>
              <div className="absolute left-0 bottom-full mb-2 w-64 p-2 bg-gray-900 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                {language === 'en' 
                  ? 'Pages that consume crawl budget without providing ranking value or traffic' 
                  : 'Sıralama değeri veya trafik sağlamadan tarama bütçesi tüketen sayfalar'}
                <div className="absolute bottom-0 left-4 translate-y-1/2 w-2 h-2 bg-gray-900 transform rotate-45"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">156</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Daily Crawl Budget' : 'Günlük Tarama Bütçesi'}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">78%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Budget Efficiency' : 'Bütçe Verimliliği'}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">34</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Wasted Crawls/Day' : 'Boşa Giden Tarama/Gün'}</div>
        </div>
      </div>

      {/* Non-Performing Pages */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            <div className="relative group inline-flex items-center">
              <span>{language === 'en' ? 'Non-Performing Pages' : 'Performanssız Sayfalar'}</span>
              <div className="absolute left-0 bottom-full mb-2 w-64 p-2 bg-gray-900 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                {language === 'en' 
                  ? 'Pages that consume crawl budget without providing ranking value or traffic' 
                  : 'Sıralama değeri veya trafik sağlamadan tarama bütçesi tüketen sayfalar'}
                <div className="absolute bottom-0 left-4 translate-y-1/2 w-2 h-2 bg-gray-900 transform rotate-45"></div>
              </div>
            </div>
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {language === 'en' ? 'Pages consuming crawl budget without ranking value' : 'Sıralama değeri olmadan tarama bütçesi tüketen sayfalar'}
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  URL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {language === 'en' ? 'Crawl Frequency' : 'Tarama Sıklığı'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {language === 'en' ? 'Last Ranked' : 'Son Sıralama'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {language === 'en' ? 'Traffic (30d)' : 'Trafik (30g)'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {language === 'en' ? 'Budget Impact' : 'Bütçe Etkisi'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {language === 'en' ? 'Recommendation' : 'Öneri'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {nonPerformingPages.map((page) => (
                <tr key={page.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 dark:text-blue-400 hover:underline">
                    {page.url}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {page.crawlFrequency}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {page.lastRanked}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {page.trafficLast30Days}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCrawlBudgetWasteColor(page.crawlBudgetWaste)}`}>
                      {page.crawlBudgetWaste}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                      {page.recommendation}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderOverview = () => (
    <>
      {/* Overall Score */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
        <div className="text-center">
          <div className={`text-6xl font-bold mb-2 ${getScoreColor(auditResults.overall)}`}>
            {auditResults.overall}
          </div>
          <div className="text-lg text-gray-600 dark:text-gray-400 mb-4">{language === 'en' ? 'Overall SEO Score' : 'Genel SEO Puanı'}</div>
          <div className="flex justify-center">
            <div className={`w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden`}>
              <div 
                className={`h-full transition-all duration-500 ${
                  auditResults.overall >= 80 ? 'bg-green-500' :
                  auditResults.overall >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${auditResults.overall}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { key: 'technical', label: language === 'en' ? 'Technical SEO' : 'Teknik SEO', icon: CheckCircle, score: auditResults.technical },
          { key: 'seo', label: language === 'en' ? 'On-Page SEO' : 'Sayfa İçi SEO', icon: Search, score: auditResults.seo },
          { key: 'performance', label: language === 'en' ? 'Performance' : 'Performans', icon: Zap, score: auditResults.performance },
          { key: 'mobile', label: language === 'en' ? 'Mobile Friendly' : 'Mobil Uyumlu', icon: Smartphone, score: auditResults.mobile },
          { key: 'security', label: language === 'en' ? 'Security' : 'Güvenlik', icon: CheckCircle, score: auditResults.security }
        ].map((category) => {
          const Icon = category.icon;
          return (
            <div key={category.key} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Icon className={`w-6 h-6 mr-3 ${getScoreColor(category.score)}`} />
                  <h3 className="font-semibold text-gray-900 dark:text-white">{category.label}</h3>
                </div>
                <span className={`text-2xl font-bold ${getScoreColor(category.score)}`}>
                  {category.score}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    category.score >= 80 ? 'bg-green-500' :
                    category.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${category.score}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Tracking */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{language === 'en' ? 'Recommendations Progress' : 'Öneriler İlerlemesi'}</h3>
          <button
            onClick={handleAutoGenerateTasks}
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t('auto-generate-tasks')}
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.overall.percentage}%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Overall Complete' : 'Genel Tamamlama'}</div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
              <div 
                className="h-2 bg-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${stats.overall.percentage}%` }}
              ></div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-bold text-red-600 dark:text-red-400">
              {stats.critical.completed}/{stats.critical.total}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Critical Issues' : 'Kritik Sorunlar'}</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
              {stats.important.completed}/{stats.important.total}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Important Issues' : 'Önemli Sorunlar'}</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-bold text-green-600 dark:text-green-400">
              {stats.minor.completed}/{stats.minor.total}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Minor Issues' : 'Küçük Sorunlar'}</div>
          </div>
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400">
          <p>{language === 'en' ? 'Estimated SEO score improvement:' : 'Tahmini SEO puanı iyileştirmesi:'} <span className="font-medium text-green-600 dark:text-green-400">+{Math.round(stats.overall.percentage * 0.15)}</span></p>
          <p>{language === 'en' ? 'Total time investment:' : 'Toplam zaman yatırımı:'} <span className="font-medium">{language === 'en' ? '8-15 hours' : '8-15 saat'}</span></p>
        </div>
      </div>

      {/* Detailed Recommendations */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{language === 'en' ? 'Detailed Recommendations' : 'Detaylı Öneriler'}</h3>
        
        {recommendations.map((recommendation) => (
          <RecommendationCard
            key={recommendation.id}
            {...recommendation}
            completed={completedRecommendations.has(recommendation.id)}
            onToggleComplete={handleToggleComplete}
          />
        ))}
      </div>
    </>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('site-audit')}</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {language === 'en'
            ? 'Comprehensive technical SEO audit with actionable recommendations'
            : 'Uygulanabilir önerilerle kapsamlı teknik SEO denetimi'}
        </p>
      </div>

      {/* URL Input Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="url"
                value={auditUrl}
                onChange={(e) => setAuditUrl(e.target.value)}
                placeholder="https://yourwebsite.com"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <button
            onClick={handleRunAudit}
            disabled={isRunning || !auditUrl.trim()}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg font-medium"
          >
            {isRunning ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {language === 'en' ? 'Running Audit...' : 'Denetim Çalışıyor...'}
              </>
            ) : (
              <>
                <Search className="w-5 h-5 mr-2" />
                {language === 'en' ? 'Run New Audit' : 'Yeni Denetim Çalıştır'}
              </>
            )}
          </button>
        </div>

        {/* Usage Indicator */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {user?.plan === 'free' ? (language === 'en' ? 'Free Plan:' : 'Ücretsiz Plan:') : `${user?.plan} ${language === 'en' ? 'Plan:' : 'Plan:'}`}
            </span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {auditLimit === -1 ? t('unlimited') + (language === 'en' ? ' audits' : ' denetim') : `${auditLimit - (remainingAudits || 0)}/${auditLimit} ${language === 'en' ? 'audits used this month' : 'denetim bu ay kullanıldı'}`}
            </span>
          </div>
          {user?.plan === 'free' && remainingAudits === 0 && (
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 rounded-full text-sm font-medium hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors"
            >
              <Crown className="w-4 h-4 mr-1" />
              {t('upgrade-for-more')}
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'crawl-budget' && renderCrawlBudgetAnalysis()}

      {/* Task Generation Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('auto-generate-tasks')}</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {language === 'en'
                  ? 'Convert audit recommendations into actionable tasks in your SEO Task Manager'
                  : 'Denetim önerilerini SEO Görev Yöneticinizde uygulanabilir görevlere dönüştürün'}
              </p>
            </div>
            
            <div className="p-6">
              <div className="space-y-4 mb-6">
                {recommendations.map((rec) => (
                  <div key={rec.id} className="flex items-start space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <input
                      type="checkbox"
                      checked={selectedRecommendations.has(rec.id)}
                      onChange={(e) => {
                        const newSelected = new Set(selectedRecommendations);
                        if (e.target.checked) {
                          newSelected.add(rec.id);
                        } else {
                          newSelected.delete(rec.id);
                        }
                        setSelectedRecommendations(newSelected);
                      }}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">{rec.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{rec.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs">
                        <span className={`px-2 py-1 rounded ${
                          rec.priority === 'critical' ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' :
                          rec.priority === 'important' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' :
                          'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                        }`}>
                          {rec.priority === 'critical' ? (language === 'en' ? 'critical' : 'kritik') :
                           rec.priority === 'important' ? (language === 'en' ? 'important' : 'önemli') :
                           (language === 'en' ? 'minor' : 'küçük')}
                        </span>
                        <span className="text-gray-500 dark:text-gray-500">{rec.estimatedTime}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowTaskModal(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {t('cancel')}
                </button>
                <button
                  onClick={handleAcceptTasks}
                  disabled={selectedRecommendations.size === 0}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('accept-tasks')} ({selectedRecommendations.size})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        feature={language === 'en' ? 'site audit' : 'site denetimi'}
        currentLimit={`${auditLimit} ${language === 'en' ? `audit${auditLimit === 1 ? '' : 's'} per month` : `denetim${auditLimit === 1 ? '' : ''} / ay`}`}
      />
    </div>
  );
};

export default SiteAuditPage;