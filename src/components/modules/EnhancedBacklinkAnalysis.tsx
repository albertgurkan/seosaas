import React, { useState } from 'react';
import { Link, ExternalLink, Shield, AlertTriangle, TrendingUp, Plus, Zap, Target, Brain, BarChart3 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';
import { useLanguage } from '../../contexts/LanguageContext';
import { useNavigate, useLocation } from 'react-router-dom';

const EnhancedBacklinkAnalysis: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Set active tab based on URL query parameter
  React.useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');
    if (tab && ['overview', 'link-magnet', 'backlinks', 'new', 'lost', 'toxic'].includes(tab)) {
      setSelectedTab(tab);
    }
  }, [location]);

  // Update URL when tab changes
  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    navigate(`/backlink-analysis?tab=${tab}`, { replace: true });
  };

  const backlinkStats = {
    total: 1247,
    dofollow: 892,
    nofollow: 355,
    newThisMonth: 23,
    lostThisMonth: 8,
    toxicLinks: 12
  };

  const linkMagnetData = [
    {
      contentType: language === 'en' ? 'Ultimate Guides' : 'Nihai Rehberler',
      linkProbability: 89,
      avgLinksEarned: 45,
      timeToCreate: language === 'en' ? '2-3 weeks' : '2-3 hafta',
      difficulty: 'high',
      examples: language === 'en' ? ['Complete SEO Guide', 'Technical SEO Handbook'] : ['Kapsamlı SEO Rehberi', 'Teknik SEO El Kitabı'],
      outreachSuccess: 34
    },
    {
      contentType: language === 'en' ? 'Industry Reports' : 'Sektör Raporları',
      linkProbability: 76,
      avgLinksEarned: 32,
      timeToCreate: language === 'en' ? '1-2 weeks' : '1-2 hafta',
      difficulty: 'medium',
      examples: language === 'en' ? ['SEO Industry Survey', 'Ranking Factors Study'] : ['SEO Sektör Anketi', 'Sıralama Faktörleri Çalışması'],
      outreachSuccess: 28
    },
    {
      contentType: language === 'en' ? 'Interactive Tools' : 'Etkileşimli Araçlar',
      linkProbability: 82,
      avgLinksEarned: 38,
      timeToCreate: language === 'en' ? '3-4 weeks' : '3-4 hafta',
      difficulty: 'high',
      examples: language === 'en' ? ['SEO Calculator', 'Keyword Difficulty Tool'] : ['SEO Hesaplayıcı', 'Anahtar Kelime Zorluk Aracı'],
      outreachSuccess: 41
    },
    {
      contentType: language === 'en' ? 'Original Research' : 'Özgün Araştırma',
      linkProbability: 94,
      avgLinksEarned: 67,
      timeToCreate: language === 'en' ? '4-6 weeks' : '4-6 hafta',
      difficulty: 'very high',
      examples: language === 'en' ? ['Algorithm Update Analysis', 'User Behavior Study'] : ['Algoritma Güncellemesi Analizi', 'Kullanıcı Davranışı Çalışması'],
      outreachSuccess: 52
    }
  ];

  const competitorPatterns = [
    {
      competitor: 'competitor1.com',
      topContentTypes: language === 'en' ? ['Guides', 'Tools', 'Research'] : ['Rehberler', 'Araçlar', 'Araştırma'],
      avgLinksPerPost: 23,
      linkVelocity: '+15/month',
      bestPerforming: language === 'en' ? 'SEO Audit Checklist (89 links)' : 'SEO Denetim Kontrol Listesi (89 bağlantı)',
      strategy: language === 'en' ? 'Resource-heavy content with interactive elements' : 'Etkileşimli öğelerle kaynak yoğun içerik'
    },
    {
      competitor: 'competitor2.com',
      topContentTypes: language === 'en' ? ['Reports', 'Case Studies', 'Tutorials'] : ['Raporlar', 'Vaka Çalışmaları', 'Eğitimler'],
      avgLinksPerPost: 18,
      linkVelocity: '+12/month',
      bestPerforming: language === 'en' ? 'Local SEO Case Study (67 links)' : 'Yerel SEO Vaka Çalışması (67 bağlantı)',
      strategy: language === 'en' ? 'Data-driven content with real examples' : 'Gerçek örneklerle veri odaklı içerik'
    }
  ];

  const outreachTemplates = [
    {
      type: language === 'en' ? 'Resource Page Addition' : 'Kaynak Sayfası Ekleme',
      subject: language === 'en' ? 'Valuable addition to your [TOPIC] resource page' : '[KONU] kaynak sayfanıza değerli bir ekleme',
      successRate: 23,
      template: language === 'en' ? 
        `Hi [NAME],

I noticed your excellent resource page on [TOPIC] at [URL]. 

I recently published a comprehensive guide on [YOUR TOPIC] that your readers might find valuable: [YOUR URL]

It covers [KEY POINTS] and includes [UNIQUE VALUE].

Would you consider adding it to your resource list?

Best regards,
[YOUR NAME]` : 
        `Merhaba [İSİM],

[URL] adresindeki [KONU] hakkındaki mükemmel kaynak sayfanızı fark ettim.

Yakın zamanda [KONUNUZ] hakkında okuyucularınızın değerli bulabileceği kapsamlı bir rehber yayınladım: [URL'NİZ]

[ANAHTAR NOKTALAR]'ı kapsıyor ve [BENZERSIZ DEĞER]'i içeriyor.

Kaynak listenize eklemeyi düşünür müsünüz?

Saygılarımla,
[İSMİNİZ]`
    },
    {
      type: language === 'en' ? 'Broken Link Replacement' : 'Kırık Bağlantı Değiştirme',
      subject: language === 'en' ? 'Broken link on your [PAGE TITLE] page' : '[SAYFA BAŞLIĞI] sayfanızda kırık bağlantı',
      successRate: 31,
      template: language === 'en' ? 
        `Hi [NAME],

I was reading your article "[ARTICLE TITLE]" and noticed a broken link to [BROKEN URL].

I have a similar resource that might work as a replacement: [YOUR URL]

It covers the same topic and provides [ADDITIONAL VALUE].

Hope this helps!

Best,
[YOUR NAME]` : 
        `Merhaba [İSİM],

"[MAKALE BAŞLIĞI]" makalenizi okurken [KIRIK URL] adresine giden kırık bir bağlantı fark ettim.

Yedek olarak kullanılabilecek benzer bir kaynağım var: [URL'NİZ]

Aynı konuyu kapsıyor ve [EK DEĞER] sağlıyor.

Umarım yardımcı olur!

Saygılarımla,
[İSMİNİZ]`
    }
  ];

  const qualityDistribution = [
    { name: language === 'en' ? 'High Quality' : 'Yüksek Kalite', value: 45, color: '#10B981' },
    { name: language === 'en' ? 'Medium Quality' : 'Orta Kalite', value: 35, color: '#F59E0B' },
    { name: language === 'en' ? 'Low Quality' : 'Düşük Kalite', value: 15, color: '#EF4444' },
    { name: language === 'en' ? 'Toxic' : 'Toksik', value: 5, color: '#7C2D12' }
  ];

  const monthlyData = [
    { month: 'Jan', gained: 45, lost: 12 },
    { month: 'Feb', gained: 52, lost: 8 },
    { month: 'Mar', gained: 38, lost: 15 },
    { month: 'Apr', gained: 61, lost: 9 },
    { month: 'May', gained: 48, lost: 11 },
    { month: 'Jun', gained: 55, lost: 7 }
  ];

  const backlinks = [
    {
      id: 1,
      domain: 'techcrunch.com',
      url: 'https://techcrunch.com/seo-tools-review',
      anchorText: 'best SEO tools',
      domainRating: 92,
      traffic: 15000,
      type: 'dofollow',
      quality: 'high',
      firstSeen: '2024-01-15',
      status: 'active'
    },
    {
      id: 2,
      domain: 'searchengineland.com',
      url: 'https://searchengineland.com/keyword-research-guide',
      anchorText: 'keyword research platform',
      domainRating: 88,
      traffic: 8500,
      type: 'dofollow',
      quality: 'high',
      firstSeen: '2024-01-12',
      status: 'active'
    },
    {
      id: 3,
      domain: 'spammy-site.com',
      url: 'https://spammy-site.com/random-page',
      anchorText: 'click here',
      domainRating: 15,
      traffic: 50,
      type: 'dofollow',
      quality: 'toxic',
      firstSeen: '2024-01-10',
      status: 'flagged'
    }
  ];

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'high':
        return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
      case 'low':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300';
      case 'toxic':
        return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300';
      case 'very high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300';
    }
  };

  const handleAIAnalysis = async () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsAnalyzing(false);
  };

  const tabs = [
    { id: 'overview', label: language === 'en' ? 'Overview' : 'Genel Bakış' },
    { id: 'link-magnet', label: language === 'en' ? 'Link Magnet Analyzer' : 'Bağlantı Mıknatısı Analizörü' },
    { id: 'backlinks', label: language === 'en' ? 'All Backlinks' : 'Tüm Backlink\'ler' },
    { id: 'new', label: language === 'en' ? 'New Links' : 'Yeni Bağlantılar' },
    { id: 'lost', label: language === 'en' ? 'Lost Links' : 'Kaybedilen Bağlantılar' },
    { id: 'toxic', label: language === 'en' ? 'Toxic Links' : 'Toksik Bağlantılar' }
  ];

  const renderLinkMagnetAnalyzer = () => (
    <div className="space-y-6">
      {/* AI Analysis Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{language === 'en' ? 'AI Link Magnet Analyzer' : 'Yapay Zeka Bağlantı Mıknatısı Analizörü'}</h3>
          </div>
          <button
            onClick={handleAIAnalysis}
            disabled={isAnalyzing}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {language === 'en' ? 'Analyzing...' : 'Analiz Ediliyor...'}
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                {language === 'en' ? 'Run AI Analysis' : 'Yapay Zeka Analizi Çalıştır'}
              </>
            )}
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          {language === 'en'
            ? 'AI-powered analysis of content types most likely to attract high-quality backlinks based on competitor patterns and industry data.'
            : 'Rakip desenleri ve sektör verilerine dayalı olarak yüksek kaliteli geri bağlantıları çekme olasılığı en yüksek içerik türlerinin yapay zeka destekli analizi.'}
        </p>
      </div>

      {/* Content Type Recommendations */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{language === 'en' ? 'Link-Worthy Content Recommendations' : 'Bağlantı Değeri Olan İçerik Önerileri'}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {language === 'en'
              ? 'Ranked by link acquisition probability and potential impact'
              : 'Bağlantı edinme olasılığı ve potansiyel etkiye göre sıralandı'}
          </p>
        </div>
        
        <div className="p-6">
          <div className="space-y-6">
            {linkMagnetData.map((content, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      {content.contentType}
                    </h4>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className={`px-2 py-1 rounded-full ${getDifficultyColor(content.difficulty)}`}>
                        {content.difficulty === 'high' ? (language === 'en' ? 'high' : 'yüksek') : 
                         content.difficulty === 'medium' ? (language === 'en' ? 'medium' : 'orta') : 
                         content.difficulty === 'very high' ? (language === 'en' ? 'very high' : 'çok yüksek') : 
                         (language === 'en' ? 'low' : 'düşük')} {language === 'en' ? 'difficulty' : 'zorluk'}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {content.timeToCreate} {language === 'en' ? 'to create' : 'oluşturma süresi'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {content.linkProbability}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Link Probability' : 'Bağlantı Olasılığı'}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-2">{language === 'en' ? 'Expected Results' : 'Beklenen Sonuçlar'}</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Avg Links Earned:' : 'Ort. Kazanılan Bağlantılar:'}</span>
                        <span className="font-medium text-gray-900 dark:text-white">{content.avgLinksEarned}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Outreach Success:' : 'İletişim Başarısı:'}</span>
                        <span className="font-medium text-gray-900 dark:text-white">{content.outreachSuccess}%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-2">{language === 'en' ? 'Examples' : 'Örnekler'}</h5>
                    <ul className="space-y-1 text-sm">
                      {content.examples.map((example, idx) => (
                        <li key={idx} className="text-gray-600 dark:text-gray-400">• {example}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-2">{language === 'en' ? 'AI Recommendations' : 'Yapay Zeka Önerileri'}</h5>
                    <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      <p>• {language === 'en' ? 'Include original data/research' : 'Özgün veri/araştırma ekleyin'}</p>
                      <p>• {language === 'en' ? 'Add interactive elements' : 'Etkileşimli öğeler ekleyin'}</p>
                      <p>• {language === 'en' ? 'Create downloadable resources' : 'İndirilebilir kaynaklar oluşturun'}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    {language === 'en' ? 'Generate Content Brief' : 'İçerik Özeti Oluştur'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Competitor Analysis */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{language === 'en' ? 'Competitor Link Patterns' : 'Rakip Bağlantı Desenleri'}</h3>
        </div>
        
        <div className="p-6">
          <div className="space-y-6">
            {competitorPatterns.map((competitor, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">{competitor.competitor}</h4>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {competitor.avgLinksPerPost}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{language === 'en' ? 'avg links/post' : 'ort. bağlantı/gönderi'}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Top Content Types:' : 'En İyi İçerik Türleri:'}</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {competitor.topContentTypes.map((type, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Link Velocity:' : 'Bağlantı Hızı:'}</span>
                    <span className="ml-2 font-medium text-green-600 dark:text-green-400">
                      {competitor.linkVelocity}
                    </span>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Best Performing:' : 'En İyi Performans Gösteren:'}</span>
                    <div className="font-medium text-gray-900 dark:text-white mt-1">
                      {competitor.bestPerforming}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Strategy:' : 'Strateji:'}</span>
                    <div className="text-gray-900 dark:text-white mt-1">
                      {competitor.strategy}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Outreach Templates */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{language === 'en' ? 'AI-Optimized Outreach Templates' : 'Yapay Zeka Optimizasyonlu İletişim Şablonları'}</h3>
        </div>
        
        <div className="p-6">
          <div className="space-y-6">
            {outreachTemplates.map((template, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">{template.type}</h4>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600 dark:text-green-400">
                      {template.successRate}%
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{language === 'en' ? 'success rate' : 'başarı oranı'}</div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'en' ? 'Subject Line:' : 'Konu Satırı:'}
                  </label>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm font-medium">
                    {template.subject}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'en' ? 'Email Template:' : 'E-posta Şablonu:'}
                  </label>
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm whitespace-pre-line">
                    {template.template}
                  </div>
                </div>
                
                <div className="mt-4 flex space-x-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    {language === 'en' ? 'Copy Template' : 'Şablonu Kopyala'}
                  </button>
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
                    {language === 'en' ? 'Customize' : 'Özelleştir'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{backlinkStats.total.toLocaleString()}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Total Backlinks' : 'Toplam Backlink\'ler'}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{backlinkStats.dofollow}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Dofollow</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{backlinkStats.nofollow}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Nofollow</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">+{backlinkStats.newThisMonth}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'New This Month' : 'Bu Ay Yeni'}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">-{backlinkStats.lostThisMonth}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Lost This Month' : 'Bu Ay Kaybedilen'}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">{backlinkStats.toxicLinks}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Toxic Links' : 'Toksik Bağlantılar'}</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quality Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{language === 'en' ? 'Link Quality Distribution' : 'Bağlantı Kalitesi Dağılımı'}</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={qualityDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {qualityDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {qualityDistribution.map((item, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {item.name}: {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{language === 'en' ? 'Monthly Link Changes' : 'Aylık Bağlantı Değişimleri'}</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" className="text-gray-600 dark:text-gray-400" />
                <YAxis className="text-gray-600 dark:text-gray-400" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--tooltip-bg)',
                    border: '1px solid var(--tooltip-border)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="gained" fill="#10B981" name={language === 'en' ? 'Gained' : 'Kazanılan'} />
                <Bar dataKey="lost" fill="#EF4444" name={language === 'en' ? 'Lost' : 'Kaybedilen'} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBacklinksTable = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{language === 'en' ? 'Backlink Details' : 'Backlink Detayları'}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {language === 'en' ? 'Domain' : 'Alan Adı'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {language === 'en' ? 'Anchor Text' : 'Çapa Metni'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                DR
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {language === 'en' ? 'Traffic' : 'Trafik'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {language === 'en' ? 'Type' : 'Tür'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {language === 'en' ? 'Quality' : 'Kalite'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {language === 'en' ? 'First Seen' : 'İlk Görülme'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {language === 'en' ? 'Actions' : 'İşlemler'}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {backlinks.map((backlink) => (
              <tr key={backlink.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Link className="w-4 h-4 text-gray-400 mr-2" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {backlink.domain}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                        {backlink.url}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {backlink.anchorText}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {backlink.domainRating}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {backlink.traffic.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    backlink.type === 'dofollow' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300'
                  }`}>
                    {backlink.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getQualityColor(backlink.quality)}`}>
                    {backlink.quality === 'high' ? (language === 'en' ? 'high' : 'yüksek') : 
                     backlink.quality === 'medium' ? (language === 'en' ? 'medium' : 'orta') : 
                     backlink.quality === 'low' ? (language === 'en' ? 'low' : 'düşük') : 
                     (language === 'en' ? 'toxic' : 'toksik')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {new Date(backlink.firstSeen).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300" title={language === 'en' ? 'Visit' : 'Ziyaret Et'}>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    {backlink.quality === 'toxic' && (
                      <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300" title={language === 'en' ? 'Disavow' : 'Reddet'}>
                        <Shield className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('backlink-analysis')}</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {language === 'en'
              ? 'AI-powered backlink analysis with link magnet recommendations and competitor insights'
              : 'Bağlantı mıknatısı önerileri ve rakip içgörüleri ile yapay zeka destekli backlink analizi'}
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          {language === 'en' ? 'Disavow Links' : 'Bağlantıları Reddet'}
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                selectedTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {selectedTab === 'overview' && renderOverview()}
      {selectedTab === 'link-magnet' && renderLinkMagnetAnalyzer()}
      {(selectedTab === 'backlinks' || selectedTab === 'new' || selectedTab === 'lost' || selectedTab === 'toxic') && renderBacklinksTable()}
    </div>
  );
};

export default EnhancedBacklinkAnalysis;