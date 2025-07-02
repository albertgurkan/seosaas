import React, { useState } from 'react';
import { Users, Plus, TrendingUp, Search, ExternalLink } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';

const CompetitorAnalysisPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedCompetitor, setSelectedCompetitor] = useState('competitor1.com');

  const competitors = [
    {
      domain: 'competitor1.com',
      organicKeywords: 15420,
      organicTraffic: 89000,
      paidKeywords: 850,
      paidTraffic: 12000,
      authorityScore: 78,
      change: '+12%'
    },
    {
      domain: 'competitor2.com',
      organicKeywords: 12800,
      organicTraffic: 67000,
      paidKeywords: 640,
      paidTraffic: 8900,
      authorityScore: 72,
      change: '+8%'
    },
    {
      domain: 'competitor3.com',
      organicKeywords: 18900,
      organicTraffic: 105000,
      paidKeywords: 1200,
      paidTraffic: 18000,
      authorityScore: 85,
      change: '-3%'
    }
  ];

  const trafficComparison = [
    { month: 'Jan', yourSite: 45000, competitor1: 89000, competitor2: 67000 },
    { month: 'Feb', yourSite: 48000, competitor1: 92000, competitor2: 69000 },
    { month: 'Mar', yourSite: 52000, competitor1: 88000, competitor2: 71000 },
    { month: 'Apr', yourSite: 55000, competitor1: 95000, competitor2: 68000 },
    { month: 'May', yourSite: 58000, competitor1: 98000, competitor2: 73000 },
    { month: 'Jun', yourSite: 61000, competitor1: 89000, competitor2: 75000 }
  ];

  const keywordGaps = [
    {
      keyword: 'seo analytics',
      yourPosition: null,
      competitorPosition: 3,
      searchVolume: 8500,
      difficulty: 45,
      opportunity: 'high'
    },
    {
      keyword: 'content optimization',
      yourPosition: 15,
      competitorPosition: 5,
      searchVolume: 6200,
      difficulty: 38,
      opportunity: 'medium'
    },
    {
      keyword: 'technical seo audit',
      yourPosition: null,
      competitorPosition: 8,
      searchVolume: 4800,
      difficulty: 52,
      opportunity: 'high'
    },
    {
      keyword: 'backlink checker',
      yourPosition: 12,
      competitorPosition: 2,
      searchVolume: 12000,
      difficulty: 65,
      opportunity: 'low'
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('competitor-analysis')}</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {language === 'en'
              ? 'Analyze competitor strategies and discover keyword opportunities'
              : 'Rakip stratejilerini analiz edin ve anahtar kelime fırsatlarını keşfedin'}
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          {language === 'en' ? 'Add Competitor' : 'Rakip Ekle'}
        </button>
      </div>

      {/* Competitor Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {competitors.map((competitor) => (
          <div key={competitor.domain} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {competitor.domain}
              </h3>
              <span className={`text-sm font-medium ${
                competitor.change.startsWith('+') 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {competitor.change}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Organic Keywords' : 'Organik Anahtar Kelimeler'}</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {competitor.organicKeywords.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Organic Traffic' : 'Organik Trafik'}</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {competitor.organicTraffic.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Authority Score' : 'Otorite Puanı'}</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {competitor.authorityScore}
                </span>
              </div>
            </div>
            
            <button 
              onClick={() => setSelectedCompetitor(competitor.domain)}
              className="w-full mt-4 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {language === 'en' ? 'Analyze' : 'Analiz Et'}
            </button>
          </div>
        ))}
      </div>

      {/* Traffic Comparison Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">{language === 'en' ? 'Traffic Comparison' : 'Trafik Karşılaştırması'}</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trafficComparison}>
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
                dataKey="yourSite" 
                stroke="#3B82F6" 
                strokeWidth={3}
                name={language === 'en' ? 'Your Site' : 'Siteniz'}
              />
              <Line 
                type="monotone" 
                dataKey="competitor1" 
                stroke="#EF4444" 
                strokeWidth={3}
                name={language === 'en' ? 'Competitor 1' : 'Rakip 1'}
              />
              <Line 
                type="monotone" 
                dataKey="competitor2" 
                stroke="#10B981" 
                strokeWidth={3}
                name={language === 'en' ? 'Competitor 2' : 'Rakip 2'}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Keyword Gaps */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{language === 'en' ? 'Keyword Gap Analysis' : 'Anahtar Kelime Boşluk Analizi'}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {language === 'en'
              ? 'Keywords your competitors rank for but you don\'t'
              : 'Rakiplerinizin sıralandığı ancak sizin sıralanmadığınız anahtar kelimeler'}
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {language === 'en' ? 'Keyword' : 'Anahtar Kelime'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {language === 'en' ? 'Your Position' : 'Sizin Pozisyonunuz'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {language === 'en' ? 'Competitor Position' : 'Rakip Pozisyonu'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {language === 'en' ? 'Search Volume' : 'Arama Hacmi'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {language === 'en' ? 'Difficulty' : 'Zorluk'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {language === 'en' ? 'Opportunity' : 'Fırsat'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {language === 'en' ? 'Actions' : 'İşlemler'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {keywordGaps.map((gap, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {gap.keyword}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {gap.yourPosition ? `#${gap.yourPosition}` : (language === 'en' ? 'Not ranking' : 'Sıralanmıyor')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    #{gap.competitorPosition}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {gap.searchVolume.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {gap.difficulty}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getOpportunityColor(gap.opportunity)}`}>
                      {gap.opportunity === 'high' ? (language === 'en' ? 'high' : 'yüksek') : 
                       gap.opportunity === 'medium' ? (language === 'en' ? 'medium' : 'orta') : 
                       (language === 'en' ? 'low' : 'düşük')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mr-3">
                      {language === 'en' ? 'Target' : 'Hedefle'}
                    </button>
                    <button className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Content Gap Analysis */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{language === 'en' ? 'Content Gap Opportunities' : 'İçerik Boşluğu Fırsatları'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">{language === 'en' ? 'Blog Content' : 'Blog İçeriği'}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {language === 'en'
                ? 'Competitors have 23% more blog posts on technical SEO topics'
                : 'Rakipler teknik SEO konularında %23 daha fazla blog yazısına sahip'}
            </p>
            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
              {language === 'en' ? 'View Opportunities' : 'Fırsatları Görüntüle'}
            </button>
          </div>
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">{language === 'en' ? 'Resource Pages' : 'Kaynak Sayfaları'}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {language === 'en'
                ? 'Missing comprehensive guides and checklists'
                : 'Kapsamlı rehberler ve kontrol listeleri eksik'}
            </p>
            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
              {language === 'en' ? 'View Opportunities' : 'Fırsatları Görüntüle'}
            </button>
          </div>
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">{language === 'en' ? 'Video Content' : 'Video İçeriği'}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {language === 'en'
                ? 'Competitors have 40% more video tutorials'
                : 'Rakipler %40 daha fazla video eğitimine sahip'}
            </p>
            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
              {language === 'en' ? 'View Opportunities' : 'Fırsatları Görüntüle'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitorAnalysisPage;