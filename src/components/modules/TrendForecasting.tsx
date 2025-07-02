import React, { useState } from 'react';
import { TrendingUp, Calendar, Target, Zap, Filter, Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useLanguage } from '../../contexts/LanguageContext';

const TrendForecasting: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState('3months');

  const trendData = [
    { month: 'Jan', current: 1200, predicted: 1350, confidence: 85 },
    { month: 'Feb', current: 1350, predicted: 1480, confidence: 82 },
    { month: 'Mar', current: 1180, predicted: 1620, confidence: 78 },
    { month: 'Apr', current: null, predicted: 1750, confidence: 75 },
    { month: 'May', current: null, predicted: 1890, confidence: 72 },
    { month: 'Jun', current: null, predicted: 2100, confidence: 68 }
  ];

  const emergingTrends = [
    {
      id: 1,
      keyword: language === 'en' ? 'AI content optimization' : 'Yapay zeka içerik optimizasyonu',
      currentVolume: 2400,
      predictedVolume: 8900,
      growth: 271,
      confidence: 89,
      timeframe: language === 'en' ? '6 months' : '6 ay',
      category: language === 'en' ? 'Technology' : 'Teknoloji',
      opportunity: 'high',
      seasonality: language === 'en' ? 'none' : 'yok'
    },
    {
      id: 2,
      keyword: language === 'en' ? 'voice search SEO' : 'sesli arama SEO',
      currentVolume: 1800,
      predictedVolume: 5200,
      growth: 189,
      confidence: 76,
      timeframe: language === 'en' ? '4 months' : '4 ay',
      category: 'SEO',
      opportunity: 'medium',
      seasonality: language === 'en' ? 'none' : 'yok'
    },
    {
      id: 3,
      keyword: language === 'en' ? 'sustainable marketing' : 'sürdürülebilir pazarlama',
      currentVolume: 950,
      predictedVolume: 3400,
      growth: 258,
      confidence: 82,
      timeframe: language === 'en' ? '8 months' : '8 ay',
      category: language === 'en' ? 'Marketing' : 'Pazarlama',
      opportunity: 'high',
      seasonality: language === 'en' ? 'Q2 peak' : 'Ç2 zirvesi'
    }
  ];

  const seasonalPatterns = [
    {
      id: 1,
      pattern: language === 'en' ? 'Holiday Shopping SEO' : 'Tatil Alışverişi SEO',
      peakMonths: language === 'en' ? ['Oct', 'Nov', 'Dec'] : ['Eki', 'Kas', 'Ara'],
      volumeIncrease: '340%',
      preparationTime: language === 'en' ? '3 months' : '3 ay',
      contentTypes: language === 'en' 
        ? ['gift guides', 'product reviews', 'comparison articles'] 
        : ['hediye rehberleri', 'ürün incelemeleri', 'karşılaştırma makaleleri'],
      nextPeak: '2024-10-15'
    },
    {
      id: 2,
      pattern: language === 'en' ? 'Summer Travel Content' : 'Yaz Seyahati İçeriği',
      peakMonths: language === 'en' ? ['May', 'Jun', 'Jul'] : ['May', 'Haz', 'Tem'],
      volumeIncrease: '180%',
      preparationTime: language === 'en' ? '2 months' : '2 ay',
      contentTypes: language === 'en'
        ? ['destination guides', 'travel tips', 'booking comparisons']
        : ['destinasyon rehberleri', 'seyahat ipuçları', 'rezervasyon karşılaştırmaları'],
      nextPeak: '2024-05-20'
    }
  ];

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

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600 dark:text-green-400';
    if (confidence >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('trend-forecasting')}</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {language === 'en'
              ? 'Predict emerging search trends and plan content strategy with AI-powered insights'
              : 'Yapay zeka destekli içgörülerle ortaya çıkan arama trendlerini tahmin edin ve içerik stratejisi planlayın'}
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Download className="w-4 h-4 mr-2" />
          {language === 'en' ? 'Export Forecast' : 'Tahmini Dışa Aktar'}
        </button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">23</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Emerging Trends' : 'Yükselen Trendler'}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">156%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Avg Growth Predicted' : 'Ort. Büyüme Tahmini'}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">78%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Forecast Confidence' : 'Tahmin Güveni'}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">12</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Content Opportunities' : 'İçerik Fırsatları'}</div>
        </div>
      </div>

      {/* Trend Forecast Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{language === 'en' ? 'Search Volume Forecast' : 'Arama Hacmi Tahmini'}</h3>
          <div className="flex gap-2">
            {[
              { id: '3months', label: language === 'en' ? '3 Months' : '3 Ay' },
              { id: '6months', label: language === 'en' ? '6 Months' : '6 Ay' },
              { id: '12months', label: language === 'en' ? '12 Months' : '12 Ay' }
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
            <LineChart data={trendData}>
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
              <Line 
                type="monotone" 
                dataKey="current" 
                stroke="#3B82F6" 
                strokeWidth={3}
                name={language === 'en' ? 'Current Volume' : 'Mevcut Hacim'}
                connectNulls={false}
              />
              <Line 
                type="monotone" 
                dataKey="predicted" 
                stroke="#10B981" 
                strokeWidth={3}
                strokeDasharray="5 5"
                name={language === 'en' ? 'Predicted Volume' : 'Tahmin Edilen Hacim'}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Emerging Trends */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{language === 'en' ? 'Emerging Trends' : 'Yükselen Trendler'}</h3>
            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {language === 'en' ? 'Keyword' : 'Anahtar Kelime'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {language === 'en' ? 'Current Volume' : 'Mevcut Hacim'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {language === 'en' ? 'Predicted Volume' : 'Tahmin Edilen Hacim'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {language === 'en' ? 'Growth' : 'Büyüme'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {language === 'en' ? 'Confidence' : 'Güven'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {language === 'en' ? 'Timeframe' : 'Zaman Çerçevesi'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {language === 'en' ? 'Opportunity' : 'Fırsat'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {emergingTrends.map((trend) => (
                <tr key={trend.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {trend.keyword}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-500">
                        {trend.category}
                        {trend.seasonality !== 'none' && trend.seasonality !== 'yok' && (
                          <span className="ml-2 text-blue-600 dark:text-blue-400">• {trend.seasonality}</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {trend.currentVolume.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {trend.predictedVolume.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">
                        +{trend.growth}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${getConfidenceColor(trend.confidence)}`}>
                      {trend.confidence}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {trend.timeframe}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getOpportunityColor(trend.opportunity)}`}>
                      {trend.opportunity === 'high' ? (language === 'en' ? 'high' : 'yüksek') : 
                       trend.opportunity === 'medium' ? (language === 'en' ? 'medium' : 'orta') : 
                       (language === 'en' ? 'low' : 'düşük')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Seasonal Patterns */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">{language === 'en' ? 'Seasonal Patterns' : 'Mevsimsel Desenler'}</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {seasonalPatterns.map((pattern) => (
            <div key={pattern.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                  {pattern.pattern}
                </h4>
                <Calendar className="w-5 h-5 text-blue-500" />
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Peak Months:' : 'Zirve Ayları:'}</span>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {pattern.peakMonths.join(', ')}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Volume Increase:' : 'Hacim Artışı:'}</span>
                    <div className="font-medium text-green-600 dark:text-green-400">
                      {pattern.volumeIncrease}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Prep Time:' : 'Hazırlık Süresi:'}</span>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {pattern.preparationTime}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Next Peak:' : 'Sonraki Zirve:'}</span>
                    <div className="font-medium text-blue-600 dark:text-blue-400">
                      {new Date(pattern.nextPeak).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Recommended Content Types:' : 'Önerilen İçerik Türleri:'}</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {pattern.contentTypes.map((type, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 rounded text-xs">
                        {type}
                      </span>
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
};

export default TrendForecasting;