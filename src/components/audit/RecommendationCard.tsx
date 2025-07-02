import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, AlertTriangle, Clock, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface RecommendationCardProps {
  id: string;
  title: string;
  description: string;
  priority: 'critical' | 'important' | 'minor';
  impact: 'high' | 'medium' | 'low';
  effort: 'low' | 'medium' | 'high';
  category: string;
  affectedPages: string[];
  howToFix: string[];
  estimatedTime: string;
  resources: { title: string; url: string }[];
  metrics?: string;
  completed?: boolean;
  onToggleComplete?: (id: string) => void;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  id,
  title,
  description,
  priority,
  impact,
  effort,
  category,
  affectedPages,
  howToFix,
  estimatedTime,
  resources,
  metrics,
  completed = false,
  onToggleComplete
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t, language } = useLanguage();

  const getPriorityIcon = () => {
    switch (priority) {
      case 'critical':
        return '🔴';
      case 'important':
        return '🟡';
      case 'minor':
        return '🟢';
    }
  };

  const getPriorityColor = () => {
    switch (priority) {
      case 'critical':
        return 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20';
      case 'important':
        return 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20';
      case 'minor':
        return 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20';
    }
  };

  const getImpactColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300';
    }
  };

  const getCategoryIcon = () => {
    switch (category.toLowerCase()) {
      case 'technical seo':
        return '⚙️';
      case 'on-page seo':
        return '📄';
      case 'mobile seo':
        return '📱';
      case 'accessibility':
        return '♿';
      case 'content':
        return '✍️';
      default:
        return '📊';
    }
  };

  return (
    <div className={`border-2 rounded-lg transition-all duration-200 ${getPriorityColor()} ${completed ? 'opacity-60' : ''}`}>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start space-x-3 flex-1">
            <span className="text-lg">{getPriorityIcon()}</span>
            <div className="flex-1">
              <h3 className={`font-semibold text-gray-900 dark:text-white ${completed ? 'line-through' : ''}`}>
                {title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
              {metrics && (
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1 font-medium">{metrics}</p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2 ml-4">
            {onToggleComplete && (
              <button
                onClick={() => onToggleComplete(id)}
                className={`p-1 rounded transition-colors ${
                  completed 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-gray-400 hover:text-green-600 dark:hover:text-green-400'
                }`}
              >
                <CheckCircle className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
            {getCategoryIcon()} {category}
          </span>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(impact)}`}>
            {language === 'en' ? 'Impact' : 'Etki'}: {impact}
          </span>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(effort)}`}>
            {language === 'en' ? 'Effort' : 'Çaba'}: {effort}
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
            <Clock className="w-3 h-3 mr-1" />
            {estimatedTime}
          </span>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-4">
            {/* How to Fix */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2 text-orange-500" />
                {language === 'en' ? 'How to Fix' : 'Nasıl Düzeltilir'}
              </h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                {howToFix.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>

            {/* Affected Pages */}
            {affectedPages.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  {language === 'en' ? 'Affected Pages' : 'Etkilenen Sayfalar'} ({affectedPages.length})
                </h4>
                <div className="max-h-32 overflow-y-auto">
                  <ul className="space-y-1 text-sm">
                    {affectedPages.slice(0, 5).map((page, index) => (
                      <li key={index} className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                        {page}
                      </li>
                    ))}
                    {affectedPages.length > 5 && (
                      <li className="text-gray-500 dark:text-gray-400 text-xs">
                        +{affectedPages.length - 5} {language === 'en' ? 'more pages' : 'daha fazla sayfa'}
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            )}

            {/* Resources */}
            {resources.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  {language === 'en' ? 'Helpful Resources' : 'Yardımcı Kaynaklar'}
                </h4>
                <ul className="space-y-1">
                  {resources.map((resource, index) => (
                    <li key={index}>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        {resource.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationCard;