import React from 'react';
import { Search, CheckCircle, FileText, TrendingUp, Link, Users, BarChart3, Brain } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const OurServices: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const services = [
    {
      id: 'keyword-research',
      title: language === 'en' ? 'Keyword Research' : 'Anahtar Kelime Araştırması',
      description: language === 'en' 
        ? 'Discover high-value keywords that drive targeted traffic to your website'
        : 'Web sitenize hedefli trafik getiren yüksek değerli anahtar kelimeleri keşfedin',
      icon: Search,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      path: '/keywords'
    },
    {
      id: 'technical-seo',
      title: language === 'en' ? 'Technical SEO' : 'Teknik SEO',
      description: language === 'en'
        ? 'Optimize your website\'s technical aspects for better search engine visibility'
        : 'Daha iyi arama motoru görünürlüğü için web sitenizin teknik yönlerini optimize edin',
      icon: CheckCircle,
      color: 'bg-gradient-to-r from-green-500 to-green-600',
      path: '/site-audit'
    },
    {
      id: 'content-optimization',
      title: language === 'en' ? 'Content Optimization' : 'İçerik Optimizasyonu',
      description: language === 'en'
        ? 'Create and optimize content that ranks well and converts visitors'
        : 'İyi sıralanan ve ziyaretçileri dönüştüren içerik oluşturun ve optimize edin',
      icon: FileText,
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
      path: '/content-analysis'
    },
    {
      id: 'rank-tracking',
      title: language === 'en' ? 'Rank Tracking' : 'Sıralama Takibi',
      description: language === 'en'
        ? 'Monitor your keyword rankings and track progress over time'
        : 'Anahtar kelime sıralamalarınızı izleyin ve zaman içindeki ilerlemeyi takip edin',
      icon: TrendingUp,
      color: 'bg-gradient-to-r from-orange-500 to-orange-600',
      path: '/rank-tracking'
    },
    {
      id: 'link-building',
      title: language === 'en' ? 'Link Building' : 'Bağlantı Kurma',
      description: language === 'en'
        ? 'Build high-quality backlinks that boost your domain authority'
        : 'Alan adı otoritenizi artıran yüksek kaliteli geri bağlantılar oluşturun',
      icon: Link,
      color: 'bg-gradient-to-r from-red-500 to-red-600',
      path: '/backlink-analysis'
    },
    {
      id: 'competitor-analysis',
      title: language === 'en' ? 'Competitor Analysis' : 'Rakip Analizi',
      description: language === 'en'
        ? 'Analyze your competitors\' strategies and find opportunities to outrank them'
        : 'Rakiplerinizin stratejilerini analiz edin ve onları geçmek için fırsatlar bulun',
      icon: Users,
      color: 'bg-gradient-to-r from-indigo-500 to-indigo-600',
      path: '/competitor-analysis'
    },
    {
      id: 'seo-reporting',
      title: language === 'en' ? 'SEO Reporting' : 'SEO Raporlama',
      description: language === 'en'
        ? 'Get comprehensive reports with actionable insights and recommendations'
        : 'Uygulanabilir içgörüler ve önerilerle kapsamlı raporlar alın',
      icon: BarChart3,
      color: 'bg-gradient-to-r from-teal-500 to-teal-600',
      path: '/reports'
    },
    {
      id: 'semantic-seo',
      title: language === 'en' ? 'Semantic SEO' : 'Semantik SEO',
      description: language === 'en'
        ? 'Leverage AI and semantic analysis to optimize for search intent'
        : 'Arama amacı için optimize etmek üzere yapay zeka ve semantik analizi kullanın',
      icon: Brain,
      color: 'bg-gradient-to-r from-pink-500 to-pink-600',
      path: '/semantic-analysis'
    }
  ];

  return (
    <section id="our-services" className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-3xl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            {language === 'en' ? 'Our SEO Services' : 'SEO Hizmetlerimiz'}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-teal-400 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {language === 'en' 
              ? 'Comprehensive SEO solutions tailored to your business goals and target audience'
              : 'İşletme hedeflerinize ve hedef kitlenize göre özelleştirilmiş kapsamlı SEO çözümleri'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div 
              key={service.id}
              onClick={() => navigate(service.path)}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group cursor-pointer"
            >
              <div className={`h-2 ${service.color}`}></div>
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-lg ${service.color} text-white`}>
                    <service.icon className="w-6 h-6" />
                  </div>
                  <h3 className="ml-4 text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {service.description}
                </p>
                <div className="mt-6 text-blue-600 dark:text-blue-400 font-medium text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  {language === 'en' ? 'Learn more →' : 'Daha fazla bilgi →'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;