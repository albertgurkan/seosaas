import React, { useState } from 'react';
import { mockKeywordData } from '../../data/mockData';
import { TrendingUp, TrendingDown, Minus, Search, Target, Zap } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const KeywordDifficultyMatrix: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const [hoveredKeyword, setHoveredKeyword] = useState<string | null>(null);

  const getMatrixPosition = (difficulty: number, searchVolume: number) => {
    const maxVolume = Math.max(...mockKeywordData.map(k => k.searchVolume));
    const x = (difficulty / 100) * 90 + 5; // 5-95% range for better visibility
    const y = 95 - (searchVolume / maxVolume) * 90; // Inverted for chart display, 5-95% range
    return { x, y };
  };

  const getOpportunityScore = (difficulty: number, searchVolume: number, cpc: number) => {
    // Higher volume and CPC with lower difficulty = better opportunity
    const volumeScore = Math.min(searchVolume / 1000, 10) * 10; // Max 100 points for volume
    const cpcScore = Math.min(cpc * 10, 50); // Max 50 points for CPC
    const difficultyPenalty = difficulty; // Direct penalty for difficulty
    return Math.max(0, Math.round(volumeScore + cpcScore - difficultyPenalty));
  };

  const getBubbleSize = (searchVolume: number) => {
    const maxVolume = Math.max(...mockKeywordData.map(k => k.searchVolume));
    const minSize = 20;
    const maxSize = 60;
    return minSize + (searchVolume / maxVolume) * (maxSize - minSize);
  };

  const getBubbleColor = (difficulty: number, opportunityScore: number) => {
    if (opportunityScore >= 80) return 'bg-green-500 border-green-600';
    if (opportunityScore >= 60) return 'bg-yellow-500 border-yellow-600';
    if (difficulty <= 30) return 'bg-blue-500 border-blue-600';
    if (difficulty >= 70) return 'bg-red-500 border-red-600';
    return 'bg-purple-500 border-purple-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('keyword-difficulty-matrix')}</h1>
          <p className="text-gray-600 dark:text-gray-400">{t('difficulty-vs-opportunity')}</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Search className="w-4 h-4 mr-2" />
          {language === 'en' ? 'Research Keywords' : 'Anahtar Kelime Araştır'}
        </button>
      </div>

      {/* Legend */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">{language === 'en' ? 'Legend' : 'Gösterge'}</h3>
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
            <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'High Opportunity (80+)' : 'Yüksek Fırsat (80+)'}</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
            <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Good Opportunity (60-79)' : 'İyi Fırsat (60-79)'}</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Low Difficulty (<30)' : 'Düşük Zorluk (<30)'}</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
            <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'High Difficulty (>70)' : 'Yüksek Zorluk (>70)'}</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-purple-500 rounded-full mr-2"></div>
            <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Medium Difficulty' : 'Orta Zorluk'}</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
          {language === 'en'
            ? 'Bubble size represents search volume. Click on keywords for detailed analysis.'
            : 'Baloncuk boyutu arama hacmini temsil eder. Detaylı analiz için anahtar kelimelere tıklayın.'}
        </p>
      </div>

      {/* Matrix Visualization */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t('difficulty-vs-opportunity')}</h3>
        </div>

        <div className="relative">
          {/* Matrix Chart */}
          <div className="relative w-full h-96 bg-gradient-to-tr from-green-50 via-yellow-50 to-red-50 dark:from-green-900/20 dark:via-yellow-900/20 dark:to-red-900/20 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Axis Labels */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-600 dark:text-gray-400">
              {t('keyword-difficulty')} →
            </div>
            <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 -rotate-90 text-sm font-medium text-gray-600 dark:text-gray-400">
              ← {t('search-volume')}
            </div>

            {/* Grid Lines */}
            <div className="absolute inset-0">
              {[25, 50, 75].map(percent => (
                <React.Fragment key={percent}>
                  <div 
                    className="absolute border-l border-gray-300 dark:border-gray-600 opacity-30"
                    style={{ left: `${percent}%`, height: '100%' }}
                  />
                  <div 
                    className="absolute border-t border-gray-300 dark:border-gray-600 opacity-30"
                    style={{ top: `${percent}%`, width: '100%' }}
                  />
                </React.Fragment>
              ))}
            </div>

            {/* Quadrant Labels */}
            <div className="absolute top-4 left-4 text-xs font-medium text-green-600 dark:text-green-400 bg-white dark:bg-gray-800 px-2 py-1 rounded shadow">
              <Target className="w-3 h-3 inline mr-1" />
              {language === 'en' ? 'High Volume, Low Difficulty' : 'Yüksek Hacim, Düşük Zorluk'}
            </div>
            <div className="absolute top-4 right-4 text-xs font-medium text-red-600 dark:text-red-400 bg-white dark:bg-gray-800 px-2 py-1 rounded shadow">
              {language === 'en' ? 'High Volume, High Difficulty' : 'Yüksek Hacim, Yüksek Zorluk'}
            </div>
            <div className="absolute bottom-4 left-4 text-xs font-medium text-yellow-600 dark:text-yellow-400 bg-white dark:bg-gray-800 px-2 py-1 rounded shadow">
              {language === 'en' ? 'Low Volume, Low Difficulty' : 'Düşük Hacim, Düşük Zorluk'}
            </div>
            <div className="absolute bottom-4 right-4 text-xs font-medium text-orange-600 dark:text-orange-400 bg-white dark:bg-gray-800 px-2 py-1 rounded shadow">
              {language === 'en' ? 'Low Volume, High Difficulty' : 'Düşük Hacim, Yüksek Zorluk'}
            </div>

            {/* Keywords as bubbles */}
            {mockKeywordData.map((keyword) => {
              const position = getMatrixPosition(keyword.difficulty, keyword.searchVolume);
              const bubbleSize = getBubbleSize(keyword.searchVolume);
              const opportunityScore = getOpportunityScore(keyword.difficulty, keyword.searchVolume, keyword.cpc);
              const isSelected = selectedKeyword === keyword.keyword;
              const isHovered = hoveredKeyword === keyword.keyword;
              
              return (
                <div
                  key={keyword.keyword}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 ${
                    isSelected ? 'scale-110 z-20' : isHovered ? 'scale-105 z-10' : 'hover:scale-105'
                  }`}
                  style={{
                    left: `${position.x}%`,
                    top: `${position.y}%`,
                    width: `${bubbleSize}px`,
                    height: `${bubbleSize}px`
                  }}
                  onClick={() => setSelectedKeyword(isSelected ? null : keyword.keyword)}
                  onMouseEnter={() => setHoveredKeyword(keyword.keyword)}
                  onMouseLeave={() => setHoveredKeyword(null)}
                >
                  <div className={`w-full h-full rounded-full flex items-center justify-center text-white text-xs font-medium border-2 ${
                    getBubbleColor(keyword.difficulty, opportunityScore)
                  } ${isSelected ? 'ring-4 ring-blue-300 dark:ring-blue-600' : ''} shadow-lg`}>
                    <div className="text-center leading-tight">
                      <div className="font-bold">{keyword.searchVolume > 5000 ? Math.round(keyword.searchVolume / 1000) + 'K' : keyword.searchVolume}</div>
                      <div className="text-xs opacity-90">{opportunityScore}</div>
                    </div>
                  </div>
                  
                  {/* Keyword Label */}
                  <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 transition-opacity duration-200 ${
                    isHovered || isSelected ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="bg-gray-900 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded whitespace-nowrap shadow-lg">
                      {keyword.keyword}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Keyword Details */}
      {selectedKeyword && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-blue-500" />
            {t('keyword-details')}: {selectedKeyword}
          </h3>
          
          {(() => {
            const keyword = mockKeywordData.find(k => k.keyword === selectedKeyword);
            if (!keyword) return null;
            
            const opportunityScore = getOpportunityScore(keyword.difficulty, keyword.searchVolume, keyword.cpc);
            
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{keyword.searchVolume.toLocaleString()}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t('search-volume')}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{keyword.difficulty}%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t('keyword-difficulty')}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">${keyword.cpc}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">CPC</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className={`text-2xl font-bold ${
                    opportunityScore >= 80 ? 'text-green-600 dark:text-green-400' :
                    opportunityScore >= 60 ? 'text-yellow-600 dark:text-yellow-400' :
                    'text-red-600 dark:text-red-400'
                  }`}>{opportunityScore}/100</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t('opportunity-score')}</div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Keyword Details Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{language === 'en' ? 'Keyword Analysis' : 'Anahtar Kelime Analizi'}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {language === 'en' ? 'Keyword' : 'Anahtar Kelime'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {language === 'en' ? 'Difficulty' : 'Zorluk'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {language === 'en' ? 'Search Volume' : 'Arama Hacmi'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  CPC
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {language === 'en' ? 'Current Rank' : 'Mevcut Sıralama'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {language === 'en' ? 'Trend' : 'Trend'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {language === 'en' ? 'Opportunity Score' : 'Fırsat Puanı'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {mockKeywordData.map((keyword) => {
                const opportunityScore = getOpportunityScore(keyword.difficulty, keyword.searchVolume, keyword.cpc);
                return (
                  <tr 
                    key={keyword.keyword} 
                    className={`hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                      selectedKeyword === keyword.keyword ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}
                    onClick={() => setSelectedKeyword(selectedKeyword === keyword.keyword ? null : keyword.keyword)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {keyword.keyword}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      <div className="flex items-center">
                        <div className={`w-12 h-2 rounded-full mr-2 ${
                          keyword.difficulty <= 30 ? 'bg-green-400' :
                          keyword.difficulty <= 60 ? 'bg-yellow-400' : 'bg-red-400'
                        }`}>
                          <div 
                            className="h-full bg-gray-200 dark:bg-gray-600 rounded-full"
                            style={{ width: `${100 - keyword.difficulty}%` }}
                          ></div>
                        </div>
                        {keyword.difficulty}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {keyword.searchVolume.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      ${keyword.cpc}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      #{keyword.currentRank}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center">
                        {keyword.trend === 'up' ? (
                          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                        ) : keyword.trend === 'down' ? (
                          <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                        ) : (
                          <Minus className="w-4 h-4 text-gray-400 mr-1" />
                        )}
                        <span className={
                          keyword.trend === 'up' ? 'text-green-600 dark:text-green-400' :
                          keyword.trend === 'down' ? 'text-red-600 dark:text-red-400' :
                          'text-gray-500 dark:text-gray-400'
                        }>
                          {keyword.trend === 'up' ? (language === 'en' ? 'up' : 'yukarı') :
                           keyword.trend === 'down' ? (language === 'en' ? 'down' : 'aşağı') :
                           (language === 'en' ? 'stable' : 'kararlı')}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        opportunityScore >= 80 ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' :
                        opportunityScore >= 60 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' :
                        'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
                      }`}>
                        {opportunityScore}/100
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default KeywordDifficultyMatrix;