import React, { useState } from 'react';
import { Search, Plus, Filter, TrendingUp, TrendingDown, Minus, Crown, BarChart3, Clock, Target, Zap } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useKeyword } from '../../contexts/KeywordContext';
import { useAuth } from '../../contexts/AuthContext';
import UpgradeModal from '../common/UpgradeModal';
import { useNavigate, useLocation } from 'react-router-dom';

const EnhancedKeywords: React.FC = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const { canAddKeyword, addKeyword, getRemainingKeywords, getTotalLimit, keywordUsage } = useKeyword();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [newKeyword, setNewKeyword] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [activeTab, setActiveTab] = useState('tracking');
  const [selectedKeywordForTitle, setSelectedKeywordForTitle] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Set active tab based on URL query parameter
  React.useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');
    if (tab && ['tracking', 'entrenchment', 'title-optimizer'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [location]);

  // Update URL when tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`/keywords?tab=${tab}`, { replace: true });
  };

  const mockKeywords = [
    {
      id: 1,
      keyword: 'seo tools',
      searchVolume: 12000,
      difficulty: 65,
      cpc: 4.5,
      trend: 'up',
      position: 15,
      traffic: 240,
      intent: language === 'en' ? 'commercial' : 'ticari',
      entrenchmentScore: 85,
      entrenchmentDuration: language === 'en' ? '3 months' : '3 ay',
      deadWeight: false
    },
    {
      id: 2,
      keyword: 'keyword research',
      searchVolume: 8500,
      difficulty: 45,
      cpc: 3.2,
      trend: 'stable',
      position: 8,
      traffic: 680,
      intent: language === 'en' ? 'informational' : 'bilgilendirici',
      entrenchmentScore: 92,
      entrenchmentDuration: language === 'en' ? '6 months' : '6 ay',
      deadWeight: false
    },
    {
      id: 3,
      keyword: 'seo audit',
      searchVolume: 6200,
      difficulty: 55,
      cpc: 5.8,
      trend: 'down',
      position: 25,
      traffic: 124,
      intent: language === 'en' ? 'commercial' : 'ticari',
      entrenchmentScore: 45,
      entrenchmentDuration: language === 'en' ? '2 weeks' : '2 hafta',
      deadWeight: true
    }
  ];

  const titleVariations = [
    {
      id: 1,
      keyword: 'seo tools',
      variations: [
        { title: language === 'en' ? 'Best SEO Tools for 2024: Complete Guide' : '2024 için En İyi SEO Araçları: Kapsamlı Rehber', ctrPrediction: 8.5, currentTitle: true },
        { title: language === 'en' ? '15 Essential SEO Tools Every Marketer Needs' : 'Her Pazarlamacının İhtiyaç Duyduğu 15 Temel SEO Aracı', ctrPrediction: 9.2, currentTitle: false },
        { title: language === 'en' ? 'Top SEO Tools Comparison: Free vs Paid' : 'En İyi SEO Araçları Karşılaştırması: Ücretsiz ve Ücretli', ctrPrediction: 7.8, currentTitle: false },
        { title: language === 'en' ? 'Ultimate SEO Tools Guide: Boost Your Rankings' : 'Nihai SEO Araçları Rehberi: Sıralamalarınızı Yükseltin', ctrPrediction: 8.9, currentTitle: false }
      ]
    }
  ];

  const tabs = [
    { id: 'tracking', label: language === 'en' ? 'Keyword Tracking' : 'Anahtar Kelime Takibi', icon: Search },
    { id: 'entrenchment', label: language === 'en' ? 'SERP Entrenchment' : 'SERP Yerleşimi', icon: Clock },
    { id: 'title-optimizer', label: language === 'en' ? 'Title Optimizer' : 'Başlık Optimize Edici', icon: Target }
  ];

  const filteredKeywords = mockKeywords.filter(keyword => {
    if (!keyword || !keyword.keyword) return false;
    
    const matchesSearch = searchTerm ? keyword.keyword.toLowerCase().includes(searchTerm.toLowerCase()) : true;
    const matchesFilter = selectedFilter === 'all' || 
      (selectedFilter === 'high-volume' && keyword.searchVolume > 5000) ||
      (selectedFilter === 'low-difficulty' && keyword.difficulty < 50) ||
      (selectedFilter === 'trending' && keyword.trend === 'up') ||
      (selectedFilter === 'dead-weight' && keyword.deadWeight);
    
    return matchesSearch && matchesFilter;
  });

  const handleAddKeyword = async () => {
    if (!newKeyword.trim()) return;

    if (!canAddKeyword) {
      setShowUpgradeModal(true);
      return;
    }

    setIsAdding(true);
    const success = await addKeyword(newKeyword.trim());
    setIsAdding(false);

    if (success) {
      setNewKeyword('');
    }
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 30) return 'text-green-600 bg-green-100 dark:bg-green-900/50 dark:text-green-300';
    if (difficulty <= 60) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/50 dark:text-yellow-300';
    return 'text-red-600 bg-red-100 dark:bg-red-900/50 dark:text-red-300';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const getEntrenchmentColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const remainingKeywords = getRemainingKeywords();
  const totalLimit = getTotalLimit();

  const renderKeywordTracking = () => (
    <div className="space-y-6">
      {/* Add Keyword Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              id="keyword-search-input"
              type="text"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              placeholder={t('search-placeholder')}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleAddKeyword()}
            />
          </div>
          <button
            onClick={handleAddKeyword}
            disabled={isAdding || !newKeyword.trim() || !canAddKeyword}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {isAdding ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {language === 'en' ? 'Adding...' : 'Ekleniyor...'}
              </>
            ) : (
              <>
                <Plus className="w-5 h-5 mr-2" />
                {language === 'en' ? 'Add Keyword' : 'Anahtar Kelime Ekle'}
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
              {totalLimit === -1 ? t('unlimited') + (language === 'en' ? ' keywords' : ' anahtar kelime') : `${keywordUsage?.totalCount || 0}/${totalLimit} ${language === 'en' ? 'keywords used' : 'anahtar kelime kullanıldı'}`}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            {user?.plan === 'free' && remainingKeywords === 0 && (
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
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={language === 'en' ? "Search keywords..." : "Anahtar kelimeleri ara..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div id="keyword-filters" className="flex gap-2">
          {[
            { id: 'all', label: language === 'en' ? 'All Keywords' : 'Tüm Anahtar Kelimeler' },
            { id: 'high-volume', label: language === 'en' ? 'High Volume' : 'Yüksek Hacim' },
            { id: 'low-difficulty', label: language === 'en' ? 'Low Difficulty' : 'Düşük Zorluk' },
            { id: 'trending', label: language === 'en' ? 'Trending' : 'Yükselen' },
            { id: 'dead-weight', label: language === 'en' ? 'Dead Weight' : 'Ölü Ağırlık' }
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedFilter === filter.id
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Keywords Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{language === 'en' ? 'Keyword Analysis' : 'Anahtar Kelime Analizi'}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {language === 'en' ? 'Keyword' : 'Anahtar Kelime'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {language === 'en' ? 'Search Volume' : 'Arama Hacmi'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {language === 'en' ? 'Difficulty' : 'Zorluk'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {language === 'en' ? 'Position' : 'Pozisyon'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {language === 'en' ? 'Entrenchment' : 'Yerleşim'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {language === 'en' ? 'Trend' : 'Trend'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {language === 'en' ? 'Status' : 'Durum'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredKeywords.map((keyword) => (
                <tr key={keyword.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {keyword.keyword}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {keyword.searchVolume.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(keyword.difficulty)}`}>
                      {keyword.difficulty}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    #{keyword.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className={`font-medium ${getEntrenchmentColor(keyword.entrenchmentScore)}`}>
                        {keyword.entrenchmentScore}%
                      </div>
                      <div className="text-gray-500 dark:text-gray-500 text-xs">
                        {keyword.entrenchmentDuration}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getTrendIcon(keyword.trend)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {keyword.deadWeight ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300">
                        {language === 'en' ? 'Dead Weight' : 'Ölü Ağırlık'}
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                        {language === 'en' ? 'Active' : 'Aktif'}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSERPEntrenchment = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{language === 'en' ? 'SERP Stability Analysis' : 'SERP Kararlılık Analizi'}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {language === 'en'
            ? 'Track how long your keywords have maintained their current positions and identify stability patterns.'
            : 'Anahtar kelimelerinizin mevcut konumlarını ne kadar süre koruduğunu izleyin ve kararlılık desenlerini belirleyin.'}
        </p>

        <div className="space-y-4">
          {mockKeywords.map((keyword) => (
            <div key={keyword.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900 dark:text-white">{keyword.keyword}</h4>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {language === 'en' ? 'Position' : 'Pozisyon'} #{keyword.position}
                  </span>
                  <span className={`text-sm font-medium ${getEntrenchmentColor(keyword.entrenchmentScore)}`}>
                    {keyword.entrenchmentScore}% {language === 'en' ? 'stable' : 'kararlı'}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Duration at position:' : 'Pozisyondaki süre:'}</span>
                  <div className="font-medium text-gray-900 dark:text-white">{keyword.entrenchmentDuration}</div>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Stability trend:' : 'Kararlılık trendi:'}</span>
                  <div className="flex items-center">
                    {getTrendIcon(keyword.trend)}
                    <span className="ml-1 font-medium text-gray-900 dark:text-white capitalize">{keyword.trend === 'up' ? (language === 'en' ? 'up' : 'yukarı') : keyword.trend === 'down' ? (language === 'en' ? 'down' : 'aşağı') : (language === 'en' ? 'stable' : 'kararlı')}</span>
                  </div>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Traffic impact:' : 'Trafik etkisi:'}</span>
                  <div className="font-medium text-gray-900 dark:text-white">{keyword.traffic} {language === 'en' ? 'visits/month' : 'ziyaret/ay'}</div>
                </div>
              </div>

              <div className="mt-3">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      keyword.entrenchmentScore >= 80 ? 'bg-green-500' :
                      keyword.entrenchmentScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${keyword.entrenchmentScore}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTitleOptimizer = () => (
    <div className="space-y-6">
      {/* Keyword Selection */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{language === 'en' ? 'AI Title Combat Arena' : 'Yapay Zeka Başlık Savaş Arenası'}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {language === 'en'
            ? 'A/B test different title variations with AI-powered CTR predictions.'
            : 'Yapay zeka destekli CTR tahminleriyle farklı başlık varyasyonlarını A/B test edin.'}
        </p>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {language === 'en' ? 'Select Keyword to Optimize' : 'Optimize Edilecek Anahtar Kelimeyi Seçin'}
          </label>
          <select 
            value={selectedKeywordForTitle || ''}
            onChange={(e) => setSelectedKeywordForTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="">{language === 'en' ? 'Choose a keyword...' : 'Bir anahtar kelime seçin...'}</option>
            {mockKeywords.map((keyword) => (
              <option key={keyword.id} value={keyword.keyword}>
                {keyword.keyword} ({language === 'en' ? 'Position' : 'Pozisyon'} #{keyword.position})
              </option>
            ))}
          </select>
        </div>

        {selectedKeywordForTitle && (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 dark:text-white">{language === 'en' ? 'Title Variations for' : 'Şunun için Başlık Varyasyonları'} "{selectedKeywordForTitle}"</h4>
            
            {titleVariations[0].variations.map((variation, index) => (
              <div key={index} className={`border rounded-lg p-4 ${
                variation.currentTitle 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                  : 'border-gray-200 dark:border-gray-700'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-gray-900 dark:text-white">{variation.title}</h5>
                  {variation.currentTitle && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 rounded text-xs font-medium">
                      {language === 'en' ? 'Current' : 'Mevcut'}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-sm">
                      <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Predicted CTR:' : 'Tahmini CTR:'}</span>
                      <span className={`ml-1 font-medium ${
                        variation.ctrPrediction >= 9 ? 'text-green-600 dark:text-green-400' :
                        variation.ctrPrediction >= 8 ? 'text-yellow-600 dark:text-yellow-400' :
                        'text-red-600 dark:text-red-400'
                      }`}>
                        {variation.ctrPrediction}%
                      </span>
                    </div>
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          variation.ctrPrediction >= 9 ? 'bg-green-500' :
                          variation.ctrPrediction >= 8 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${variation.ctrPrediction * 10}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {!variation.currentTitle && (
                    <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm">
                      {language === 'en' ? 'Test This Title' : 'Bu Başlığı Test Et'}
                    </button>
                  )}
                </div>
              </div>
            ))}

            <button className="w-full px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 rounded-lg hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <Zap className="w-4 h-4 inline mr-2" />
              {language === 'en' ? 'Generate More AI Variations' : 'Daha Fazla Yapay Zeka Varyasyonu Oluştur'}
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('keywords')}</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {language === 'en'
            ? 'Advanced keyword research and optimization with AI-powered insights'
            : 'Yapay zeka destekli içgörülerle gelişmiş anahtar kelime araştırması ve optimizasyonu'}
        </p>
      </div>

      {/* Tabs */}
      <div id="keyword-tabs" className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
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
      {activeTab === 'tracking' && renderKeywordTracking()}
      {activeTab === 'entrenchment' && renderSERPEntrenchment()}
      {activeTab === 'title-optimizer' && renderTitleOptimizer()}

      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        feature={language === 'en' ? 'keyword tracking' : 'anahtar kelime takibi'}
        currentLimit={`${totalLimit} ${language === 'en' ? 'total keywords' : 'toplam anahtar kelime'}`}
      />
    </div>
  );
};

export default EnhancedKeywords;