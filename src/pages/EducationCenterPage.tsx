import React, { useState } from 'react';
import { BookOpen, Play, FileText, Search, Clock, User, Star, Heart, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const EducationCenterPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const categories = [
    { id: 'all', name: language === 'en' ? 'All Topics' : 'Tüm Konular', count: 45 },
    { id: 'seo-basics', name: t('seo-basics'), count: 12 },
    { id: 'technical-seo', name: t('technical-seo'), count: 8 },
    { id: 'content-marketing', name: t('content-marketing'), count: 10 },
    { id: 'link-building', name: t('link-building'), count: 7 },
    { id: 'analytics', name: language === 'en' ? 'Analytics & Tracking' : 'Analitik ve İzleme', count: 8 }
  ];

  const englishContent = [
    {
      id: 'en-1',
      title: 'Complete SEO Guide for Beginners',
      type: 'video',
      category: 'seo-basics',
      duration: '15 min',
      difficulty: 'beginner',
      rating: 4.8,
      description: 'Learn the fundamentals of SEO from keyword research to on-page optimization.',
      author: 'Moz',
      embedUrl: 'https://www.youtube.com/embed/DvwS7cV9GmQ',
      thumbnail: 'https://img.youtube.com/vi/DvwS7cV9GmQ/maxresdefault.jpg'
    },
    {
      id: 'en-2',
      title: 'Technical SEO Audit Checklist',
      type: 'video',
      category: 'technical-seo',
      duration: '25 min',
      difficulty: 'intermediate',
      rating: 4.9,
      description: 'Step-by-step video guide to conducting a comprehensive technical SEO audit.',
      author: 'Ahrefs',
      embedUrl: 'https://www.youtube.com/embed/tBdMM5_1238',
      thumbnail: 'https://img.youtube.com/vi/tBdMM5_1238/maxresdefault.jpg'
    },
    {
      id: 'en-3',
      title: 'Content Strategy for SEO Success',
      type: 'video',
      category: 'content-marketing',
      duration: '30 min',
      difficulty: 'intermediate',
      rating: 4.7,
      description: 'Master content creation strategies that drive organic traffic and engagement.',
      author: 'Semrush',
      embedUrl: 'https://www.youtube.com/embed/OMxTn7yJTzs',
      thumbnail: 'https://img.youtube.com/vi/OMxTn7yJTzs/maxresdefault.jpg'
    },
    {
      id: 'en-4',
      title: 'Link Building Strategies That Work',
      type: 'video',
      category: 'link-building',
      duration: '20 min',
      difficulty: 'advanced',
      rating: 4.6,
      description: 'Discover proven link building techniques for 2024.',
      author: 'Backlinko',
      embedUrl: 'https://www.youtube.com/embed/Yo8RbGF6rDE',
      thumbnail: 'https://img.youtube.com/vi/Yo8RbGF6rDE/maxresdefault.jpg'
    }
  ];

  const turkishContent = [
    {
      id: 'tr-1',
      title: 'SEO Nedir? Başlangıç Rehberi',
      type: 'video',
      category: 'seo-basics',
      duration: '18 dk',
      difficulty: 'beginner',
      rating: 4.5,
      description: 'SEO\'nun temellerini öğrenin ve web sitenizi arama motorları için optimize edin.',
      author: 'SEO Uzmanı',
      embedUrl: 'https://www.youtube.com/embed/xsVTqzratPs',
      thumbnail: 'https://img.youtube.com/vi/xsVTqzratPs/maxresdefault.jpg'
    },
    {
      id: 'tr-2',
      title: 'Teknik SEO Rehberi',
      type: 'video',
      category: 'technical-seo',
      duration: '22 dk',
      difficulty: 'intermediate',
      rating: 4.7,
      description: 'Web sitenizin teknik SEO performansını artırın.',
      author: 'Dijital Pazarlama',
      embedUrl: 'https://www.youtube.com/embed/MYE6T_gd7H0',
      thumbnail: 'https://img.youtube.com/vi/MYE6T_gd7H0/maxresdefault.jpg'
    },
    {
      id: 'tr-3',
      title: 'İçerik Pazarlama ve SEO',
      type: 'video',
      category: 'content-marketing',
      duration: '28 dk',
      difficulty: 'intermediate',
      rating: 4.6,
      description: 'SEO dostu içerik nasıl oluşturulur öğrenin.',
      author: 'İçerik Uzmanı',
      embedUrl: 'https://www.youtube.com/embed/1HxMacGGTOo',
      thumbnail: 'https://img.youtube.com/vi/1HxMacGGTOo/maxresdefault.jpg'
    }
  ];

  const allContent = selectedLanguage === 'en' ? englishContent : turkishContent;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play className="w-4 h-4" />;
      case 'course':
        return <BookOpen className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
      case 'course':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300';
    }
  };

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const filteredContent = allContent.filter(content => {
    const matchesCategory = selectedCategory === 'all' || content.category === selectedCategory;
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {t('education')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {language === 'en'
            ? 'Master SEO with our comprehensive learning resources, tutorials, and expert insights'
            : 'Kapsamlı öğrenme kaynakları, eğitimler ve uzman içgörüleriyle SEO\'yu ustalaşın'}
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={t('search-content')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Language Selector */}
        <div className="flex items-center space-x-2">
          <Globe className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="en">{t('english-content')}</option>
            <option value="tr">{t('turkish-content')}</option>
          </select>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {category.name} ({category.count})
          </button>
        ))}
      </div>

      {/* Featured Learning Paths */}
      <div className="bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{language === 'en' ? 'Featured Learning Paths' : 'Öne Çıkan Öğrenme Yolları'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('seo-basics')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {language === 'en'
                ? 'Start your SEO journey with essential concepts and best practices'
                : 'SEO yolculuğunuza temel kavramlar ve en iyi uygulamalarla başlayın'}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-500">{language === 'en' ? '5 lessons • 2 hours' : '5 ders • 2 saat'}</span>
              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
                {language === 'en' ? 'Start Learning' : 'Öğrenmeye Başla'}
              </button>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('technical-seo')} {language === 'en' ? 'Mastery' : 'Ustalığı'}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {language === 'en'
                ? 'Deep dive into technical optimization and site performance'
                : 'Teknik optimizasyon ve site performansına derinlemesine dalış'}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-500">{language === 'en' ? '8 lessons • 4 hours' : '8 ders • 4 saat'}</span>
              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
                {language === 'en' ? 'Start Learning' : 'Öğrenmeye Başla'}
              </button>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{language === 'en' ? 'Content & Strategy' : 'İçerik ve Strateji'}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {language === 'en'
                ? 'Create content that ranks and converts your audience'
                : 'Sıralanan ve kitlenizi dönüştüren içerik oluşturun'}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-500">{language === 'en' ? '6 lessons • 3 hours' : '6 ders • 3 saat'}</span>
              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
                {language === 'en' ? 'Start Learning' : 'Öğrenmeye Başla'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredContent.map((content) => (
          <div key={content.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
            {/* Video Thumbnail */}
            <div className="relative aspect-video bg-gray-100 dark:bg-gray-700">
              <img
                src={content.thumbnail}
                alt={content.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Play className="w-12 h-12 text-white" />
              </div>
              <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                {content.duration}
              </div>
              <button
                onClick={() => toggleFavorite(content.id)}
                className="absolute top-2 left-2 p-1 rounded-full bg-black bg-opacity-75 hover:bg-opacity-100 transition-colors"
              >
                <Heart className={`w-4 h-4 ${favorites.has(content.id) ? 'text-red-500 fill-current' : 'text-white'}`} />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getTypeColor(content.type)}`}>
                    {getTypeIcon(content.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{content.title}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getTypeColor(content.type)}`}>
                        {content.type}
                      </span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getDifficultyColor(content.difficulty)}`}>
                        {content.difficulty === 'beginner' ? (language === 'en' ? 'beginner' : 'başlangıç') :
                         content.difficulty === 'intermediate' ? (language === 'en' ? 'intermediate' : 'orta seviye') :
                         (language === 'en' ? 'advanced' : 'ileri seviye')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{content.rating}</span>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {content.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{content.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{content.author}</span>
                  </div>
                </div>
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm">
                  {language === 'en' ? 'Watch' : 'İzle'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('faq')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              {language === 'en' ? 'How often is the content updated?' : 'İçerik ne sıklıkla güncelleniyor?'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {language === 'en'
                ? 'Our education content is updated regularly to reflect the latest SEO best practices and algorithm changes.'
                : 'Eğitim içeriğimiz, en son SEO en iyi uygulamalarını ve algoritma değişikliklerini yansıtmak için düzenli olarak güncellenir.'}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              {language === 'en' ? 'Are there certificates available?' : 'Sertifikalar mevcut mu?'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {language === 'en'
                ? 'Yes, we offer completion certificates for our structured learning paths and courses.'
                : 'Evet, yapılandırılmış öğrenme yollarımız ve kurslarımız için tamamlama sertifikaları sunuyoruz.'}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              {language === 'en' ? 'Can I suggest new topics?' : 'Yeni konular önerebilir miyim?'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {language === 'en'
                ? 'Absolutely! We welcome suggestions for new educational content. Contact us with your ideas.'
                : 'Kesinlikle! Yeni eğitim içeriği önerilerini memnuniyetle karşılıyoruz. Fikirlerinizle bize ulaşın.'}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              {language === 'en' ? 'Is there live support available?' : 'Canlı destek mevcut mu?'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {language === 'en'
                ? 'Yes, our expert team is available for live Q&A sessions and personalized guidance.'
                : 'Evet, uzman ekibimiz canlı soru-cevap oturumları ve kişiselleştirilmiş rehberlik için mevcuttur.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationCenterPage;