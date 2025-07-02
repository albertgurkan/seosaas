import React, { useState } from 'react';
import { Users, MousePointer, Eye, Clock, TrendingUp, TrendingDown, Smartphone, Monitor, Globe, BarChart3, PieChart, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';
import { useLanguage } from '../../contexts/LanguageContext';
import { useNavigate, useLocation } from 'react-router-dom';

const UserBehaviorInsights: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const navigate = useNavigate();
  const location = useLocation();

  // Set active tab based on URL query parameter
  React.useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');
    if (tab && ['overview', 'click-bounce', 'user-journey', 'engagement', 'device-analysis'].includes(tab)) {
      setSelectedTab(tab);
    }
  }, [location]);

  // Update URL when tab changes
  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    navigate(`/user-behavior-insights?tab=${tab}`, { replace: true });
  };

  const tabs = [
    { id: 'overview', label: t('overview'), icon: BarChart3 },
    { id: 'click-bounce', label: t('click-bounce-analysis'), icon: MousePointer },
    { id: 'user-journey', label: t('user-journey-mapping'), icon: Users },
    { id: 'engagement', label: t('engagement-metrics'), icon: Activity },
    { id: 'device-analysis', label: t('device-breakdown'), icon: Smartphone }
  ];

  const timeframes = [
    { id: '24h', label: language === 'en' ? '24 Hours' : '24 Saat' },
    { id: '7d', label: language === 'en' ? '7 Days' : '7 Gün' },
    { id: '30d', label: language === 'en' ? '30 Days' : '30 Gün' },
    { id: '90d', label: language === 'en' ? '90 Days' : '90 Gün' }
  ];

  const overviewStats = {
    totalSessions: 15420,
    uniqueVisitors: 8930,
    avgSessionDuration: '3:42',
    bounceRate: 42.3,
    pageViews: 45680,
    conversionRate: 2.8
  };

  const trafficSources = [
    { name: t('organic-traffic'), value: 45, color: '#10B981' },
    { name: t('direct-traffic'), value: 25, color: '#3B82F6' },
    { name: t('social-media-traffic'), value: 15, color: '#8B5CF6' },
    { name: t('paid-traffic'), value: 10, color: '#F59E0B' },
    { name: t('referral-analysis'), value: 5, color: '#EF4444' }
  ];

  const deviceBreakdown = [
    { device: language === 'en' ? 'Desktop' : 'Masaüstü', sessions: 8420, percentage: 54.6, avgDuration: '4:15', bounceRate: 38.2 },
    { device: language === 'en' ? 'Mobile' : 'Mobil', sessions: 5890, percentage: 38.2, avgDuration: '2:45', bounceRate: 48.7 },
    { device: language === 'en' ? 'Tablet' : 'Tablet', sessions: 1110, percentage: 7.2, avgDuration: '3:20', bounceRate: 41.5 }
  ];

  const clickBounceData = [
    {
      page: '/blog/seo-guide',
      ctr: 8.5,
      bounceRate: 65.2,
      avgTimeOnPage: '1:23',
      issue: t('title-content-mismatch'),
      severity: 'high',
      recommendation: language === 'en' ? 'Align title with actual content depth' : 'Başlığı gerçek içerik derinliğiyle hizalayın'
    },
    {
      page: '/services/seo-audit',
      ctr: 12.3,
      bounceRate: 72.1,
      avgTimeOnPage: '0:45',
      issue: t('title-content-mismatch'),
      severity: 'critical',
      recommendation: language === 'en' ? 'Add more detailed service information' : 'Daha detaylı hizmet bilgisi ekleyin'
    },
    {
      page: '/pricing',
      ctr: 6.8,
      bounceRate: 45.3,
      avgTimeOnPage: '2:15',
      issue: language === 'en' ? 'Low engagement' : 'Düşük etkileşim',
      severity: 'medium',
      recommendation: language === 'en' ? 'Improve pricing presentation' : 'Fiyatlandırma sunumunu iyileştirin'
    }
  ];

  const userJourneyData = [
    { step: language === 'en' ? 'Landing' : 'İniş', users: 10000, dropoff: 0 },
    { step: language === 'en' ? 'Browse' : 'Göz Atma', users: 7500, dropoff: 25 },
    { step: language === 'en' ? 'Engage' : 'Etkileşim', users: 5200, dropoff: 30.7 },
    { step: language === 'en' ? 'Convert' : 'Dönüşüm', users: 2800, dropoff: 46.2 },
    { step: language === 'en' ? 'Complete' : 'Tamamlama', users: 2100, dropoff: 25 }
  ];

  const engagementMetrics = [
    { date: '2024-01-01', scrollDepth: 65, timeOnPage: 180, interactions: 3.2 },
    { date: '2024-01-02', scrollDepth: 68, timeOnPage: 195, interactions: 3.5 },
    { date: '2024-01-03', scrollDepth: 62, timeOnPage: 165, interactions: 2.8 },
    { date: '2024-01-04', scrollDepth: 71, timeOnPage: 210, interactions: 3.8 },
    { date: '2024-01-05', scrollDepth: 69, timeOnPage: 188, interactions: 3.4 },
    { date: '2024-01-06', scrollDepth: 73, timeOnPage: 225, interactions: 4.1 },
    { date: '2024-01-07', scrollDepth: 67, timeOnPage: 175, interactions: 3.1 }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('unique-visitors')}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{overviewStats.uniqueVisitors.toLocaleString()}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('page-views')}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{overviewStats.pageViews.toLocaleString()}</p>
            </div>
            <Eye className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('time-on-page')}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{overviewStats.avgSessionDuration}</p>
            </div>
            <Clock className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('exit-rate')}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{overviewStats.bounceRate}%</p>
            </div>
            <TrendingDown className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('conversion-funnel')}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{overviewStats.conversionRate}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{language === 'en' ? 'Total Sessions' : 'Toplam Oturumlar'}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{overviewStats.totalSessions.toLocaleString()}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Traffic Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('traffic-sources')}</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={trafficSources}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {trafficSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-1 gap-2 mt-4">
            {trafficSources.map((source, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: source.color }}
                  ></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{source.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{source.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('device-breakdown')}</h3>
          <div className="space-y-4">
            {deviceBreakdown.map((device, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    {device.device === 'Desktop' || device.device === 'Masaüstü' ? <Monitor className="w-5 h-5 mr-2 text-blue-500" /> :
                     device.device === 'Mobile' || device.device === 'Mobil' ? <Smartphone className="w-5 h-5 mr-2 text-green-500" /> :
                     <Globe className="w-5 h-5 mr-2 text-purple-500" />}
                    <span className="font-medium text-gray-900 dark:text-white">{device.device}</span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{device.percentage}%</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Sessions:' : 'Oturumlar:'}</span>
                    <div className="font-medium text-gray-900 dark:text-white">{device.sessions.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Duration:' : 'Süre:'}</span>
                    <div className="font-medium text-gray-900 dark:text-white">{device.avgDuration}</div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Bounce:' : 'Çıkış:'}</span>
                    <div className="font-medium text-gray-900 dark:text-white">{device.bounceRate}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderClickBounceAnalysis = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t('ctr-vs-ux-conflict')}</h3>
        <p className="text-gray-600 dark:text-gray-400">
          {language === 'en'
            ? 'Identify pages with high click-through rates but poor user experience leading to immediate exits.'
            : 'Yüksek tıklama oranlarına sahip ancak kötü kullanıcı deneyimi nedeniyle hemen çıkışlara yol açan sayfaları belirleyin.'}
        </p>
      </div>

      {/* Click-Bounce Analysis Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{language === 'en' ? 'Pages with CTR-UX Conflicts' : 'CTR-UX Çakışmaları Olan Sayfalar'}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {language === 'en' ? 'Page' : 'Sayfa'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  CTR
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {language === 'en' ? 'Bounce Rate' : 'Çıkış Oranı'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {language === 'en' ? 'Avg Time' : 'Ort. Süre'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {language === 'en' ? 'Issue' : 'Sorun'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {language === 'en' ? 'Severity' : 'Şiddet'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {language === 'en' ? 'Actions' : 'İşlemler'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {clickBounceData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                    {item.page}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {item.ctr}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {item.bounceRate}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {item.avgTimeOnPage}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {item.issue}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(item.severity)}`}>
                      {item.severity === 'critical' ? (language === 'en' ? 'critical' : 'kritik') :
                       item.severity === 'high' ? (language === 'en' ? 'high' : 'yüksek') :
                       item.severity === 'medium' ? (language === 'en' ? 'medium' : 'orta') :
                       (language === 'en' ? 'low' : 'düşük')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mr-3">
                      {t('analyze')}
                    </button>
                    <button className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300">
                      {t('optimize')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{language === 'en' ? 'AI Optimization Recommendations' : 'Yapay Zeka Optimizasyon Önerileri'}</h3>
        <div className="space-y-4">
          {clickBounceData.map((item, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900 dark:text-white">{item.page}</h4>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(item.severity)}`}>
                  {item.severity === 'critical' ? (language === 'en' ? 'critical' : 'kritik') :
                   item.severity === 'high' ? (language === 'en' ? 'high' : 'yüksek') :
                   item.severity === 'medium' ? (language === 'en' ? 'medium' : 'orta') :
                   (language === 'en' ? 'low' : 'düşük')}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{item.recommendation}</p>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
                  {language === 'en' ? 'Apply Fix' : 'Düzeltmeyi Uygula'}
                </button>
                <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  {language === 'en' ? 'A/B Test' : 'A/B Testi'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderUserJourney = () => (
    <div className="space-y-6">
      {/* User Journey Funnel */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">{t('conversion-funnel')}</h3>
        <div className="space-y-4">
          {userJourneyData.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900 dark:text-white">{step.step}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {step.users.toLocaleString()} {language === 'en' ? 'users' : 'kullanıcı'}
                  </span>
                  {index > 0 && (
                    <span className="text-sm text-red-600 dark:text-red-400">
                      -{step.dropoff}% {language === 'en' ? 'dropoff' : 'düşüş'}
                    </span>
                  )}
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div 
                  className="bg-blue-500 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${(step.users / userJourneyData[0].users) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Journey Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">{language === 'en' ? 'Journey Insights' : 'Yolculuk İçgörüleri'}</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Biggest Drop-off:' : 'En Büyük Düşüş:'}</span>
              <span className="font-medium text-red-600 dark:text-red-400">{language === 'en' ? 'Engage → Convert' : 'Etkileşim → Dönüşüm'} (46.2%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Conversion Rate:' : 'Dönüşüm Oranı:'}</span>
              <span className="font-medium text-gray-900 dark:text-white">21%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Completion Rate:' : 'Tamamlama Oranı:'}</span>
              <span className="font-medium text-gray-900 dark:text-white">75%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Next Review:' : 'Sonraki İnceleme:'}</span>
              <span className="font-medium text-gray-900 dark:text-white">7 days</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">{language === 'en' ? 'Optimization Opportunities' : 'Optimizasyon Fırsatları'}</h4>
          <div className="space-y-3">
            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div className="font-medium text-red-800 dark:text-red-300">{language === 'en' ? 'Critical: Engage Step' : 'Kritik: Etkileşim Adımı'}</div>
              <div className="text-sm text-red-600 dark:text-red-400">{language === 'en' ? '46.2% users drop off before converting' : 'Kullanıcıların %46.2\'si dönüşüm yapmadan ayrılıyor'}</div>
            </div>
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="font-medium text-yellow-800 dark:text-yellow-300">{language === 'en' ? 'Improve: Browse Step' : 'İyileştir: Göz Atma Adımı'}</div>
              <div className="text-sm text-yellow-600 dark:text-yellow-400">{language === 'en' ? '25% early exit rate' : '%25 erken çıkış oranı'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEngagementMetrics = () => (
    <div className="space-y-6">
      {/* Engagement Trends */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">{t('engagement-metrics')} {language === 'en' ? 'Trends' : 'Trendleri'}</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={engagementMetrics}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="date" className="text-gray-600 dark:text-gray-400" />
              <YAxis className="text-gray-600 dark:text-gray-400" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--tooltip-bg)',
                  border: '1px solid var(--tooltip-border)',
                  borderRadius: '8px'
                }}
              />
              <Line type="monotone" dataKey="scrollDepth" stroke="#3B82F6" strokeWidth={3} name={language === 'en' ? 'Scroll Depth %' : 'Kaydırma Derinliği %'} />
              <Line type="monotone" dataKey="timeOnPage" stroke="#10B981" strokeWidth={3} name={language === 'en' ? 'Time on Page (s)' : 'Sayfada Geçirilen Süre (s)'} />
              <Line type="monotone" dataKey="interactions" stroke="#8B5CF6" strokeWidth={3} name={language === 'en' ? 'Interactions' : 'Etkileşimler'} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Engagement Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">{t('scroll-depth')}</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">0-25%:</span>
              <span className="font-medium text-gray-900 dark:text-white">15%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">25-50%:</span>
              <span className="font-medium text-gray-900 dark:text-white">25%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">50-75%:</span>
              <span className="font-medium text-gray-900 dark:text-white">35%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">75-100%:</span>
              <span className="font-medium text-gray-900 dark:text-white">25%</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">{language === 'en' ? 'Interaction Types' : 'Etkileşim Türleri'}</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Clicks:' : 'Tıklamalar:'}</span>
              <span className="font-medium text-gray-900 dark:text-white">45%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Scrolls:' : 'Kaydırmalar:'}</span>
              <span className="font-medium text-gray-900 dark:text-white">30%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Hovers:' : 'Üzerine Gelmeler:'}</span>
              <span className="font-medium text-gray-900 dark:text-white">20%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Form Fills:' : 'Form Doldurma:'}</span>
              <span className="font-medium text-gray-900 dark:text-white">5%</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">{language === 'en' ? 'Page Performance' : 'Sayfa Performansı'}</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'High Engagement:' : 'Yüksek Etkileşim:'}</span>
              <span className="font-medium text-green-600 dark:text-green-400">23 {language === 'en' ? 'pages' : 'sayfa'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Medium Engagement:' : 'Orta Etkileşim:'}</span>
              <span className="font-medium text-yellow-600 dark:text-yellow-400">45 {language === 'en' ? 'pages' : 'sayfa'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Low Engagement:' : 'Düşük Etkileşim:'}</span>
              <span className="font-medium text-red-600 dark:text-red-400">12 {language === 'en' ? 'pages' : 'sayfa'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Needs Attention:' : 'Dikkat Gerektiren:'}</span>
              <span className="font-medium text-gray-900 dark:text-white">8 {language === 'en' ? 'pages' : 'sayfa'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDeviceAnalysis = () => (
    <div className="space-y-6">
      {/* Device Performance Comparison */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">{language === 'en' ? 'Device Performance Comparison' : 'Cihaz Performans Karşılaştırması'}</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={deviceBreakdown}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="device" className="text-gray-600 dark:text-gray-400" />
              <YAxis className="text-gray-600 dark:text-gray-400" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--tooltip-bg)',
                  border: '1px solid var(--tooltip-border)',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="sessions" fill="#3B82F6" name={language === 'en' ? 'Sessions' : 'Oturumlar'} />
              <Bar dataKey="bounceRate" fill="#EF4444" name={language === 'en' ? 'Bounce Rate %' : 'Çıkış Oranı %'} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Device-Specific Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {deviceBreakdown.map((device, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center mb-4">
              {device.device === 'Desktop' || device.device === 'Masaüstü' ? <Monitor className="w-6 h-6 mr-2 text-blue-500" /> :
               device.device === 'Mobile' || device.device === 'Mobil' ? <Smartphone className="w-6 h-6 mr-2 text-green-500" /> :
               <Globe className="w-6 h-6 mr-2 text-purple-500" />}
              <h4 className="font-semibold text-gray-900 dark:text-white">{device.device}</h4>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Sessions:' : 'Oturumlar:'}</span>
                <span className="font-medium text-gray-900 dark:text-white">{device.sessions.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Share:' : 'Pay:'}</span>
                <span className="font-medium text-gray-900 dark:text-white">{device.percentage}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Avg Duration:' : 'Ort. Süre:'}</span>
                <span className="font-medium text-gray-900 dark:text-white">{device.avgDuration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Bounce Rate:' : 'Çıkış Oranı:'}</span>
                <span className={`font-medium ${device.bounceRate > 50 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                  {device.bounceRate}%
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                {language === 'en' ? `Optimize for ${device.device}` : `${device.device} için Optimize Et`}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('user-behavior-insights')}</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {language === 'en'
              ? 'Analyze user behavior patterns and optimize for better engagement and conversions'
              : 'Kullanıcı davranış kalıplarını analiz edin ve daha iyi etkileşim ve dönüşümler için optimize edin'}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <select 
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          >
            {timeframes.map(tf => (
              <option key={tf.id} value={tf.id}>{tf.label}</option>
            ))}
          </select>
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
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === tab.id
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
      {selectedTab === 'overview' && renderOverview()}
      {selectedTab === 'click-bounce' && renderClickBounceAnalysis()}
      {selectedTab === 'user-journey' && renderUserJourney()}
      {selectedTab === 'engagement' && renderEngagementMetrics()}
      {selectedTab === 'device-analysis' && renderDeviceAnalysis()}
    </div>
  );
};

export default UserBehaviorInsights;