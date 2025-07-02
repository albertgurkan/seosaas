import React, { useState } from 'react';
import { Calendar, Plus, Filter, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { mockContentCalendar } from '../../data/mockData';
import { useLanguage } from '../../contexts/LanguageContext';

const ContentCalendar: React.FC = () => {
  const { t, language } = useLanguage();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [showAddContent, setShowAddContent] = useState(false);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getWeekDays = (date: Date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (view === 'month') {
        newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      } else if (view === 'week') {
        newDate.setDate(prev.getDate() + (direction === 'next' ? 7 : -7));
      } else {
        newDate.setDate(prev.getDate() + (direction === 'next' ? 1 : -1));
      }
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getDateLabel = () => {
    if (view === 'month') {
      return currentDate.toLocaleDateString(language === 'en' ? 'en-US' : 'tr-TR', { month: 'long', year: 'numeric' });
    } else if (view === 'week') {
      const weekDays = getWeekDays(currentDate);
      const start = weekDays[0].toLocaleDateString(language === 'en' ? 'en-US' : 'tr-TR', { month: 'short', day: 'numeric' });
      const end = weekDays[6].toLocaleDateString(language === 'en' ? 'en-US' : 'tr-TR', { month: 'short', day: 'numeric' });
      return `${start} - ${end}, ${currentDate.getFullYear()}`;
    } else {
      return currentDate.toLocaleDateString(language === 'en' ? 'en-US' : 'tr-TR', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    }
  };

  const getContentForDate = (date: Date | null) => {
    if (!date) return [];
    const dateStr = date.toISOString().split('T')[0];
    return mockContentCalendar.filter(content => content.publishDate === dateStr);
  };

  const statusColors = {
    scheduled: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    draft: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    published: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    archived: 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300',
    planlandı: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    taslak: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    yayınlandı: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    arşivlendi: 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300'
  };

  const getLocalizedStatus = (status: string) => {
    if (language === 'en') return status;
    
    const statusMap: Record<string, string> = {
      'scheduled': 'planlandı',
      'draft': 'taslak',
      'published': 'yayınlandı',
      'archived': 'arşivlendi'
    };
    
    return statusMap[status] || status;
  };

  const getLocalizedType = (type: string) => {
    if (language === 'en') return type.replace('-', ' ');
    
    const typeMap: Record<string, string> = {
      'blog-post': 'blog yazısı',
      'social-media': 'sosyal medya'
    };
    
    return typeMap[type] || type;
  };

  const getLocalizedPlatform = (platform: string) => {
    if (language === 'en') return platform;
    
    const platformMap: Record<string, string> = {
      'website': 'web sitesi',
      'linkedin': 'linkedin'
    };
    
    return platformMap[platform] || platform;
  };

  const renderMonthView = () => {
    const days = getDaysInMonth(currentDate);
    
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-px mb-4">
          {(language === 'en' ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] : ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt']).map((day) => (
            <div key={day} className="p-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-px">
          {days.map((day, index) => {
            const content = getContentForDate(day);
            const isToday = day && day.toDateString() === new Date().toDateString();
            
            return (
              <div
                key={index}
                className={`min-h-[120px] p-2 border border-gray-100 dark:border-gray-700 ${
                  day ? 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700' : 'bg-gray-50 dark:bg-gray-900'
                } transition-colors`}
              >
                {day && (
                  <>
                    <div className={`text-sm font-medium mb-2 ${
                      isToday 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {day.getDate()}
                      {isToday && (
                        <span className="ml-1 w-2 h-2 bg-blue-500 rounded-full inline-block"></span>
                      )}
                    </div>
                    <div className="space-y-1">
                      {content.map((item) => (
                        <div
                          key={item.id}
                          className="text-xs p-1 rounded bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 truncate"
                          title={item.title}
                        >
                          {item.title}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const weekDays = getWeekDays(currentDate);
    const hours = Array.from({ length: 24 }, (_, i) => i);
    
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="grid grid-cols-8 border-b border-gray-200 dark:border-gray-700">
          <div className="p-4 text-sm font-medium text-gray-500 dark:text-gray-400">{language === 'en' ? 'Time' : 'Saat'}</div>
          {weekDays.map((day) => {
            const isToday = day.toDateString() === new Date().toDateString();
            return (
              <div key={day.toISOString()} className={`p-4 text-center border-l border-gray-200 dark:border-gray-700 ${
                isToday ? 'bg-blue-50 dark:bg-blue-900/20' : ''
              }`}>
                <div className={`text-sm font-medium ${isToday ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
                  {day.toLocaleDateString(language === 'en' ? 'en-US' : 'tr-TR', { weekday: 'short' })}
                </div>
                <div className={`text-lg font-bold ${isToday ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
                  {day.getDate()}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {hours.map((hour) => (
            <div key={hour} className="grid grid-cols-8 border-b border-gray-100 dark:border-gray-700">
              <div className="p-2 text-xs text-gray-500 dark:text-gray-400 border-r border-gray-200 dark:border-gray-700">
                {hour.toString().padStart(2, '0')}:00
              </div>
              {weekDays.map((day) => {
                const content = getContentForDate(day);
                return (
                  <div key={`${day.toISOString()}-${hour}`} className="p-2 border-l border-gray-100 dark:border-gray-700 min-h-[40px]">
                    {hour === 9 && content.map((item) => (
                      <div key={item.id} className="text-xs p-1 rounded bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 truncate">
                        {item.title}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const content = getContentForDate(currentDate);
    
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {currentDate.toLocaleDateString(language === 'en' ? 'en-US' : 'tr-TR', { weekday: 'long', month: 'long', day: 'numeric' })}
          </h3>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {hours.map((hour) => (
            <div key={hour} className="flex border-b border-gray-100 dark:border-gray-700">
              <div className="w-20 p-4 text-sm text-gray-500 dark:text-gray-400 border-r border-gray-200 dark:border-gray-700">
                {hour.toString().padStart(2, '0')}:00
              </div>
              <div className="flex-1 p-4 min-h-[60px]">
                {hour === 9 && content.map((item) => (
                  <div key={item.id} className="p-2 rounded bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 mb-2">
                    <div className="font-medium">{item.title}</div>
                    <div className="text-xs opacity-75">{getLocalizedType(item.type)} • {getLocalizedPlatform(item.platform)}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('content-calendar')}</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {language === 'en'
              ? 'Plan and schedule your content with AI-powered timing recommendations'
              : 'Yapay zeka destekli zamanlama önerileriyle içeriğinizi planlayın ve programlayın'}
          </p>
        </div>
        <button
          onClick={() => setShowAddContent(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          {language === 'en' ? 'Add Content' : 'İçerik Ekle'}
        </button>
      </div>

      {/* Calendar Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateDate('prev')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white min-w-[250px] text-center">
            {getDateLabel()}
          </h2>
          <button
            onClick={() => navigateDate('next')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={goToToday}
            className="px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded-lg transition-colors"
          >
            {t('go-to-today')}
          </button>
          
          {['month', 'week', 'day'].map((viewType) => (
            <button
              key={viewType}
              onClick={() => setView(viewType as any)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                view === viewType
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {t(`${viewType}-view`)}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar Views */}
      {view === 'month' && renderMonthView()}
      {view === 'week' && renderWeekView()}
      {view === 'day' && renderDayView()}

      {/* Content List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{language === 'en' ? 'Upcoming Content' : 'Yaklaşan İçerik'}</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {mockContentCalendar.map((content) => {
              const localizedStatus = getLocalizedStatus(content.status);
              const localizedType = getLocalizedType(content.type);
              const localizedPlatform = getLocalizedPlatform(content.platform);
              
              return (
                <div key={content.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {language === 'en' ? content.title : (
                          content.title === 'How to Improve Your SEO in 2024' ? '2024\'te SEO\'nuzu Nasıl İyileştirirsiniz' :
                          content.title === 'Social Media Post - SEO Tips' ? 'Sosyal Medya Gönderisi - SEO İpuçları' :
                          content.title
                        )}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[localizedStatus]}`}>
                        {localizedStatus}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>{language === 'en' ? 'Type:' : 'Tür:'} {localizedType}</span>
                      <span>{language === 'en' ? 'Platform:' : 'Platform:'} {localizedPlatform}</span>
                      <span>{language === 'en' ? 'Author:' : 'Yazar:'} {content.author === 'Content Team' ? (language === 'en' ? 'Content Team' : 'İçerik Ekibi') : 
                                                                         content.author === 'Marketing Team' ? (language === 'en' ? 'Marketing Team' : 'Pazarlama Ekibi') : 
                                                                         content.author}</span>
                      <span>{language === 'en' ? 'Date:' : 'Tarih:'} {new Date(content.publishDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      {content.keywords.map((keyword, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded">
                      {language === 'en' ? 'Edit' : 'Düzenle'}
                    </button>
                    <button className="px-3 py-1 text-sm text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/50 rounded">
                      {language === 'en' ? 'Publish' : 'Yayınla'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCalendar;