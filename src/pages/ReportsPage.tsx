import React, { useState } from 'react';
import { FileBarChart, Download, Calendar, Filter, Eye, Share2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ReportsPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedReport, setSelectedReport] = useState('overview');

  const reportTypes = [
    { id: 'overview', name: language === 'en' ? 'SEO Overview' : 'SEO Genel Bakış', description: language === 'en' ? 'Complete SEO performance summary' : 'Eksiksiz SEO performans özeti' },
    { id: 'keywords', name: language === 'en' ? 'Keyword Report' : 'Anahtar Kelime Raporu', description: language === 'en' ? 'Keyword rankings and opportunities' : 'Anahtar kelime sıralamaları ve fırsatlar' },
    { id: 'technical', name: language === 'en' ? 'Technical SEO' : 'Teknik SEO', description: language === 'en' ? 'Site health and technical issues' : 'Site sağlığı ve teknik sorunlar' },
    { id: 'content', name: language === 'en' ? 'Content Analysis' : 'İçerik Analizi', description: language === 'en' ? 'Content performance and optimization' : 'İçerik performansı ve optimizasyon' },
    { id: 'backlinks', name: language === 'en' ? 'Backlink Report' : 'Backlink Raporu', description: language === 'en' ? 'Link profile and quality analysis' : 'Bağlantı profili ve kalite analizi' },
    { id: 'competitor', name: language === 'en' ? 'Competitor Analysis' : 'Rakip Analizi', description: language === 'en' ? 'Competitive landscape insights' : 'Rekabet ortamı içgörüleri' }
  ];

  const savedReports = [
    {
      id: 1,
      name: language === 'en' ? 'Monthly SEO Report - January 2024' : 'Aylık SEO Raporu - Ocak 2024',
      type: 'overview',
      createdAt: '2024-01-31',
      status: language === 'en' ? 'completed' : 'tamamlandı',
      format: 'PDF',
      size: '2.4 MB'
    },
    {
      id: 2,
      name: language === 'en' ? 'Keyword Performance Q1' : 'Anahtar Kelime Performansı Ç1',
      type: 'keywords',
      createdAt: '2024-01-28',
      status: language === 'en' ? 'completed' : 'tamamlandı',
      format: 'Excel',
      size: '1.8 MB'
    },
    {
      id: 3,
      name: language === 'en' ? 'Technical Audit Report' : 'Teknik Denetim Raporu',
      type: 'technical',
      createdAt: '2024-01-25',
      status: language === 'en' ? 'processing' : 'işleniyor',
      format: 'PDF',
      size: '-'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'tamamlandı':
        return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
      case 'processing':
      case 'işleniyor':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
      case 'failed':
      case 'başarısız':
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('reports')}</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {language === 'en'
              ? 'Generate comprehensive SEO reports and track performance over time'
              : 'Kapsamlı SEO raporları oluşturun ve performansı zaman içinde takip edin'}
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <FileBarChart className="w-4 h-4 mr-2" />
          {language === 'en' ? 'Generate Report' : 'Rapor Oluştur'}
        </button>
      </div>

      {/* Report Builder */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">{language === 'en' ? 'Create New Report' : 'Yeni Rapor Oluştur'}</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Report Types */}
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-4">{language === 'en' ? 'Select Report Type' : 'Rapor Türü Seçin'}</h4>
            <div className="space-y-3">
              {reportTypes.map((type) => (
                <label key={type.id} className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="reportType"
                    value={type.id}
                    checked={selectedReport === type.id}
                    onChange={(e) => setSelectedReport(e.target.value)}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-white">{type.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{type.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Report Configuration */}
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-4">{language === 'en' ? 'Configuration' : 'Yapılandırma'}</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'en' ? 'Date Range' : 'Tarih Aralığı'}
                </label>
                <div className="flex space-x-2">
                  <input
                    type="date"
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                  <input
                    type="date"
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'en' ? 'Format' : 'Format'}
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                  <option value="pdf">PDF Report</option>
                  <option value="excel">Excel Spreadsheet</option>
                  <option value="csv">CSV Data</option>
                  <option value="powerpoint">PowerPoint Presentation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'en' ? 'Include Sections' : 'Bölümleri Dahil Et'}
                </label>
                <div className="space-y-2">
                  {[
                    language === 'en' ? 'Executive Summary' : 'Yönetici Özeti',
                    language === 'en' ? 'Key Metrics' : 'Temel Metrikler',
                    language === 'en' ? 'Detailed Analysis' : 'Detaylı Analiz',
                    language === 'en' ? 'Recommendations' : 'Öneriler',
                    language === 'en' ? 'Charts & Graphs' : 'Grafikler ve Şemalar'
                  ].map((section) => (
                    <label key={section} className="flex items-center">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{section}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  {language === 'en' ? 'Generate Report' : 'Rapor Oluştur'}
                </button>
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  {language === 'en' ? 'Save Template' : 'Şablonu Kaydet'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Saved Reports */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{language === 'en' ? 'Recent Reports' : 'Son Raporlar'}</h3>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <Filter className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <Calendar className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {savedReports.map((report) => (
            <div key={report.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                      {report.name}
                    </h4>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                    <span>{language === 'en' ? 'Type:' : 'Tür:'} {reportTypes.find(t => t.id === report.type)?.name}</span>
                    <span>{language === 'en' ? 'Created:' : 'Oluşturulma:'} {new Date(report.createdAt).toLocaleDateString()}</span>
                    <span>{language === 'en' ? 'Format:' : 'Format:'} {report.format}</span>
                    <span>{language === 'en' ? 'Size:' : 'Boyut:'} {report.size}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" title={language === 'en' ? 'Preview' : 'Önizleme'}>
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" title={language === 'en' ? 'Share' : 'Paylaş'}>
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button 
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" 
                    title={language === 'en' ? 'Download' : 'İndir'}
                    disabled={report.status !== 'completed' && report.status !== 'tamamlandı'}
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Templates */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{language === 'en' ? 'Report Templates' : 'Rapor Şablonları'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors cursor-pointer">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">{language === 'en' ? 'Executive Summary' : 'Yönetici Özeti'}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {language === 'en'
                ? 'High-level overview for stakeholders and executives'
                : 'Paydaşlar ve yöneticiler için üst düzey genel bakış'}
            </p>
            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
              {language === 'en' ? 'Use Template' : 'Şablonu Kullan'}
            </button>
          </div>
          
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors cursor-pointer">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">{language === 'en' ? 'Technical Audit' : 'Teknik Denetim'}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {language === 'en'
                ? 'Detailed technical SEO analysis and recommendations'
                : 'Detaylı teknik SEO analizi ve öneriler'}
            </p>
            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
              {language === 'en' ? 'Use Template' : 'Şablonu Kullan'}
            </button>
          </div>
          
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors cursor-pointer">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">{language === 'en' ? 'Monthly Progress' : 'Aylık İlerleme'}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {language === 'en'
                ? 'Regular progress tracking and performance metrics'
                : 'Düzenli ilerleme takibi ve performans metrikleri'}
            </p>
            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
              {language === 'en' ? 'Use Template' : 'Şablonu Kullan'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;