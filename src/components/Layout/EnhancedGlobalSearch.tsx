import React, { useState, useEffect, useRef } from 'react';
import { Search, X, FileText, Settings, HelpCircle, Navigation, Command, BarChart3, Key, CheckCircle, TrendingUp, Link, Users, FileBarChart, Calendar, Grid3X3, Brain, Target, Activity, Clock, Zap, MousePointer, Smartphone, Globe, Eye, AlertTriangle, Shield, Plus } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'navigation' | 'definition' | 'setting' | 'help' | 'section';
  url?: string;
  icon?: React.ReactNode;
  action?: () => void;
  alternativeTitles?: string[];
}

interface EnhancedGlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const EnhancedGlobalSearch: React.FC<EnhancedGlobalSearchProps> = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getSearchData = () => {
    const navigationItems = [
      { id: 'nav-dashboard', title: t('dashboard'), description: language === 'en' ? 'Main dashboard overview' : 'Ana kontrol paneli genel bakışı', type: 'navigation', url: '/dashboard', icon: <BarChart3 className="w-4 h-4" /> },
      { id: 'nav-keywords', title: t('keywords'), description: language === 'en' ? 'Keyword research and tracking' : 'Anahtar kelime araştırması ve takibi', type: 'navigation', url: '/keywords', icon: <Key className="w-4 h-4" /> },
      { id: 'nav-audit', title: t('site-audit'), description: language === 'en' ? 'Technical SEO audit' : 'Teknik SEO denetimi', type: 'navigation', url: '/site-audit', icon: <CheckCircle className="w-4 h-4" /> },
      { id: 'nav-content', title: t('content-analysis'), description: language === 'en' ? 'Content quality analysis' : 'İçerik kalitesi analizi', type: 'navigation', url: '/content-analysis', icon: <FileText className="w-4 h-4" /> },
      { id: 'nav-ranking', title: t('rank-tracking'), description: language === 'en' ? 'Monitor keyword rankings' : 'Anahtar kelime sıralamalarını izle', type: 'navigation', url: '/rank-tracking', icon: <TrendingUp className="w-4 h-4" /> },
      { id: 'nav-backlinks', title: t('backlink-analysis'), description: language === 'en' ? 'Backlink profile analysis' : 'Backlink profili analizi', type: 'navigation', url: '/backlink-analysis', icon: <Link className="w-4 h-4" /> },
      { id: 'nav-competitors', title: t('competitor-analysis'), description: language === 'en' ? 'Competitor research' : 'Rakip araştırması', type: 'navigation', url: '/competitor-analysis', icon: <Users className="w-4 h-4" /> },
      { id: 'nav-reports', title: t('reports'), description: language === 'en' ? 'Generate SEO reports' : 'SEO raporları oluştur', type: 'navigation', url: '/reports', icon: <FileBarChart className="w-4 h-4" /> },
      { id: 'nav-semantic', title: t('semantic-analysis'), description: language === 'en' ? 'Semantic relationships and user intent' : 'Semantik ilişkiler ve kullanıcı niyeti', type: 'navigation', url: '/semantic-analysis', icon: <Brain className="w-4 h-4" /> },
      { id: 'nav-trends', title: t('trend-forecasting'), description: language === 'en' ? 'Predict emerging search trends' : 'Yükselen arama trendlerini tahmin et', type: 'navigation', url: '/trend-forecasting', icon: <Target className="w-4 h-4" /> },
      { id: 'nav-task-manager', title: t('seo-task-manager'), description: language === 'en' ? 'Manage SEO tasks' : 'SEO görevlerini yönet', type: 'navigation', url: '/seo-task-manager', icon: <BarChart3 className="w-4 h-4" /> },
      { id: 'nav-content-calendar', title: t('content-calendar'), description: language === 'en' ? 'Plan and schedule content' : 'İçerik planla ve zamanla', type: 'navigation', url: '/content-calendar', icon: <Calendar className="w-4 h-4" /> },
      { id: 'nav-keyword-matrix', title: t('keyword-difficulty-matrix'), description: language === 'en' ? 'Analyze keyword difficulty vs opportunity' : 'Anahtar kelime zorluğu ve fırsatını analiz et', type: 'navigation', url: '/keyword-difficulty-matrix', icon: <Grid3X3 className="w-4 h-4" /> },
      { id: 'nav-user-behavior', title: t('user-behavior-insights'), description: language === 'en' ? 'Analyze user behavior patterns' : 'Kullanıcı davranış kalıplarını analiz et', type: 'navigation', url: '/user-behavior-insights', icon: <Activity className="w-4 h-4" /> },
      { id: 'nav-pricing', title: t('pricing'), description: language === 'en' ? 'View pricing plans' : 'Fiyatlandırma planlarını görüntüle', type: 'navigation', url: '/pricing', icon: <BarChart3 className="w-4 h-4" /> },
      { id: 'nav-education', title: t('education'), description: language === 'en' ? 'SEO tutorials and guides' : 'SEO eğitimleri ve rehberleri', type: 'navigation', url: '/education', icon: <FileText className="w-4 h-4" /> },
      { id: 'nav-contact', title: t('contact'), description: language === 'en' ? 'Contact support' : 'Destek ile iletişime geç', type: 'navigation', url: '/contact', icon: <BarChart3 className="w-4 h-4" /> },
      { id: 'nav-settings', title: t('settings'), description: language === 'en' ? 'Account settings' : 'Hesap ayarları', type: 'navigation', url: '/settings', icon: <Settings className="w-4 h-4" /> },
      { id: 'nav-profile', title: t('profile'), description: language === 'en' ? 'User profile' : 'Kullanıcı profili', type: 'navigation', url: '/profile', icon: <BarChart3 className="w-4 h-4" /> },
    ];

    // Section items for sub-navigation
    const sectionItems = [
      // Keywords sections
      { id: 'section-keyword-tracking', title: language === 'en' ? 'Keyword Tracking' : 'Anahtar Kelime Takibi', alternativeTitles: language === 'en' ? ['KEYWORD TRACKING'] : ['ANAHTAR KELİME TAKİBİ'], description: language === 'en' ? 'Track keyword rankings and performance' : 'Anahtar kelime sıralamalarını ve performansını takip edin', type: 'section', url: '/keywords?tab=tracking', icon: <Search className="w-4 h-4" /> },
      { id: 'section-serp-entrenchment', title: language === 'en' ? 'SERP Entrenchment' : 'SERP Yerleşimi', alternativeTitles: language === 'en' ? ['SERP ENTRENCHMENT'] : ['SERP YERLEŞİMİ'], description: language === 'en' ? 'Analyze keyword stability in search results' : 'Arama sonuçlarında anahtar kelime kararlılığını analiz edin', type: 'section', url: '/keywords?tab=entrenchment', icon: <Clock className="w-4 h-4" /> },
      { id: 'section-title-optimizer', title: language === 'en' ? 'Title Optimizer' : 'Başlık Optimize Edici', alternativeTitles: language === 'en' ? ['TITLE OPTIMIZER'] : ['BAŞLIK OPTİMİZE EDİCİ'], description: language === 'en' ? 'Optimize page titles for better CTR' : 'Daha iyi CTR için sayfa başlıklarını optimize edin', type: 'section', url: '/keywords?tab=title-optimizer', icon: <Target className="w-4 h-4" /> },
      
      // Rank tracking sections
      { id: 'section-rank-overview', title: language === 'en' ? 'Ranking Overview' : 'Sıralama Genel Bakışı', alternativeTitles: language === 'en' ? ['RANKING OVERVIEW'] : ['SIRALAMA GENEL BAKIŞI'], description: language === 'en' ? 'Overview of keyword rankings' : 'Anahtar kelime sıralamalarına genel bakış', type: 'section', url: '/rank-tracking?tab=overview', icon: <BarChart3 className="w-4 h-4" /> },
      { id: 'section-serp-terrain', title: language === 'en' ? 'SERP Landscape' : 'SERP Manzarası', alternativeTitles: language === 'en' ? ['SERP LANDSCAPE'] : ['SERP MANZARASI'], description: language === 'en' ? 'Visualize SERP features and competition' : 'SERP özelliklerini ve rekabeti görselleştirin', type: 'section', url: '/rank-tracking?tab=serp-terrain', icon: <Globe className="w-4 h-4" /> },
      { id: 'section-serp-features', title: language === 'en' ? 'SERP Feature Infiltrator' : 'SERP Özellik Sızma Aracı', alternativeTitles: language === 'en' ? ['SERP FEATURE INFILTRATOR'] : ['SERP ÖZELLİK SIZMA ARACI'], description: language === 'en' ? 'Analyze and target SERP features' : 'SERP özelliklerini analiz edin ve hedefleyin', type: 'section', url: '/rank-tracking?tab=serp-features', icon: <Target className="w-4 h-4" /> },
      { id: 'section-rank-keywords', title: language === 'en' ? 'All Ranking Keywords' : 'Tüm Sıralanan Anahtar Kelimeler', alternativeTitles: language === 'en' ? ['ALL RANKING KEYWORDS'] : ['TÜM SIRALANAN ANAHTAR KELİMELER'], description: language === 'en' ? 'View all tracked keywords and rankings' : 'Tüm izlenen anahtar kelimeleri ve sıralamaları görüntüleyin', type: 'section', url: '/rank-tracking?tab=keywords', icon: <Key className="w-4 h-4" /> },
      
      // Content analysis sections
      { id: 'section-content-quality', title: language === 'en' ? 'Content Quality' : 'İçerik Kalitesi', alternativeTitles: language === 'en' ? ['CONTENT QUALITY'] : ['İÇERİK KALİTESİ'], description: language === 'en' ? 'Analyze content quality and performance' : 'İçerik kalitesini ve performansını analiz edin', type: 'section', url: '/content-analysis?tab=quality', icon: <FileText className="w-4 h-4" /> },
      { id: 'section-clarity-builder', title: language === 'en' ? 'Content Clarity Builder' : 'İçerik Netliği Oluşturucu', alternativeTitles: language === 'en' ? ['CONTENT CLARITY BUILDER'] : ['İÇERİK NETLİĞİ OLUŞTURUCU'], description: language === 'en' ? 'Improve content clarity and readability' : 'İçerik netliğini ve okunabilirliğini geliştirin', type: 'section', url: '/content-analysis?tab=clarity-builder', icon: <Eye className="w-4 h-4" /> },
      { id: 'section-cannibalization', title: language === 'en' ? 'Semantic Cannibalization' : 'Semantik Yamyamlık', alternativeTitles: language === 'en' ? ['SEMANTIC CANNIBALIZATION'] : ['SEMANTİK YAMYAMLIK'], description: language === 'en' ? 'Detect and fix content cannibalization issues' : 'İçerik yamyamlık sorunlarını tespit edin ve düzeltin', type: 'section', url: '/content-analysis?tab=cannibalization', icon: <AlertTriangle className="w-4 h-4" /> },
      { id: 'section-nlp-engagement', title: language === 'en' ? 'NLP Engagement Booster' : 'NLP Etkileşim Artırıcı', alternativeTitles: language === 'en' ? ['NLP ENGAGEMENT BOOSTER'] : ['NLP ETKİLEŞİM ARTIRICI'], description: language === 'en' ? 'Enhance content engagement with NLP' : 'NLP ile içerik etkileşimini artırın', type: 'section', url: '/content-analysis?tab=nlp-engagement', icon: <Zap className="w-4 h-4" /> },
      
      // Backlink analysis sections
      { id: 'section-backlink-overview', title: language === 'en' ? 'Backlink Overview' : 'Backlink Genel Bakışı', alternativeTitles: language === 'en' ? ['BACKLINK OVERVIEW'] : ['BACKLINK GENEL BAKIŞI'], description: language === 'en' ? 'Overview of your backlink profile' : 'Backlink profilinize genel bakış', type: 'section', url: '/backlink-analysis?tab=overview', icon: <BarChart3 className="w-4 h-4" /> },
      { id: 'section-link-magnet', title: language === 'en' ? 'Link Magnet Analyzer' : 'Bağlantı Mıknatısı Analizörü', alternativeTitles: language === 'en' ? ['LINK MAGNET ANALYZER'] : ['BAĞLANTI MIKNATISI ANALİZÖRÜ'], description: language === 'en' ? 'Analyze content types that attract links' : 'Bağlantıları çeken içerik türlerini analiz edin', type: 'section', url: '/backlink-analysis?tab=link-magnet', icon: <Brain className="w-4 h-4" /> },
      { id: 'section-all-backlinks', title: language === 'en' ? 'All Backlinks' : 'Tüm Backlink\'ler', alternativeTitles: language === 'en' ? ['ALL BACKLINKS'] : ['TÜM BACKLINK\'LER'], description: language === 'en' ? 'View all backlinks to your site' : 'Sitenize olan tüm backlink\'leri görüntüleyin', type: 'section', url: '/backlink-analysis?tab=backlinks', icon: <Link className="w-4 h-4" /> },
      { id: 'section-new-backlinks', title: language === 'en' ? 'New Links' : 'Yeni Bağlantılar', alternativeTitles: language === 'en' ? ['NEW LINKS'] : ['YENİ BAĞLANTILAR'], description: language === 'en' ? 'Recently discovered backlinks' : 'Yeni keşfedilen backlink\'ler', type: 'section', url: '/backlink-analysis?tab=new', icon: <Plus className="w-4 h-4" /> },
      { id: 'section-lost-backlinks', title: language === 'en' ? 'Lost Links' : 'Kaybedilen Bağlantılar', alternativeTitles: language === 'en' ? ['LOST LINKS'] : ['KAYBEDİLEN BAĞLANTILAR'], description: language === 'en' ? 'Backlinks that have been lost' : 'Kaybedilen backlink\'ler', type: 'section', url: '/backlink-analysis?tab=lost', icon: <AlertTriangle className="w-4 h-4" /> },
      { id: 'section-toxic-backlinks', title: language === 'en' ? 'Toxic Links' : 'Toksik Bağlantılar', alternativeTitles: language === 'en' ? ['TOXIC LINKS'] : ['TOKSİK BAĞLANTILAR'], description: language === 'en' ? 'Potentially harmful backlinks' : 'Potansiyel olarak zararlı backlink\'ler', type: 'section', url: '/backlink-analysis?tab=toxic', icon: <AlertTriangle className="w-4 h-4" /> },
      
      // Site audit sections
      { id: 'section-audit-overview', title: language === 'en' ? 'Audit Overview' : 'Denetim Genel Bakışı', alternativeTitles: language === 'en' ? ['AUDIT OVERVIEW'] : ['DENETİM GENEL BAKIŞI'], description: language === 'en' ? 'Overview of site audit results' : 'Site denetim sonuçlarına genel bakış', type: 'section', url: '/site-audit?tab=overview', icon: <BarChart3 className="w-4 h-4" /> },
      { id: 'section-crawl-budget', title: language === 'en' ? 'Crawl Budget Analysis' : 'Tarama Bütçesi Analizi', alternativeTitles: language === 'en' ? ['CRAWL BUDGET ANALYSIS'] : ['TARAMA BÜTÇESİ ANALİZİ'], description: language === 'en' ? 'Analyze crawl budget efficiency' : 'Tarama bütçesi verimliliğini analiz edin', type: 'section', url: '/site-audit?tab=crawl-budget', icon: <Globe className="w-4 h-4" /> },
      
      // Semantic analysis sections
      { id: 'section-topical-expansion', title: language === 'en' ? 'Topical Expansion' : 'Konu Genişletme', alternativeTitles: language === 'en' ? ['TOPICAL EXPANSION'] : ['KONU GENİŞLETME'], description: language === 'en' ? 'Expand content topics with semantic relationships' : 'Semantik ilişkilerle içerik konularını genişletin', type: 'section', url: '/semantic-analysis?tab=expansion', icon: <Brain className="w-4 h-4" /> },
      { id: 'section-thought-vectors', title: language === 'en' ? 'Thought Vectors' : 'Düşünce Vektörleri', alternativeTitles: language === 'en' ? ['THOUGHT VECTORS'] : ['DÜŞÜNCE VEKTÖRLERİ'], description: language === 'en' ? 'Analyze user intent patterns' : 'Kullanıcı niyet kalıplarını analiz edin', type: 'section', url: '/semantic-analysis?tab=thought-vectors', icon: <Brain className="w-4 h-4" /> },
      
      // User behavior sections
      { id: 'section-behavior-overview', title: language === 'en' ? 'Behavior Overview' : 'Davranış Genel Bakışı', alternativeTitles: language === 'en' ? ['BEHAVIOR OVERVIEW'] : ['DAVRANIŞ GENEL BAKIŞI'], description: language === 'en' ? 'Overview of user behavior' : 'Kullanıcı davranışına genel bakış', type: 'section', url: '/user-behavior-insights?tab=overview', icon: <BarChart3 className="w-4 h-4" /> },
      { id: 'section-click-bounce', title: language === 'en' ? 'Click-Bounce Analysis' : 'Tıklama-Çıkış Analizi', alternativeTitles: language === 'en' ? ['CLICK-BOUNCE ANALYSIS'] : ['TIKLAMA-ÇIKIŞ ANALİZİ'], description: language === 'en' ? 'Analyze click-through and bounce rates' : 'Tıklama ve çıkış oranlarını analiz edin', type: 'section', url: '/user-behavior-insights?tab=click-bounce', icon: <MousePointer className="w-4 h-4" /> },
      { id: 'section-user-journey', title: language === 'en' ? 'User Journey Mapping' : 'Kullanıcı Yolculuğu Haritası', alternativeTitles: language === 'en' ? ['USER JOURNEY MAPPING'] : ['KULLANICI YOLCULUĞU HARİTASI'], description: language === 'en' ? 'Map user journeys through your site' : 'Siteniz boyunca kullanıcı yolculuklarını haritalayın', type: 'section', url: '/user-behavior-insights?tab=user-journey', icon: <Users className="w-4 h-4" /> },
      { id: 'section-engagement-metrics', title: language === 'en' ? 'Engagement Metrics' : 'Etkileşim Metrikleri', alternativeTitles: language === 'en' ? ['ENGAGEMENT METRICS'] : ['ETKİLEŞİM METRİKLERİ'], description: language === 'en' ? 'Analyze user engagement with your content' : 'Kullanıcıların içeriğinizle etkileşimini analiz edin', type: 'section', url: '/user-behavior-insights?tab=engagement', icon: <Activity className="w-4 h-4" /> },
      { id: 'section-device-analysis', title: language === 'en' ? 'Device Breakdown' : 'Cihaz Dağılımı', alternativeTitles: language === 'en' ? ['DEVICE BREAKDOWN'] : ['CİHAZ DAĞILIMI'], description: language === 'en' ? 'Analyze user behavior by device type' : 'Cihaz türüne göre kullanıcı davranışını analiz edin', type: 'section', url: '/user-behavior-insights?tab=device-analysis', icon: <Smartphone className="w-4 h-4" /> },
      
      // Settings sections
      { id: 'section-general-settings', title: language === 'en' ? 'General Settings' : 'Genel Ayarlar', alternativeTitles: language === 'en' ? ['GENERAL SETTINGS'] : ['GENEL AYARLAR'], description: language === 'en' ? 'Manage general account settings' : 'Genel hesap ayarlarını yönetin', type: 'section', url: '/settings?tab=general', icon: <Settings className="w-4 h-4" /> },
      { id: 'section-security-settings', title: language === 'en' ? 'Security Settings' : 'Güvenlik Ayarları', alternativeTitles: language === 'en' ? ['SECURITY SETTINGS'] : ['GÜVENLİK AYARLARI'], description: language === 'en' ? 'Manage account security' : 'Hesap güvenliğini yönetin', type: 'section', url: '/settings?tab=security', icon: <Shield className="w-4 h-4" /> },
    ];

    const definitions = [
      { id: 'def-seo', title: language === 'en' ? 'What is SEO?' : 'SEO nedir?', alternativeTitles: language === 'en' ? ['WHAT IS SEO?'] : ['SEO NEDİR?'], description: language === 'en' ? 'Search Engine Optimization - improving website visibility' : 'Arama Motoru Optimizasyonu - web sitesi görünürlüğünü artırma', type: 'definition' },
      { id: 'def-serp', title: language === 'en' ? 'What is SERP?' : 'SERP nedir?', alternativeTitles: language === 'en' ? ['WHAT IS SERP?'] : ['SERP NEDİR?'], description: language === 'en' ? 'Search Engine Results Page - the page shown after a search' : 'Arama Motoru Sonuç Sayfası - arama sonrası gösterilen sayfa', type: 'definition' },
      { id: 'def-backlink', title: language === 'en' ? 'What is a backlink?' : 'Backlink nedir?', alternativeTitles: language === 'en' ? ['WHAT IS A BACKLINK?'] : ['BACKLINK NEDİR?'], description: language === 'en' ? 'A link from one website to another' : 'Bir web sitesinden diğerine giden bağlantı', type: 'definition' },
      { id: 'def-keyword', title: language === 'en' ? 'What is a keyword?' : 'Anahtar kelime nedir?', alternativeTitles: language === 'en' ? ['WHAT IS A KEYWORD?'] : ['ANAHTAR KELİME NEDİR?'], description: language === 'en' ? 'Words or phrases users search for' : 'Kullanıcıların aradığı kelimeler veya ifadeler', type: 'definition' },
      { id: 'def-meta', title: language === 'en' ? 'What are meta tags?' : 'Meta etiketleri nedir?', alternativeTitles: language === 'en' ? ['WHAT ARE META TAGS?'] : ['META ETİKETLERİ NEDİR?'], description: language === 'en' ? 'HTML tags that provide metadata about a webpage' : 'Bir web sayfası hakkında meta veri sağlayan HTML etiketleri', type: 'definition' },
      { id: 'def-crawl', title: language === 'en' ? 'What is crawling?' : 'Tarama nedir?', alternativeTitles: language === 'en' ? ['WHAT IS CRAWLING?'] : ['TARAMA NEDİR?'], description: language === 'en' ? 'Process of search engines discovering web pages' : 'Arama motorlarının web sayfalarını keşfetme süreci', type: 'definition' },
      { id: 'def-eat', title: language === 'en' ? 'What is E-E-A-T?' : 'E-E-A-T nedir?', alternativeTitles: language === 'en' ? ['WHAT IS E-E-A-T?'] : ['E-E-A-T NEDİR?'], description: language === 'en' ? 'Experience, Expertise, Authoritativeness, Trust - Google quality factors' : 'Deneyim, Uzmanlık, Yetkinlik, Güven - Google kalite faktörleri', type: 'definition' },
      { id: 'def-semantic', title: language === 'en' ? 'What is semantic SEO?' : 'Semantik SEO nedir?', alternativeTitles: language === 'en' ? ['WHAT IS SEMANTIC SEO?'] : ['SEMANTİK SEO NEDİR?'], description: language === 'en' ? 'Optimizing for meaning and context, not just keywords' : 'Sadece anahtar kelimeler değil, anlam ve bağlam için optimizasyon', type: 'definition' },
      { id: 'def-intent', title: language === 'en' ? 'What is search intent?' : 'Arama niyeti nedir?', alternativeTitles: language === 'en' ? ['WHAT IS SEARCH INTENT?'] : ['ARAMA NİYETİ NEDİR?'], description: language === 'en' ? 'The purpose behind a user\'s search query' : 'Kullanıcının arama sorgusunun arkasındaki amaç', type: 'definition' },
      { id: 'def-serp-entrenchment', title: language === 'en' ? 'What is SERP entrenchment?' : 'SERP yerleşimi nedir?', alternativeTitles: language === 'en' ? ['WHAT IS SERP ENTRENCHMENT?'] : ['SERP YERLEŞİMİ NEDİR?'], description: language === 'en' ? 'The stability of search results over time' : 'Arama sonuçlarının zaman içindeki kararlılığı', type: 'definition' },
      { id: 'def-cannibalization', title: language === 'en' ? 'What is content cannibalization?' : 'İçerik yamyamlığı nedir?', alternativeTitles: language === 'en' ? ['WHAT IS CONTENT CANNIBALIZATION?'] : ['İÇERİK YAMYAMLIĞI NEDİR?'], description: language === 'en' ? 'When multiple pages compete for the same keywords' : 'Birden fazla sayfanın aynı anahtar kelimeler için rekabet etmesi', type: 'definition' },
      { id: 'def-nlp', title: language === 'en' ? 'What is NLP?' : 'NLP nedir?', alternativeTitles: language === 'en' ? ['WHAT IS NLP?'] : ['NLP NEDİR?'], description: language === 'en' ? 'Natural Language Processing - AI understanding human language' : 'Doğal Dil İşleme - Yapay zekanın insan dilini anlaması', type: 'definition' },
      { id: 'def-content-clarity', title: language === 'en' ? 'What is content clarity?' : 'İçerik netliği nedir?', alternativeTitles: language === 'en' ? ['WHAT IS CONTENT CLARITY?'] : ['İÇERİK NETLİĞİ NEDİR?'], description: language === 'en' ? 'How easily readers can understand your content' : 'Okuyucuların içeriğinizi ne kadar kolay anlayabildiği', type: 'definition' },
      { id: 'def-crawl-budget', title: language === 'en' ? 'What is crawl budget?' : 'Tarama bütçesi nedir?', alternativeTitles: language === 'en' ? ['WHAT IS CRAWL BUDGET?'] : ['TARAMA BÜTÇESİ NEDİR?'], description: language === 'en' ? 'The number of pages search engines will crawl on your site in a given time period' : 'Arama motorlarının belirli bir süre içinde sitenizde tarayacağı sayfa sayısı', type: 'definition' },
    ];

    const settings = [
      { id: 'set-language', title: t('change-language'), alternativeTitles: language === 'en' ? ['CHANGE LANGUAGE'] : ['DİL DEĞİŞTİR'], description: language === 'en' ? 'Switch between English and Turkish' : 'İngilizce ve Türkçe arasında geçiş yapın', type: 'setting', url: '/settings' },
      { id: 'set-theme', title: t('toggle-theme'), alternativeTitles: language === 'en' ? ['TOGGLE THEME'] : ['TEMA DEĞİŞTİR'], description: language === 'en' ? 'Switch between light and dark mode' : 'Açık ve karanlık mod arasında geçiş yapın', type: 'setting', url: '/settings' },
      { id: 'set-currency', title: language === 'en' ? 'Change currency' : 'Para birimini değiştir', alternativeTitles: language === 'en' ? ['CHANGE CURRENCY'] : ['PARA BİRİMİNİ DEĞİŞTİR'], description: language === 'en' ? 'Update currency preferences' : 'Para birimi tercihlerini güncelle', type: 'setting', url: '/settings' },
      { id: 'set-notifications', title: language === 'en' ? 'Notification settings' : 'Bildirim ayarları', alternativeTitles: language === 'en' ? ['NOTIFICATION SETTINGS'] : ['BİLDİRİM AYARLARI'], description: language === 'en' ? 'Manage notification preferences' : 'Bildirim tercihlerini yönet', type: 'setting', url: '/settings' },
    ];

    const help = [
      { id: 'help-start', title: language === 'en' ? 'Getting started' : 'Başlarken', alternativeTitles: language === 'en' ? ['GETTING STARTED'] : ['BAŞLARKEN'], description: language === 'en' ? 'Learn how to use the platform' : 'Platformu nasıl kullanacağınızı öğrenin', type: 'help', url: '/education' },
      { id: 'help-audit', title: language === 'en' ? 'How to run an audit' : 'Denetim nasıl yapılır', alternativeTitles: language === 'en' ? ['HOW TO RUN AN AUDIT'] : ['DENETİM NASIL YAPILIR'], description: language === 'en' ? 'Step-by-step audit guide' : 'Adım adım denetim kılavuzu', type: 'help', url: '/education' },
      { id: 'help-keywords', title: language === 'en' ? 'Keyword research guide' : 'Anahtar kelime araştırma kılavuzu', alternativeTitles: language === 'en' ? ['KEYWORD RESEARCH GUIDE'] : ['ANAHTAR KELİME ARAŞTIRMA KILAVUZU'], description: language === 'en' ? 'Learn effective keyword research' : 'Etkili anahtar kelime araştırmasını öğrenin', type: 'help', url: '/education' },
      { id: 'help-semantic', title: language === 'en' ? 'Semantic analysis guide' : 'Semantik analiz kılavuzu', alternativeTitles: language === 'en' ? ['SEMANTIC ANALYSIS GUIDE'] : ['SEMANTİK ANALİZ KILAVUZU'], description: language === 'en' ? 'Understanding semantic relationships' : 'Semantik ilişkileri anlama', type: 'help', url: '/education' },
      { id: 'help-trends', title: language === 'en' ? 'Trend forecasting guide' : 'Trend tahmin kılavuzu', alternativeTitles: language === 'en' ? ['TREND FORECASTING GUIDE'] : ['TREND TAHMİN KILAVUZU'], description: language === 'en' ? 'Predicting search trends' : 'Arama trendlerini tahmin etme', type: 'help', url: '/education' },
      { id: 'help-support', title: language === 'en' ? 'Contact support' : 'Destek ile iletişime geçin', alternativeTitles: language === 'en' ? ['CONTACT SUPPORT'] : ['DESTEK İLE İLETİŞİME GEÇİN'], description: language === 'en' ? 'Get help from our team' : 'Ekibimizden yardım alın', type: 'help', url: '/contact' },
    ];

    return [...navigationItems, ...sectionItems, ...definitions, ...settings, ...help];
  };

  useEffect(() => {
    if (query.trim()) {
      const searchData = getSearchData();
      const filtered = searchData.filter(item => {
        // Check main title
        const titleMatches = item.title.toLowerCase().includes(query.toLowerCase());
        
        // Check alternative titles if they exist
        const alternativeTitleMatches = item.alternativeTitles ? 
          item.alternativeTitles.some(alt => alt.toLowerCase().includes(query.toLowerCase())) : 
          false;
        
        // Check description
        const descriptionMatches = item.description.toLowerCase().includes(query.toLowerCase());
        
        return titleMatches || alternativeTitleMatches || descriptionMatches;
      }).slice(0, 8);

      setResults(filtered);
      setShowDropdown(true);
      setSelectedIndex(-1);
    } else {
      setResults([]);
      setShowDropdown(false);
      setSelectedIndex(-1);
    }
  }, [query, language]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => prev < results.length - 1 ? prev + 1 : prev);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          handleResultClick(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowDropdown(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleResultClick = (result: SearchResult) => {
    if (result.url) {
      navigate(result.url);
    }
    if (result.action) {
      result.action();
    }
    setQuery('');
    setShowDropdown(false);
    setSelectedIndex(-1);
    onClose();
  };

  const getResultIcon = (result: SearchResult) => {
    if (result.icon) {
      return result.icon;
    }
    
    switch (result.type) {
      case 'navigation':
        return <Navigation className="w-4 h-4" />;
      case 'definition':
        return <HelpCircle className="w-4 h-4" />;
      case 'setting':
        return <Settings className="w-4 h-4" />;
      case 'help':
        return <FileText className="w-4 h-4" />;
      case 'section':
        return <Navigation className="w-4 h-4" />;
      default:
        return <Search className="w-4 h-4" />;
    }
  };

  const getResultColor = (type: string) => {
    switch (type) {
      case 'navigation':
        return 'text-blue-500';
      case 'definition':
        return 'text-green-500';
      case 'setting':
        return 'text-purple-500';
      case 'help':
        return 'text-orange-500';
      case 'section':
        return 'text-indigo-500';
      default:
        return 'text-gray-500';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="relative z-50">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && setShowDropdown(true)}
          placeholder={t('global-search-placeholder')}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          autoFocus
          autoComplete="off"
        />
        <button
          onClick={onClose}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Search Results Dropdown */}
      {showDropdown && (
        <div 
          ref={dropdownRef} 
          className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 max-h-80 overflow-y-auto z-50"
        >
          {results.length > 0 ? (
            <div className="p-2">
              {results.map((result, index) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors text-left ${
                    index === selectedIndex 
                      ? 'bg-blue-50 dark:bg-blue-900/50' 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className={`p-2 rounded-lg mr-3 ${getResultColor(result.type)} bg-gray-100 dark:bg-gray-700`}>
                    {getResultIcon(result)}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {result.title}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {result.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : query.trim() ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              {t('no-results')}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>{language === 'en' ? 'Start typing to search...' : 'Aramak için yazmaya başlayın...'}</p>
              <div className="flex items-center justify-center mt-2 text-xs">
                <Command className="w-3 h-3 mr-1" />
                <span>{language === 'en' ? 'Use ↑↓ to navigate, Enter to select, Esc to close' : 'Gezinmek için ↑↓, seçmek için Enter, kapatmak için Esc kullanın'}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EnhancedGlobalSearch;