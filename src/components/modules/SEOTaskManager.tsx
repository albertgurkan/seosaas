import React, { useState } from 'react';
import { Plus, Filter, Calendar, User, Clock, AlertCircle } from 'lucide-react';
import { mockTaskData } from '../../data/mockData';
import { useLanguage } from '../../contexts/LanguageContext';

const SEOTaskManager: React.FC = () => {
  const { language } = useLanguage();
  const [tasks, setTasks] = useState(mockTaskData);
  const [filter, setFilter] = useState('all');
  const [showAddTask, setShowAddTask] = useState(false);

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    completed: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    overdue: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
    beklemede: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    'devam-ediyor': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    tamamlandı: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    'süresi-geçmiş': 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
  };

  const priorityColors = {
    high: 'border-l-red-500',
    medium: 'border-l-yellow-500',
    low: 'border-l-green-500',
    yüksek: 'border-l-red-500',
    orta: 'border-l-yellow-500',
    düşük: 'border-l-green-500'
  };

  const getLocalizedStatus = (status: string) => {
    if (language === 'en') return status;
    
    const statusMap: Record<string, string> = {
      'pending': 'beklemede',
      'in-progress': 'devam-ediyor',
      'completed': 'tamamlandı',
      'overdue': 'süresi-geçmiş'
    };
    
    return statusMap[status] || status;
  };

  const getLocalizedPriority = (priority: string) => {
    if (language === 'en') return priority;
    
    const priorityMap: Record<string, string> = {
      'high': 'yüksek',
      'medium': 'orta',
      'low': 'düşük'
    };
    
    return priorityMap[priority] || priority;
  };

  const getLocalizedCategory = (category: string) => {
    if (language === 'en') return category;
    
    const categoryMap: Record<string, string> = {
      'On-Page SEO': 'Sayfa İçi SEO',
      'Content Creation': 'İçerik Oluşturma',
      'Technical SEO': 'Teknik SEO'
    };
    
    return categoryMap[category] || category;
  };

  const getDisplayStatus = (status: string) => {
    if (language === 'en') {
      return status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ');
    } else {
      const statusMap: Record<string, string> = {
        'beklemede': 'Beklemede',
        'devam-ediyor': 'Devam Ediyor',
        'tamamlandı': 'Tamamlandı',
        'süresi-geçmiş': 'Süresi Geçmiş'
      };
      return statusMap[status] || status;
    }
  };

  const filteredTasks = filter === 'all' ? tasks : tasks.filter(task => getLocalizedStatus(task.status) === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {language === 'en' ? 'SEO Task Manager' : 'SEO Görev Yöneticisi'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {language === 'en'
              ? 'Manage and track your SEO tasks with AI-powered insights'
              : 'Yapay zeka destekli içgörülerle SEO görevlerinizi yönetin ve takip edin'}
          </p>
        </div>
        <button
          onClick={() => setShowAddTask(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          {language === 'en' ? 'Add Task' : 'Görev Ekle'}
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {['all', 'pending', 'in-progress', 'completed', 'overdue'].map((status) => {
          const localizedStatus = status === 'all' ? 'all' : getLocalizedStatus(status);
          const displayName = status === 'all' 
            ? (language === 'en' ? 'All' : 'Tümü') 
            : getDisplayStatus(localizedStatus);
            
          return (
            <button
              key={status}
              onClick={() => setFilter(localizedStatus)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === localizedStatus
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {displayName}
            </button>
          );
        })}
      </div>

      {/* Task Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(tasks.reduce((acc, task) => {
          const localizedStatus = getLocalizedStatus(task.status);
          acc[localizedStatus] = (acc[localizedStatus] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)).map(([status, count]) => (
          <div key={status} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                  {getDisplayStatus(status)}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{count}</p>
              </div>
              <div className={`w-3 h-3 rounded-full ${
                status === 'completed' || status === 'tamamlandı' ? 'bg-green-500' :
                status === 'in-progress' || status === 'devam-ediyor' ? 'bg-blue-500' :
                status === 'overdue' || status === 'süresi-geçmiş' ? 'bg-red-500' : 'bg-yellow-500'
              }`}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => {
          const localizedStatus = getLocalizedStatus(task.status);
          const localizedPriority = getLocalizedPriority(task.priority);
          const localizedCategory = getLocalizedCategory(task.category);
          
          return (
            <div
              key={task.id}
              className={`bg-white dark:bg-gray-800 rounded-lg border-l-4 ${priorityColors[localizedPriority]} border-r border-t border-b border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {language === 'en' ? task.title : (
                        task.title === 'Optimize homepage meta description' ? 'Ana sayfa meta açıklamasını optimize et' :
                        task.title === 'Create blog content for Q1' ? 'Ç1 için blog içeriği oluştur' :
                        task.title === 'Fix broken internal links' ? 'Kırık iç bağlantıları düzelt' :
                        task.title
                      )}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[localizedStatus]}`}>
                      {getDisplayStatus(localizedStatus)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      localizedPriority === 'high' || localizedPriority === 'yüksek' ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' :
                      localizedPriority === 'medium' || localizedPriority === 'orta' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' :
                      'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                    }`}>
                      {localizedPriority} {language === 'en' ? 'priority' : 'öncelik'}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {language === 'en' ? task.description : (
                      task.description === 'Update meta description to improve CTR' ? 'CTR\'yi iyileştirmek için meta açıklamasını güncelle' :
                      task.description === 'Develop 12 blog posts focusing on target keywords' ? 'Hedef anahtar kelimelere odaklanan 12 blog yazısı geliştir' :
                      task.description === 'Audit and fix 23 broken internal links' ? '23 kırık iç bağlantıyı denetle ve düzelt' :
                      task.description
                    )}
                  </p>
                  <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {task.assignee}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {language === 'en' ? 'Due:' : 'Bitiş:'} {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {task.estimatedTime}h {language === 'en' ? 'estimated' : 'tahmini'}
                    </div>
                    <div className="flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {localizedCategory}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded">
                    {language === 'en' ? 'Edit' : 'Düzenle'}
                  </button>
                  <button className="px-3 py-1 text-sm text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/50 rounded">
                    {language === 'en' ? 'Complete' : 'Tamamla'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SEOTaskManager;