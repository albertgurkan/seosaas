import React, { useState } from 'react';
import { Brain, Network, Target, TrendingUp, Search, Plus, Filter } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useNavigate, useLocation } from 'react-router-dom';

const SemanticAnalysis: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState('expansion');
  const navigate = useNavigate();
  const location = useLocation();

  // Set active tab based on URL query parameter
  React.useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');
    if (tab && ['expansion', 'thought-vectors'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [location]);

  // Update URL when tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`/semantic-analysis?tab=${tab}`, { replace: true });
  };

  const semanticClusters = [
    {
      id: 1,
      topic: language === 'en' ? 'SEO Analytics' : 'SEO Analitiği',
      depth: 85,
      uniqueness: 72,
      potential: 'high',
      relatedConcepts: language === 'en' 
        ? ['data analysis', 'performance metrics', 'ranking insights'] 
        : ['veri analizi', 'performans metrikleri', 'sıralama içgörüleri'],
      contentGaps: language === 'en'
        ? ['SEO analytics vs business intelligence', 'analytics automation tools']
        : ['SEO analitiği ve iş zekası karşılaştırması', 'analitik otomasyon araçları'],
      searchVolume: 8500,
      competition: language === 'en' ? 'medium' : 'orta'
    },
    {
      id: 2,
      topic: language === 'en' ? 'Technical SEO' : 'Teknik SEO',
      depth: 92,
      uniqueness: 68,
      potential: 'high',
      relatedConcepts: language === 'en'
        ? ['site architecture', 'crawl optimization', 'core web vitals']
        : ['site mimarisi', 'tarama optimizasyonu', 'temel web vitalleri'],
      contentGaps: language === 'en'
        ? ['technical SEO vs user experience', 'automation in technical SEO']
        : ['teknik SEO ve kullanıcı deneyimi', 'teknik SEO\'da otomasyon'],
      searchVolume: 12000,
      competition: language === 'en' ? 'high' : 'yüksek'
    },
    {
      id: 3,
      topic: language === 'en' ? 'Content Strategy' : 'İçerik Stratejisi',
      depth: 78,
      uniqueness: 81,
      potential: 'medium',
      relatedConcepts: language === 'en'
        ? ['content planning', 'editorial calendar', 'content optimization']
        : ['içerik planlama', 'yayın takvimi', 'içerik optimizasyonu'],
      contentGaps: language === 'en'
        ? ['content strategy vs content marketing', 'AI-driven content planning']
        : ['içerik stratejisi ve içerik pazarlama karşılaştırması', 'Yapay zeka destekli içerik planlama'],
      searchVolume: 6200,
      competition: language === 'en' ? 'medium' : 'orta'
    }
  ];

  const thoughtVectors = [
    {
      id: 1,
      query: language === 'en' ? 'how to improve seo' : 'seo nasıl iyileştirilir',
      intent: language === 'en' ? 'informational' : 'bilgilendirici',
      nextQueries: language === 'en' 
        ? ['seo tools', 'seo checklist', 'seo audit'] 
        : ['seo araçları', 'seo kontrol listesi', 'seo denetimi'],
      userJourney: language === 'en'
        ? ['awareness', 'research', 'comparison', 'decision']
        : ['farkındalık', 'araştırma', 'karşılaştırma', 'karar'],
      contentRecommendations: language === 'en'
        ? ['beginner guide', 'tool comparison', 'case studies']
        : ['başlangıç rehberi', 'araç karşılaştırması', 'vaka çalışmaları']
    },
    {
      id: 2,
      query: language === 'en' ? 'best seo tools' : 'en iyi seo araçları',
      intent: language === 'en' ? 'commercial' : 'ticari',
      nextQueries: language === 'en'
        ? ['seo tool pricing', 'seo tool reviews', 'free seo tools']
        : ['seo aracı fiyatlandırması', 'seo aracı incelemeleri', 'ücretsiz seo araçları'],
      userJourney: language === 'en'
        ? ['research', 'comparison', 'trial', 'purchase']
        : ['araştırma', 'karşılaştırma', 'deneme', 'satın alma'],
      contentRecommendations: language === 'en'
        ? ['tool reviews', 'pricing comparison', 'free trials']
        : ['araç incelemeleri', 'fiyat karşılaştırması', 'ücretsiz denemeler']
    }
  ];

  const tabs = [
    { id: 'expansion', label: language === 'en' ? 'Topical Expansion' : 'Konu Genişletme', icon: Network },
    { id: 'thought-vectors', label: language === 'en' ? 'Thought Vectors' : 'Düşünce Vektörleri', icon: Brain }
  ];

  const getPotentialColor = (potential: string) => {
    switch (potential) {
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

  const renderTopicalExpansion = () => (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">23</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Semantic Clusters' : 'Semantik Kümeler'}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">156</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Content Opportunities' : 'İçerik Fırsatları'}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">78%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Avg Topic Depth' : 'Ort. Konu Derinliği'}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">42</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Untapped Clusters' : 'Kullanılmamış Kümeler'}</div>
        </div>
      </div>

      {/* Semantic Clusters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{language === 'en' ? 'Semantic Topic Clusters' : 'Semantik Konu Kümeleri'}</h3>
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4 mr-2" />
              {language === 'en' ? 'Analyze New Topic' : 'Yeni Konu Analiz Et'}
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-6">
            {semanticClusters.map((cluster) => (
              <div key={cluster.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {cluster.topic}
                    </h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>{language === 'en' ? 'Volume:' : 'Hacim:'} {cluster.searchVolume.toLocaleString()}</span>
                      <span>{language === 'en' ? 'Competition:' : 'Rekabet:'} {cluster.competition}</span>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPotentialColor(cluster.potential)}`}>
                    {cluster.potential === 'high' ? (language === 'en' ? 'high' : 'yüksek') : 
                     cluster.potential === 'medium' ? (language === 'en' ? 'medium' : 'orta') : 
                     (language === 'en' ? 'low' : 'düşük')} {language === 'en' ? 'potential' : 'potansiyel'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-3">{language === 'en' ? 'Topic Metrics' : 'Konu Metrikleri'}</h5>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Depth Score' : 'Derinlik Puanı'}</span>
                          <span className="font-medium text-gray-900 dark:text-white">{cluster.depth}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${cluster.depth}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Uniqueness' : 'Benzersizlik'}</span>
                          <span className="font-medium text-gray-900 dark:text-white">{cluster.uniqueness}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${cluster.uniqueness}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-3">{language === 'en' ? 'Content Opportunities' : 'İçerik Fırsatları'}</h5>
                    <div className="space-y-2">
                      {cluster.contentGaps.map((gap, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <Target className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-400">{gap}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">{language === 'en' ? 'Related Concepts' : 'İlgili Kavramlar'}</h5>
                  <div className="flex flex-wrap gap-2">
                    {cluster.relatedConcepts.map((concept, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderThoughtVectors = () => (
    <div className="space-y-6">
      {/* Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{language === 'en' ? 'User Intent Journey Mapping' : 'Kullanıcı Niyet Yolculuğu Haritalama'}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {language === 'en'
            ? 'Analyze user search patterns and predict their next queries to optimize content strategy.'
            : 'Kullanıcı arama kalıplarını analiz edin ve içerik stratejisini optimize etmek için sonraki sorgularını tahmin edin.'}
        </p>

        <div className="space-y-6">
          {thoughtVectors.map((vector) => (
            <div key={vector.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    "{vector.query}"
                  </h4>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    vector.intent === 'informational' || vector.intent === 'bilgilendirici' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' :
                    vector.intent === 'commercial' || vector.intent === 'ticari' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' :
                    'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300'
                  }`}>
                    {vector.intent} {language === 'en' ? 'intent' : 'niyet'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-3">{language === 'en' ? 'Next Likely Queries' : 'Olası Sonraki Sorgular'}</h5>
                  <div className="space-y-2">
                    {vector.nextQueries.map((query, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <Search className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-gray-600 dark:text-gray-400">{query}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-3">{language === 'en' ? 'User Journey Stages' : 'Kullanıcı Yolculuğu Aşamaları'}</h5>
                  <div className="space-y-2">
                    {vector.userJourney.map((stage, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-medium mr-2">
                          {index + 1}
                        </div>
                        <span className="text-gray-600 dark:text-gray-400 capitalize">{stage}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-3">{language === 'en' ? 'Content Recommendations' : 'İçerik Önerileri'}</h5>
                  <div className="space-y-2">
                    {vector.contentRecommendations.map((rec, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <Target className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-gray-600 dark:text-gray-400">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('semantic-analysis')}</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {language === 'en'
            ? 'Discover semantic relationships and user intent patterns to optimize your content strategy'
            : 'İçerik stratejinizi optimize etmek için semantik ilişkileri ve kullanıcı niyet kalıplarını keşfedin'}
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
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
      {activeTab === 'expansion' && renderTopicalExpansion()}
      {activeTab === 'thought-vectors' && renderThoughtVectors()}
    </div>
  );
};

export default SemanticAnalysis;