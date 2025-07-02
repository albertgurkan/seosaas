import React, { useState } from 'react';
import { Link, ExternalLink, Shield, AlertTriangle, TrendingUp, Plus, Zap, Target, Brain, BarChart3, Clock, ChevronLeft, ChevronRight, Calendar, Search, Filter, TrendingDown, Minus, Eye, Globe, Map } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';
import { useLanguage } from '../../contexts/LanguageContext';
import { useNavigate, useLocation } from 'react-router-dom';

const EnhancedRankTracking: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedKeyword, setSelectedKeyword] = useState('seo tools');
  const [timelinePosition, setTimelinePosition] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // Set active tab based on URL query parameter
  React.useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');
    if (tab && ['overview', 'serp-terrain', 'serp-features', 'keywords'].includes(tab)) {
      setSelectedTab(tab);
    }
  }, [location]);

  // Update URL when tab changes
  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    navigate(`/rank-tracking?tab=${tab}`, { replace: true });
  };

  const rankingData = [
    { date: '2024-01-01', position: 15 },
    { date: '2024-01-02', position: 14 },
    { date: '2024-01-03', position: 16 },
    { date: '2024-01-04', position: 13 },
    { date: '2024-01-05', position: 12 },
    { date: '2024-01-06', position: 11 },
    { date: '2024-01-07', position: 10 },
    { date: '2024-01-08', position: 9 },
    { date: '2024-01-09', position: 11 },
    { date: '2024-01-10', position: 8 }
  ];

  const serpLandscapeData = [
    {
      position: 1,
      domain: 'competitor1.com',
      contentType: language === 'en' ? 'Guide' : 'Rehber',
      stability: 95,
      title: language === 'en' ? 'Complete SEO Tools Guide 2024' : 'Kapsamlı SEO Araçları Rehberi 2024',
      snippet: language === 'en' ? 'Comprehensive guide to the best SEO tools...' : 'En iyi SEO araçları için kapsamlı rehber...',
      features: [language === 'en' ? 'Featured Snippet' : 'Öne Çıkan Snippet'],
      traffic: 15000
    },
    {
      position: 2,
      domain: 'competitor2.com',
      contentType: language === 'en' ? 'List' : 'Liste',
      stability: 87,
      title: language === 'en' ? '15 Best SEO Tools for 2024' : '2024 için 15 En İyi SEO Aracı',
      snippet: language === 'en' ? 'Discover the top SEO tools that professionals use...' : 'Profesyonellerin kullandığı en iyi SEO araçlarını keşfedin...',
      features: [language === 'en' ? 'People Also Ask' : 'İnsanlar Ayrıca Soruyor'],
      traffic: 12000
    },
    {
      position: 3,
      domain: 'yoursite.com',
      contentType: language === 'en' ? 'Review' : 'İnceleme',
      stability: 72,
      title: language === 'en' ? 'SEO Tools Review and Comparison' : 'SEO Araçları İncelemesi ve Karşılaştırması',
      snippet: language === 'en' ? 'In-depth review of popular SEO tools...' : 'Popüler SEO araçlarının derinlemesine incelemesi...',
      features: [],
      traffic: 8500
    },
    {
      position: 4,
      domain: 'competitor3.com',
      contentType: language === 'en' ? 'Tool' : 'Araç',
      stability: 91,
      title: language === 'en' ? 'Free SEO Tools Collection' : 'Ücretsiz SEO Araçları Koleksiyonu',
      snippet: language === 'en' ? 'Access our collection of free SEO tools...' : 'Ücretsiz SEO araçları koleksiyonumuza erişin...',
      features: [language === 'en' ? 'Site Links' : 'Site Bağlantıları'],
      traffic: 9200
    },
    {
      position: 5,
      domain: 'competitor4.com',
      contentType: language === 'en' ? 'Blog' : 'Blog',
      stability: 65,
      title: language === 'en' ? 'How to Choose the Right SEO Tools' : 'Doğru SEO Araçlarını Nasıl Seçersiniz',
      snippet: language === 'en' ? 'Learn how to select the best SEO tools for your needs...' : 'İhtiyaçlarınız için en iyi SEO araçlarını nasıl seçeceğinizi öğrenin...',
      features: [],
      traffic: 6800
    }
  ];

  const serpFeatures = [
    {
      feature: language === 'en' ? 'Featured Snippet' : 'Öne Çıkan Snippet',
      currentHolder: 'competitor1.com',
      opportunity: 'high',
      requirements: language === 'en' ? 
        ['Answer format', 'Clear structure', 'Authoritative content'] : 
        ['Cevap formatı', 'Net yapı', 'Yetkili içerik'],
      recommendations: language === 'en' ? 
        [
          'Restructure content with clear Q&A format',
          'Add numbered lists and bullet points',
          'Include schema markup for FAQ'
        ] : 
        [
          'İçeriği net soru-cevap formatıyla yeniden yapılandırın',
          'Numaralı listeler ve madde işaretleri ekleyin',
          'SSS için şema işaretlemesi ekleyin'
        ]
    },
    {
      feature: language === 'en' ? 'People Also Ask' : 'İnsanlar Ayrıca Soruyor',
      currentHolder: 'competitor2.com',
      opportunity: 'medium',
      requirements: language === 'en' ? 
        ['Related questions', 'Comprehensive answers', 'Topic authority'] : 
        ['İlgili sorular', 'Kapsamlı cevaplar', 'Konu otoritesi'],
      recommendations: language === 'en' ? 
        [
          'Add FAQ section with related questions',
          'Create comprehensive topic clusters',
          'Optimize for question-based queries'
        ] : 
        [
          'İlgili sorularla SSS bölümü ekleyin',
          'Kapsamlı konu kümeleri oluşturun',
          'Soru tabanlı sorgular için optimize edin'
        ]
    },
    {
      feature: language === 'en' ? 'Site Links' : 'Site Bağlantıları',
      currentHolder: 'competitor3.com',
      opportunity: 'low',
      requirements: language === 'en' ? 
        ['Strong brand signals', 'Clear site structure', 'High authority'] : 
        ['Güçlü marka sinyalleri', 'Net site yapısı', 'Yüksek otorite'],
      recommendations: language === 'en' ? 
        [
          'Improve internal linking structure',
          'Enhance brand mentions and citations',
          'Optimize navigation and site architecture'
        ] : 
        [
          'İç bağlantı yapısını geliştirin',
          'Marka bahislerini ve alıntılarını artırın',
          'Navigasyon ve site mimarisini optimize edin'
        ]
    },
    {
      feature: language === 'en' ? 'Related Searches' : 'İlgili Aramalar',
      currentHolder: language === 'en' ? 'Multiple' : 'Çoklu',
      opportunity: 'high',
      requirements: language === 'en' ? 
        ['Semantic relevance', 'Content depth', 'User intent match'] : 
        ['Anlamsal ilgi', 'İçerik derinliği', 'Kullanıcı niyeti eşleşmesi'],
      recommendations: language === 'en' ? 
        [
          'Create content for related search terms',
          'Build semantic keyword clusters',
          'Optimize for user intent variations'
        ] : 
        [
          'İlgili arama terimleri için içerik oluşturun',
          'Anlamsal anahtar kelime kümeleri oluşturun',
          'Kullanıcı niyeti varyasyonları için optimize edin'
        ]
    }
  ];

  const keywords = [
    {
      id: 1,
      keyword: 'seo tools',
      currentPosition: 8,
      previousPosition: 15,
      change: 7,
      searchVolume: 12000,
      url: '/seo-tools',
      device: language === 'en' ? 'desktop' : 'masaüstü',
      stability: 72
    },
    {
      id: 2,
      keyword: 'keyword research',
      currentPosition: 12,
      previousPosition: 10,
      change: -2,
      searchVolume: 8500,
      url: '/keyword-research',
      device: language === 'en' ? 'mobile' : 'mobil',
      stability: 85
    },
    {
      id: 3,
      keyword: 'seo audit',
      currentPosition: 25,
      previousPosition: 25,
      change: 0,
      searchVolume: 6200,
      url: '/seo-audit',
      device: language === 'en' ? 'desktop' : 'masaüstü',
      stability: 91
    },
    {
      id: 4,
      keyword: 'backlink analysis',
      currentPosition: 6,
      previousPosition: 8,
      change: 2,
      searchVolume: 4800,
      url: '/backlink-analysis',
      device: language === 'en' ? 'mobile' : 'mobil',
      stability: 68
    }
  ];

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (change < 0) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600 dark:text-green-400';
    if (change < 0) return 'text-red-600 dark:text-red-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  const getPositionColor = (position: number) => {
    if (position <= 3) return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
    if (position <= 10) return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
    if (position <= 20) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
    return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
  };

  const getStabilityColor = (stability: number) => {
    if (stability >= 80) return 'text-green-600 dark:text-green-400';
    if (stability >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getOpportunityColor = (opportunity: string) => {
    switch (opportunity) {
      case 'high':
        return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
      case 'low':
        return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300';
    }
  };

  const tabs = [
    { id: 'overview', label: language === 'en' ? 'Overview' : 'Genel Bakış' },
    { id: 'serp-terrain', label: language === 'en' ? 'SERP Landscape' : 'SERP Manzarası' },
    { id: 'serp-features', label: language === 'en' ? 'SERP Feature Infiltrator' : 'SERP Özellik Sızma Aracı' },
    { id: 'keywords', label: language === 'en' ? 'All Keywords' : 'Tüm Anahtar Kelimeler' }
  ];

  const renderSERPTerrain = () => (
    <div className="space-y-6">
      {/* 3D SERP Visualization Header */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Map className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{language === 'en' ? 'SERP Terrain Visualizer' : 'SERP Arazi Görselleştirici'}</h3>
          </div>
          <div className="flex items-center space-x-4">
            <select 
              value={selectedKeyword}
              onChange={(e) => setSelectedKeyword(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              {keywords.map(k => (
                <option key={k.keyword} value={k.keyword}>{k.keyword}</option>
              ))}
            </select>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
              <Eye className="w-4 h-4 mr-2 inline" />
              {language === 'en' ? '3D View' : '3B Görünüm'}
            </button>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          {language === 'en' 
            ? 'Interactive 3D visualization of SERP structure showing content types, stability, and competitive landscape.'
            : 'İçerik türlerini, kararlılığı ve rekabet ortamını gösteren SERP yapısının interaktif 3B görselleştirmesi.'}
        </p>
      </div>

      {/* Timeline Slider */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-gray-900 dark:text-white">{language === 'en' ? 'SERP Evolution Timeline' : 'SERP Evrim Zaman Çizelgesi'}</h4>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {new Date(Date.now() - timelinePosition * 24 * 60 * 60 * 1000).toLocaleDateString()}
          </span>
        </div>
        <div className="relative">
          <input
            type="range"
            min="0"
            max="30"
            value={timelinePosition}
            onChange={(e) => setTimelinePosition(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-500 mt-2">
            <span>{language === 'en' ? '30 days ago' : '30 gün önce'}</span>
            <span>{language === 'en' ? 'Today' : 'Bugün'}</span>
          </div>
        </div>
      </div>

      {/* SERP Results Visualization */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {language === 'en' ? `SERP Results for "${selectedKeyword}"` : `"${selectedKeyword}" için SERP Sonuçları`}
          </h3>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {serpLandscapeData.map((result, index) => (
              <div 
                key={index} 
                className={`border-l-4 p-4 rounded-lg transition-all hover:shadow-md ${
                  result.domain === 'yoursite.com' 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${getPositionColor(result.position)}`}>
                        {result.position}
                      </span>
                      <h4 className="font-medium text-gray-900 dark:text-white">{result.title}</h4>
                      {result.domain === 'yoursite.com' && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 rounded text-xs font-medium">
                          {language === 'en' ? 'Your Site' : 'Siteniz'}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {result.domain} • {result.snippet}
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className={`px-2 py-1 rounded ${
                        result.contentType === 'Guide' || result.contentType === 'Rehber' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300' :
                        result.contentType === 'List' || result.contentType === 'Liste' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' :
                        result.contentType === 'Review' || result.contentType === 'İnceleme' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' :
                        result.contentType === 'Tool' || result.contentType === 'Araç' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300'
                      }`}>
                        {result.contentType}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {language === 'en' ? 'Traffic:' : 'Trafik:'} {result.traffic.toLocaleString()}
                      </span>
                      {result.features.length > 0 && (
                        <div className="flex space-x-1">
                          {result.features.map((feature, idx) => (
                            <span key={idx} className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 rounded text-xs">
                              {feature}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className={`text-lg font-bold ${getStabilityColor(result.stability)}`}>
                      {result.stability}%
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{language === 'en' ? 'Stability' : 'Kararlılık'}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Competitive Analysis */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{language === 'en' ? 'Competitive Insights' : 'Rekabet İçgörüleri'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">3.2</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Avg Position Changes/Week' : 'Ort. Pozisyon Değişimi/Hafta'}</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">78%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'SERP Stability Score' : 'SERP Kararlılık Puanı'}</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">5</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Content Types in Top 10' : 'İlk 10\'daki İçerik Türleri'}</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSERPFeatures = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl p-6">
        <div className="flex items-center mb-4">
          <Target className="w-6 h-6 text-green-600 dark:text-green-400 mr-3" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{language === 'en' ? 'SERP Feature Infiltrator' : 'SERP Özellik Sızma Aracı'}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          {language === 'en'
            ? 'AI-powered analysis of Google SERP features with optimization recommendations for featured snippets, People Also Ask, and more.'
            : 'Öne çıkan snippet\'ler, İnsanlar Ayrıca Soruyor ve daha fazlası için optimizasyon önerileriyle Google SERP özelliklerinin yapay zeka destekli analizi.'}
        </p>
      </div>

      {/* SERP Features Analysis */}
      <div className="space-y-6">
        {serpFeatures.map((feature, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {feature.feature}
                </h4>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {language === 'en' ? 'Current holder:' : 'Mevcut sahip:'} <span className="font-medium">{feature.currentHolder}</span>
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getOpportunityColor(feature.opportunity)}`}>
                    {feature.opportunity === 'high' ? (language === 'en' ? 'high' : 'yüksek') : 
                     feature.opportunity === 'medium' ? (language === 'en' ? 'medium' : 'orta') : 
                     (language === 'en' ? 'low' : 'düşük')} {language === 'en' ? 'opportunity' : 'fırsat'}
                  </span>
                </div>
              </div>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                <Zap className="w-4 h-4 mr-2 inline" />
                {language === 'en' ? 'Optimize' : 'Optimize Et'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white mb-3">{language === 'en' ? 'Requirements' : 'Gereksinimler'}</h5>
                <ul className="space-y-2">
                  {feature.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-gray-600 dark:text-gray-400">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="font-medium text-gray-900 dark:text-white mb-3">{language === 'en' ? 'AI Recommendations' : 'Yapay Zeka Önerileri'}</h5>
                <ul className="space-y-2">
                  {feature.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600 dark:text-gray-400">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  {language === 'en' ? 'Generate Content Brief' : 'İçerik Özeti Oluştur'}
                </button>
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
                  {language === 'en' ? 'Add to Tasks' : 'Görevlere Ekle'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SERP Feature Tracking */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{language === 'en' ? 'Feature Presence Tracking' : 'Özellik Varlığı Takibi'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">23%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Featured Snippets' : 'Öne Çıkan Snippet\'ler'}</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">67%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'People Also Ask' : 'İnsanlar Ayrıca Soruyor'}</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">12%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Site Links' : 'Site Bağlantıları'}</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">89%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Related Searches' : 'İlgili Aramalar'}</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">87</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Tracked Keywords' : 'Takip Edilen Anahtar Kelimeler'}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">23</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Top 10 Rankings' : 'İlk 10 Sıralama'}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">12.3</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Average Position' : 'Ortalama Pozisyon'}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">+15</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Positions Gained' : 'Kazanılan Pozisyonlar'}</div>
        </div>
      </div>

      {/* Ranking Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{language === 'en' ? 'Ranking Trends' : 'Sıralama Trendleri'}</h3>
          <div className="flex gap-2">
            {[
              { id: '7d', label: language === 'en' ? '7 days' : '7 gün' },
              { id: '30d', label: language === 'en' ? '30 days' : '30 gün' },
              { id: '90d', label: language === 'en' ? '90 days' : '90 gün' }
            ].map((period) => (
              <button
                key={period.id}
                onClick={() => setSelectedPeriod(period.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedPeriod === period.id
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={rankingData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
                className="text-gray-600 dark:text-gray-400"
              />
              <YAxis 
                reversed
                domain={[1, 50]}
                className="text-gray-600 dark:text-gray-400"
              />
              <Tooltip 
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                formatter={(value) => [`${language === 'en' ? 'Position' : 'Pozisyon'} ${value}`, language === 'en' ? 'Ranking' : 'Sıralama']}
                contentStyle={{
                  backgroundColor: 'var(--tooltip-bg)',
                  border: '1px solid var(--tooltip-border)',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="position" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderKeywordsTable = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{language === 'en' ? 'Keyword Rankings' : 'Anahtar Kelime Sıralamaları'}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {language === 'en' ? 'Keyword' : 'Anahtar Kelime'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {language === 'en' ? 'Current Position' : 'Mevcut Pozisyon'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {language === 'en' ? 'Change' : 'Değişim'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {language === 'en' ? 'Stability' : 'Kararlılık'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {language === 'en' ? 'Search Volume' : 'Arama Hacmi'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                URL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {language === 'en' ? 'Device' : 'Cihaz'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {language === 'en' ? 'Actions' : 'İşlemler'}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {keywords.map((keyword) => (
              <tr key={keyword.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {keyword.keyword}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPositionColor(keyword.currentPosition)}`}>
                    #{keyword.currentPosition}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getTrendIcon(keyword.change)}
                    <span className={`ml-1 text-sm font-medium ${getChangeColor(keyword.change)}`}>
                      {keyword.change > 0 ? `+${keyword.change}` : keyword.change}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-sm font-medium ${getStabilityColor(keyword.stability)}`}>
                    {keyword.stability}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {keyword.searchVolume.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                  {keyword.url}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    keyword.device === 'desktop' || keyword.device === 'masaüstü'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300'
                      : 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                  }`}>
                    {keyword.device}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mr-3">
                    {language === 'en' ? 'View SERP' : 'SERP\'i Görüntüle'}
                  </button>
                  <button className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300">
                    {language === 'en' ? 'Remove' : 'Kaldır'}
                  </button>
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('rank-tracking')}</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {language === 'en'
              ? 'Advanced rank tracking with SERP terrain visualization and feature infiltration analysis'
              : 'SERP arazi görselleştirme ve özellik sızma analizi ile gelişmiş sıralama takibi'}
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          {language === 'en' ? 'Add Keywords' : 'Anahtar Kelime Ekle'}
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
      {selectedTab === 'serp-terrain' && renderSERPTerrain()}
      {selectedTab === 'serp-features' && renderSERPFeatures()}
      {selectedTab === 'keywords' && renderKeywordsTable()}
    </div>
  );
};

export default EnhancedRankTracking;