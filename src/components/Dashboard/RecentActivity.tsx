import React from 'react';
import { Clock, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const RecentActivity: React.FC = () => {
  const { language } = useLanguage();
  
  const activities = [
    {
      id: 1,
      type: 'task_completed',
      title: language === 'en' ? 'SEO audit completed for homepage' : 'Ana sayfa için SEO denetimi tamamlandı',
      description: language === 'en' ? 'Found 12 optimization opportunities' : '12 optimizasyon fırsatı bulundu',
      timestamp: language === 'en' ? '2 hours ago' : '2 saat önce',
      status: 'completed',
      icon: CheckCircle,
      color: 'text-green-600 dark:text-green-400'
    },
    {
      id: 2,
      type: 'ranking_change',
      title: language === 'en' ? 'Keyword "seo tools" ranking improved' : '"seo araçları" anahtar kelimesi sıralaması iyileşti',
      description: language === 'en' ? 'Moved from position 15 to 8' : '15. pozisyondan 8. pozisyona yükseldi',
      timestamp: language === 'en' ? '4 hours ago' : '4 saat önce',
      status: 'success',
      icon: TrendingUp,
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      id: 3,
      type: 'alert',
      title: language === 'en' ? 'Content refresh needed' : 'İçerik yenilemesi gerekli',
      description: language === 'en' ? '5 pages need content updates' : '5 sayfa içerik güncellemesi gerektiriyor',
      timestamp: language === 'en' ? '6 hours ago' : '6 saat önce',
      status: 'warning',
      icon: AlertCircle,
      color: 'text-orange-600 dark:text-orange-400'
    },
    {
      id: 4,
      type: 'task_created',
      title: language === 'en' ? 'New task: Update meta descriptions' : 'Yeni görev: Meta açıklamaları güncelle',
      description: language === 'en' ? '15 pages require meta description updates' : '15 sayfa meta açıklama güncellemesi gerektiriyor',
      timestamp: language === 'en' ? '1 day ago' : '1 gün önce',
      status: 'pending',
      icon: Clock,
      color: 'text-gray-600 dark:text-gray-400'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
      <div className="p-8 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{language === 'en' ? 'Recent Activity' : 'Son Aktiviteler'}</h3>
      </div>
      <div className="p-8">
        <div className="space-y-6">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="flex items-start space-x-4 hover:bg-white dark:hover:bg-gray-800 p-4 rounded-xl transition-colors">
                <div className="p-3 rounded-xl bg-white dark:bg-gray-800 shadow-md">
                  <Icon className={`w-5 h-5 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-bold text-gray-900 dark:text-white">
                    {activity.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                    {activity.timestamp}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;