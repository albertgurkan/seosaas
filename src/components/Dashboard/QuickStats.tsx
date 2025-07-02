import React from 'react';
import { TrendingUp, TrendingDown, Users, Target } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const QuickStats: React.FC = () => {
  const { language } = useLanguage();
  
  const stats = [
    {
      title: language === 'en' ? 'Organic Traffic' : 'Organik Trafik',
      value: '12,543',
      change: '+12.5%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-green-600 dark:text-green-400'
    },
    {
      title: language === 'en' ? 'Keywords Ranking' : 'Sıralanan Anahtar Kelimeler',
      value: '1,247',
      change: '+8.2%',
      trend: 'up',
      icon: Target,
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      title: language === 'en' ? 'Conversion Rate' : 'Dönüşüm Oranı',
      value: '3.24%',
      change: '-2.1%',
      trend: 'down',
      icon: TrendingDown,
      color: 'text-red-600 dark:text-red-400'
    },
    {
      title: language === 'en' ? 'Active Users' : 'Aktif Kullanıcılar',
      value: '8,920',
      change: '+15.3%',
      trend: 'up',
      icon: Users,
      color: 'text-purple-600 dark:text-purple-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  {stat.title}
                </p>
                <p className="text-3xl font-extrabold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                <p className={`text-sm font-medium mt-2 ${
                  stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {stat.change}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-md">
                <Icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuickStats;