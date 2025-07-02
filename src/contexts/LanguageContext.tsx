import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'tr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  formatCurrency: (amount: number, currency?: string) => string;
  formatDate: (date: Date) => string;
  formatNumber: (num: number) => string;
}

const translations = {
  en: {
    // Navigation
    'dashboard': 'Dashboard',
    'keywords': 'Keywords',
    'site-audit': 'Site Audit',
    'content-analysis': 'Content Analysis',
    'rank-tracking': 'Rank Tracking',
    'backlink-analysis': 'Backlink Analysis',
    'competitor-analysis': 'Competitor Analysis',
    'reports': 'Reports',
    'pricing': 'Pricing',
    'education': 'Education Center',
    'contact': 'Contact',
    'seo-task-manager': 'SEO Task Manager',
    'content-calendar': 'Content Calendar',
    'keyword-difficulty-matrix': 'Keyword Difficulty Matrix',
    'semantic-analysis': 'Semantic Analysis',
    'trend-forecasting': 'Trend Forecasting',
    'user-behavior-insights': 'User Behavior Insights',
    'keyword-volatility': 'Keyword Volatility',
    'admin-panel': 'Admin Panel',
    'settings': 'Settings',
    'profile': 'Profile',
    
    // Navigation Sections
    'main-tools': 'Main Tools',
    'advanced-tools': 'Advanced Tools',
    'ai-insights': 'AI Insights',
    'business': 'Business',
    'system': 'System',
    
    // Common
    'loading': 'Loading...',
    'save': 'Save',
    'cancel': 'Cancel',
    'delete': 'Delete',
    'edit': 'Edit',
    'add': 'Add',
    'search': 'Search',
    'filter': 'Filter',
    'export': 'Export',
    'import': 'Import',
    'submit': 'Submit',
    'back': 'Back',
    'next': 'Next',
    'previous': 'Previous',
    'close': 'Close',
    'confirm': 'Confirm',
    'yes': 'Yes',
    'no': 'No',
    'today': 'Today',
    'day': 'Day',
    'week': 'Week',
    'month': 'Month',
    'year': 'Year',
    'upgrade-now': 'Upgrade Now',
    'maybe-later': 'Maybe Later',
    'view-details': 'View Details',
    'hide-details': 'Hide Details',
    'mark-complete': 'Mark Complete',
    'auto-generate-tasks': 'Auto-Generate Tasks',
    'accept-tasks': 'Accept Tasks',
    'reject-tasks': 'Reject Tasks',
    'analyze': 'Analyze',
    'optimize': 'Optimize',
    'generate': 'Generate',
    'create': 'Create',
    'update': 'Update',
    'refresh': 'Refresh',
    'preview': 'Preview',
    'download': 'Download',
    'share': 'Share',
    'copy': 'Copy',
    'paste': 'Paste',
    'duplicate': 'Duplicate',
    'remove': 'Remove',
    'clear': 'Clear',
    'reset': 'Reset',
    'apply': 'Apply',
    'start': 'Start',
    'stop': 'Stop',
    'pause': 'Pause',
    'resume': 'Resume',
    'complete': 'Complete',
    'pending': 'Pending',
    'active': 'Active',
    'inactive': 'Inactive',
    'enabled': 'Enabled',
    'disabled': 'Disabled',
    'online': 'Online',
    'offline': 'Offline',
    'available': 'Available',
    'unavailable': 'Unavailable',
    'success': 'Success',
    'error': 'Error',
    'warning': 'Warning',
    'info': 'Info',
    'high': 'High',
    'medium': 'Medium',
    'low': 'Low',
    'critical': 'Critical',
    'important': 'Important',
    'minor': 'Minor',
    'urgent': 'Urgent',
    'normal': 'Normal',
    'new': 'New',
    'updated': 'Updated',
    'draft': 'Draft',
    'published': 'Published',
    'archived': 'Archived',
    'scheduled': 'Scheduled',
    'processing': 'Processing',
    'completed': 'Completed',
    'failed': 'Failed',
    'cancelled': 'Cancelled',
    
    // Authentication
    'login': 'Login',
    'register': 'Register',
    'logout': 'Logout',
    'sign-in': 'Sign In',
    'sign-up': 'Sign Up',
    'sign-out': 'Sign Out',
    'forgot-password': 'Forgot Password',
    'reset-password': 'Reset Password',
    'remember-me': 'Remember me',
    'email': 'Email',
    'password': 'Password',
    'confirm-password': 'Confirm Password',
    'name': 'Name',
    'full-name': 'Full Name',
    'email-address': 'Email Address',
    'create-account': 'Create Account',
    'already-have-account': 'Already have an account?',
    'dont-have-account': "Don't have an account?",
    'send-reset-link': 'Send Reset Link',
    'back-to-login': 'Back to Login',
    
    // Dashboard
    'welcome-back': 'Welcome back',
    'welcome-to-platform': 'Welcome to Workexe SEO Check',
    'about-us': 'About Us',
    'what-we-do': 'What We Do',
    'overview': 'Overview',
    'recent-activity': 'Recent Activity',
    'quick-stats': 'Quick Stats',
    'quick-actions': 'Quick Actions',
    'get-started': 'Get Started',
    'quick-start-guide': 'Quick Start Guide',
    'tutorial-links': 'Tutorial Links',
    'traffic-overview': 'Traffic Overview',
    'personalized-recommendations': 'Personalized Recommendations',
    
    // Header
    'search-placeholder': 'Search modules, tasks, keywords...',
    'global-search-placeholder': 'Search anything... (Ctrl+K)',
    'change-language': 'Change Language',
    'toggle-theme': 'Toggle Theme',
    'notifications': 'Notifications',
    'search-results': 'Search Results',
    'what-is': 'What is',
    'where-is': 'Where is',
    'no-results': 'No results found',
    
    // Pricing
    'free-plan': 'Free Plan',
    'starter-plan': 'Starter Plan',
    'professional-plan': 'Professional Plan',
    'enterprise-plan': 'Custom Plan',
    'current-plan': 'Current Plan',
    'upgrade': 'Upgrade',
    'downgrade': 'Downgrade',
    'plan': 'Plan',
    'monthly': 'Monthly',
    'yearly': 'Yearly',
    'choose-plan': 'Choose Plan',
    'contact-us': 'Contact Us',
    'most-popular': 'Most Popular',
    'coming-soon': 'Coming Soon',
    'join-waitlist': 'Join Waitlist',
    'notify-me': 'Notify Me',
    'add-ons-available': 'Add-ons Available',
    'advanced-reports-addon': 'Advanced Reports (+$20)',
    'api-access-addon': 'API Access (+$10)',
    'white-label-addon': 'White-label (+$15)',
    'all-addons-included': 'All add-ons included',
    'premium-features': 'Premium features unlocked',
    
    // Features
    'projects': 'Projects',
    'keyword-tracking': 'Keyword Tracking',
    'site-audits': 'Site Audits',
    'basic-reports': 'Basic Reports',
    'advanced-reports': 'Advanced Reports',
    'white-label-reports': 'White-label Reports',
    'api-access': 'API Access',
    'priority-support': 'Priority Support',
    'phone-support': 'Phone Support',
    'email-support': 'Email Support',
    'unlimited': 'Unlimited',
    
    // Contact
    'phone': 'Phone',
    'contact-form': 'Contact Form',
    'social-media': 'Social Media',
    'get-in-touch': 'Get in Touch',
    'send-message': 'Send Message',
    'message': 'Message',
    'subject': 'Subject',
    
    // Education
    'tutorials': 'Tutorials',
    'best-practices': 'Best Practices',
    'video-tutorials': 'Video Tutorials',
    'documentation': 'Documentation',
    'faq': 'FAQ',
    'help-center': 'Help Center',
    'turkish-content': 'Turkish Content',
    'english-content': 'English Content',
    'seo-basics': 'SEO Basics',
    'technical-seo': 'Technical SEO',
    'content-marketing': 'Content Marketing',
    'link-building': 'Link Building',
    'add-to-favorites': 'Add to Favorites',
    'remove-from-favorites': 'Remove from Favorites',
    'duration': 'Duration',
    'search-content': 'Search content...',
    
    // Settings
    'general-settings': 'General Settings',
    'default-project-settings': 'Default Project Settings',
    'default-country': 'Default Country',
    'default-currency': 'Default Currency',
    'default-language': 'Default Language',
    'timezone': 'Timezone',
    'currency-settings': 'Currency Settings',
    'select-currency': 'Select Currency',
    'bulk-update-projects': 'Bulk Update Projects',
    'update-existing-projects': 'Update Existing Projects',
    
    // Breadcrumbs
    'home': 'Home',
    'keyword-analysis': 'Keyword Analysis',
    'audit-results': 'Audit Results',
    'content-optimization': 'Content Optimization',
    'ranking-overview': 'Ranking Overview',
    'link-profile': 'Link Profile',
    'competitor-insights': 'Competitor Insights',
    'report-builder': 'Report Builder',
    
    // Calendar Views
    'calendar-view': 'Calendar View',
    'day-view': 'Day View',
    'week-view': 'Week View',
    'month-view': 'Month View',
    'previous-period': 'Previous',
    'next-period': 'Next',
    'go-to-today': 'Go to Today',
    
    // Task Manager
    'task-created-from-audit': 'Task created from audit',
    'audit-recommendation': 'Audit Recommendation',
    'estimated-time': 'Estimated Time',
    'effort-level': 'Effort Level',
    'task-priority': 'Task Priority',
    'how-to-fix': 'How to Fix',
    'affected-pages': 'Affected Pages',
    
    // Keyword Matrix
    'difficulty-vs-opportunity': 'Difficulty vs Opportunity',
    'search-volume': 'Search Volume',
    'keyword-difficulty': 'Keyword Difficulty',
    'opportunity-score': 'Opportunity Score',
    'competition-level': 'Competition Level',
    'keyword-details': 'Keyword Details',
    
    // Limits and Upgrades
    'limit-exceeded': 'Limit Exceeded',
    'daily-limit-reached': 'Daily limit reached',
    'monthly-limit-reached': 'Monthly limit reached',
    'upgrade-for-more': 'Upgrade for more',
    'limit-resets-in': 'Limit resets in',
    'current-usage': 'Current Usage',
    'upgrade-benefits': 'Upgrade Benefits',
    
    // User Behavior
    'user-behavior-insights': 'User Behavior Insights',
    'click-bounce-analysis': 'Click-Bounce Analysis',
    'ctr-vs-ux-conflict': 'CTR vs UX Conflict',
    'title-content-mismatch': 'Title-Content Mismatch',
    'bounce-rate-correlation': 'Bounce Rate Correlation',
    'user-journey-mapping': 'User Journey Mapping',
    'engagement-metrics': 'Engagement Metrics',
    'session-analysis': 'Session Analysis',
    'conversion-funnel': 'Conversion Funnel',
    'heat-map-analysis': 'Heat Map Analysis',
    'scroll-depth': 'Scroll Depth',
    'time-on-page': 'Time on Page',
    'exit-rate': 'Exit Rate',
    'page-views': 'Page Views',
    'unique-visitors': 'Unique Visitors',
    'returning-visitors': 'Returning Visitors',
    'new-visitors': 'New Visitors',
    'device-breakdown': 'Device Breakdown',
    'browser-analysis': 'Browser Analysis',
    'geographic-distribution': 'Geographic Distribution',
    'traffic-sources': 'Traffic Sources',
    'referral-analysis': 'Referral Analysis',
    'social-media-traffic': 'Social Media Traffic',
    'direct-traffic': 'Direct Traffic',
    'organic-traffic': 'Organic Traffic',
    'paid-traffic': 'Paid Traffic',
    
    // Keyword Volatility
    'keyword-volatility': 'Keyword Volatility',
    'volatility-protection': 'Volatility Protection',
    'volatility-insurance': 'Volatility Insurance',
    'risk-assessment': 'Risk Assessment',
    'backup-keywords': 'Backup Keywords',
    'hedge-strategy': 'Hedge Strategy',
    'traffic-diversification': 'Traffic Diversification',
    'volume-stability': 'Volume Stability',
    'ranking-stability': 'Ranking Stability',
    'seasonal-patterns': 'Seasonal Patterns',
    'trend-analysis': 'Trend Analysis',
    'volatility-score': 'Volatility Score',
    'stability-index': 'Stability Index',
    'risk-level': 'Risk Level',
    'contingency-plan': 'Contingency Plan',
    'alternative-keywords': 'Alternative Keywords',
    'keyword-portfolio': 'Keyword Portfolio',
    'diversification-score': 'Diversification Score',
    'risk-mitigation': 'Risk Mitigation',
    'volume-fluctuation': 'Volume Fluctuation',
    'competition-changes': 'Competition Changes',
    'serp-volatility': 'SERP Volatility',
    'algorithm-impact': 'Algorithm Impact',
    'market-trends': 'Market Trends',
    'industry-shifts': 'Industry Shifts',
    'consumer-behavior': 'Consumer Behavior',
    'economic-factors': 'Economic Factors',
    'seasonal-adjustments': 'Seasonal Adjustments',
    'forecast-accuracy': 'Forecast Accuracy',
    'prediction-confidence': 'Prediction Confidence',
    
    // Errors
    'error': 'Error',
    'something-went-wrong': 'Something went wrong',
    'page-not-found': 'Page not found',
    'access-denied': 'Access denied',
    'invalid-credentials': 'Invalid credentials',
    'required-field': 'This field is required',
    'invalid-email': 'Please enter a valid email address',
    'password-too-short': 'Password must be at least 8 characters',
    'passwords-dont-match': 'Passwords do not match',
    
    // Success Messages
    'task-completed': 'Task completed successfully',
    'audit-completed': 'Audit completed successfully',
    'settings-saved': 'Settings saved successfully',
    'profile-updated': 'Profile updated successfully',
    'keyword-added': 'Keyword added successfully',
    'language-changed': 'Language changed successfully',
    'currency-updated': 'Currency updated successfully',

    // Content Analysis
    'content-quality': 'Content Quality',
    'intent-fit-score': 'Intent Fit Score',
    'crawl-rank-timeline': 'Crawl-to-Rank Timeline',
    'eat-analysis': 'E-E-A-T Analysis',
    'clarity-builder': 'Content Clarity Builder',
    'cannibalization': 'Semantic Cannibalization',
    'nlp-engagement': 'NLP Engagement Booster',
  },
  tr: {
    // Navigation
    'dashboard': 'Kontrol Paneli',
    'keywords': 'Anahtar Kelimeler',
    'site-audit': 'Site Denetimi',
    'content-analysis': 'İçerik Analizi',
    'rank-tracking': 'Sıralama Takibi',
    'backlink-analysis': 'Backlink Analizi',
    'competitor-analysis': 'Rakip Analizi',
    'reports': 'Raporlar',
    'pricing': 'Fiyatlandırma',
    'education': 'Eğitim Merkezi',
    'contact': 'İletişim',
    'seo-task-manager': 'SEO Görev Yöneticisi',
    'content-calendar': 'İçerik Takvimi',
    'keyword-difficulty-matrix': 'Anahtar Kelime Zorluk Matrisi',
    'semantic-analysis': 'Semantik Analiz',
    'trend-forecasting': 'Trend Tahmini',
    'user-behavior-insights': 'Kullanıcı Davranış Analizi',
    'keyword-volatility': 'Anahtar Kelime Volatilitesi',
    'admin-panel': 'Yönetim Paneli',
    'settings': 'Ayarlar',
    'profile': 'Profil',
    
    // Navigation Sections
    'main-tools': 'Ana Araçlar',
    'advanced-tools': 'Gelişmiş Araçlar',
    'ai-insights': 'AI Görüşler',
    'business': 'İş',
    'system': 'Sistem',
    
    // Common
    'loading': 'Yükleniyor...',
    'save': 'Kaydet',
    'cancel': 'İptal',
    'delete': 'Sil',
    'edit': 'Düzenle',
    'add': 'Ekle',
    'search': 'Ara',
    'filter': 'Filtrele',
    'export': 'Dışa Aktar',
    'import': 'İçe Aktar',
    'submit': 'Gönder',
    'back': 'Geri',
    'next': 'İleri',
    'previous': 'Önceki',
    'close': 'Kapat',
    'confirm': 'Onayla',
    'yes': 'Evet',
    'no': 'Hayır',
    'today': 'Bugün',
    'day': 'Gün',
    'week': 'Hafta',
    'month': 'Ay',
    'year': 'Yıl',
    'upgrade-now': 'Şimdi Yükselt',
    'maybe-later': 'Belki Sonra',
    'view-details': 'Detayları Görüntüle',
    'hide-details': 'Detayları Gizle',
    'mark-complete': 'Tamamlandı Olarak İşaretle',
    'auto-generate-tasks': 'Otomatik Görev Oluştur',
    'accept-tasks': 'Görevleri Kabul Et',
    'reject-tasks': 'Görevleri Reddet',
    'analyze': 'Analiz Et',
    'optimize': 'Optimize Et',
    'generate': 'Oluştur',
    'create': 'Yarat',
    'update': 'Güncelle',
    'refresh': 'Yenile',
    'preview': 'Önizleme',
    'download': 'İndir',
    'share': 'Paylaş',
    'copy': 'Kopyala',
    'paste': 'Yapıştır',
    'duplicate': 'Çoğalt',
    'remove': 'Kaldır',
    'clear': 'Temizle',
    'reset': 'Sıfırla',
    'apply': 'Uygula',
    'start': 'Başlat',
    'stop': 'Durdur',
    'pause': 'Duraklat',
    'resume': 'Devam Et',
    'complete': 'Tamamla',
    'pending': 'Beklemede',
    'active': 'Aktif',
    'inactive': 'Pasif',
    'enabled': 'Etkin',
    'disabled': 'Devre Dışı',
    'online': 'Çevrimiçi',
    'offline': 'Çevrimdışı',
    'available': 'Mevcut',
    'unavailable': 'Mevcut Değil',
    'success': 'Başarılı',
    'error': 'Hata',
    'warning': 'Uyarı',
    'info': 'Bilgi',
    'high': 'Yüksek',
    'medium': 'Orta',
    'low': 'Düşük',
    'critical': 'Kritik',
    'important': 'Önemli',
    'minor': 'Küçük',
    'urgent': 'Acil',
    'normal': 'Normal',
    'new': 'Yeni',
    'updated': 'Güncellendi',
    'draft': 'Taslak',
    'published': 'Yayınlandı',
    'archived': 'Arşivlendi',
    'scheduled': 'Planlandı',
    'processing': 'İşleniyor',
    'completed': 'Tamamlandı',
    'failed': 'Başarısız',
    'cancelled': 'İptal Edildi',
    
    // Authentication
    'login': 'Giriş',
    'register': 'Kayıt',
    'logout': 'Çıkış',
    'sign-in': 'Giriş Yap',
    'sign-up': 'Kayıt Ol',
    'sign-out': 'Çıkış Yap',
    'forgot-password': 'Şifremi Unuttum',
    'reset-password': 'Şifre Sıfırla',
    'remember-me': 'Beni hatırla',
    'email': 'E-posta',
    'password': 'Şifre',
    'confirm-password': 'Şifreyi Onayla',
    'name': 'İsim',
    'full-name': 'Ad Soyad',
    'email-address': 'E-posta Adresi',
    'create-account': 'Hesap Oluştur',
    'already-have-account': 'Zaten hesabınız var mı?',
    'dont-have-account': 'Hesabınız yok mu?',
    'send-reset-link': 'Sıfırlama Bağlantısı Gönder',
    'back-to-login': 'Girişe Dön',
    
    // Dashboard
    'welcome-back': 'Tekrar hoş geldiniz',
    'welcome-to-platform': 'Workexe SEO Check\'e Hoş Geldiniz',
    'about-us': 'Hakkımızda',
    'what-we-do': 'Ne Yapıyoruz',
    'overview': 'Genel Bakış',
    'recent-activity': 'Son Aktiviteler',
    'quick-stats': 'Hızlı İstatistikler',
    'quick-actions': 'Hızlı İşlemler',
    'get-started': 'Başlayın',
    'quick-start-guide': 'Hızlı Başlangıç Kılavuzu',
    'tutorial-links': 'Eğitim Bağlantıları',
    'traffic-overview': 'Trafik Genel Bakış',
    'personalized-recommendations': 'Kişiselleştirilmiş Öneriler',
    
    // Header
    'search-placeholder': 'Modüller, görevler, anahtar kelimeler ara...',
    'global-search-placeholder': 'Herhangi bir şey ara... (Ctrl+K)',
    'change-language': 'Dil Değiştir',
    'toggle-theme': 'Tema Değiştir',
    'notifications': 'Bildirimler',
    'search-results': 'Arama Sonuçları',
    'what-is': 'Nedir',
    'where-is': 'Nerede',
    'no-results': 'Sonuç bulunamadı',
    
    // Pricing
    'free-plan': 'Ücretsiz Plan',
    'starter-plan': 'Başlangıç Planı',
    'professional-plan': 'Profesyonel Plan',
    'enterprise-plan': 'Özel Plan',
    'current-plan': 'Mevcut Plan',
    'upgrade': 'Yükselt',
    'downgrade': 'Düşür',
    'plan': 'Plan',
    'monthly': 'Aylık',
    'yearly': 'Yıllık',
    'choose-plan': 'Plan Seç',
    'contact-us': 'Bize Ulaşın',
    'most-popular': 'En Popüler',
    'coming-soon': 'Yakında',
    'join-waitlist': 'Bekleme Listesine Katıl',
    'notify-me': 'Beni Bilgilendir',
    'add-ons-available': 'Ek Özellikler Mevcut',
    'advanced-reports-addon': 'Gelişmiş Raporlar (+$20)',
    'api-access-addon': 'API Erişimi (+$10)',
    'white-label-addon': 'Beyaz Etiket (+$15)',
    'all-addons-included': 'Tüm ek özellikler dahil',
    'premium-features': 'Premium özellikler açık',
    
    // Features
    'projects': 'Projeler',
    'keyword-tracking': 'Anahtar Kelime Takibi',
    'site-audits': 'Site Denetimleri',
    'basic-reports': 'Temel Raporlar',
    'advanced-reports': 'Gelişmiş Raporlar',
    'white-label-reports': 'Beyaz Etiket Raporlar',
    'api-access': 'API Erişimi',
    'priority-support': 'Öncelikli Destek',
    'phone-support': 'Telefon Desteği',
    'email-support': 'E-posta Desteği',
    'unlimited': 'Sınırsız',
    
    // Contact
    'phone': 'Telefon',
    'contact-form': 'İletişim Formu',
    'social-media': 'Sosyal Medya',
    'get-in-touch': 'İletişime Geçin',
    'send-message': 'Mesaj Gönder',
    'message': 'Mesaj',
    'subject': 'Konu',
    
    // Education
    'tutorials': 'Eğitimler',
    'best-practices': 'En İyi Uygulamalar',
    'video-tutorials': 'Video Eğitimleri',
    'documentation': 'Dokümantasyon',
    'faq': 'SSS',
    'help-center': 'Yardım Merkezi',
    'turkish-content': 'Türkçe İçerik',
    'english-content': 'İngilizce İçerik',
    'seo-basics': 'SEO Temelleri',
    'technical-seo': 'Teknik SEO',
    'content-marketing': 'İçerik Pazarlama',
    'link-building': 'Link Kurma',
    'add-to-favorites': 'Favorilere Ekle',
    'remove-from-favorites': 'Favorilerden Çıkar',
    'duration': 'Süre',
    'search-content': 'İçerik ara...',
    
    // Settings
    'general-settings': 'Genel Ayarlar',
    'default-project-settings': 'Varsayılan Proje Ayarları',
    'default-country': 'Varsayılan Ülke',
    'default-currency': 'Varsayılan Para Birimi',
    'default-language': 'Varsayılan Dil',
    'timezone': 'Saat Dilimi',
    'currency-settings': 'Para Birimi Ayarları',
    'select-currency': 'Para Birimi Seç',
    'bulk-update-projects': 'Toplu Proje Güncelleme',
    'update-existing-projects': 'Mevcut Projeleri Güncelle',
    
    // Breadcrumbs
    'home': 'Ana Sayfa',
    'keyword-analysis': 'Anahtar Kelime Analizi',
    'audit-results': 'Denetim Sonuçları',
    'content-optimization': 'İçerik Optimizasyonu',
    'ranking-overview': 'Sıralama Genel Bakış',
    'link-profile': 'Link Profili',
    'competitor-insights': 'Rakip Görüşleri',
    'report-builder': 'Rapor Oluşturucu',
    
    // Calendar Views
    'calendar-view': 'Takvim Görünümü',
    'day-view': 'Gün Görünümü',
    'week-view': 'Hafta Görünümü',
    'month-view': 'Ay Görünümü',
    'previous-period': 'Önceki',
    'next-period': 'Sonraki',
    'go-to-today': 'Bugüne Git',
    
    // Task Manager
    'task-created-from-audit': 'Denetimden oluşturulan görev',
    'audit-recommendation': 'Denetim Önerisi',
    'estimated-time': 'Tahmini Süre',
    'effort-level': 'Çaba Seviyesi',
    'task-priority': 'Görev Önceliği',
    'how-to-fix': 'Nasıl Düzeltilir',
    'affected-pages': 'Etkilenen Sayfalar',
    
    // Keyword Matrix
    'difficulty-vs-opportunity': 'Zorluk vs Fırsat',
    'search-volume': 'Arama Hacmi',
    'keyword-difficulty': 'Anahtar Kelime Zorluğu',
    'opportunity-score': 'Fırsat Puanı',
    'competition-level': 'Rekabet Seviyesi',
    'keyword-details': 'Anahtar Kelime Detayları',
    
    // Limits and Upgrades
    'limit-exceeded': 'Limit Aşıldı',
    'daily-limit-reached': 'Günlük limit doldu',
    'monthly-limit-reached': 'Aylık limit doldu',
    'upgrade-for-more': 'Daha fazlası için yükselt',
    'limit-resets-in': 'Limit sıfırlanma süresi',
    'current-usage': 'Mevcut Kullanım',
    'upgrade-benefits': 'Yükseltme Avantajları',
    
    // User Behavior
    'user-behavior-insights': 'Kullanıcı Davranış Analizi',
    'click-bounce-analysis': 'Tıklama-Çıkış Analizi',
    'ctr-vs-ux-conflict': 'CTR vs UX Çakışması',
    'title-content-mismatch': 'Başlık-İçerik Uyumsuzluğu',
    'bounce-rate-correlation': 'Çıkış Oranı Korelasyonu',
    'user-journey-mapping': 'Kullanıcı Yolculuğu Haritası',
    'engagement-metrics': 'Etkileşim Metrikleri',
    'session-analysis': 'Oturum Analizi',
    'conversion-funnel': 'Dönüşüm Hunisi',
    'heat-map-analysis': 'Isı Haritası Analizi',
    'scroll-depth': 'Kaydırma Derinliği',
    'time-on-page': 'Sayfada Geçirilen Süre',
    'exit-rate': 'Çıkış Oranı',
    'page-views': 'Sayfa Görüntüleme',
    'unique-visitors': 'Benzersiz Ziyaretçi',
    'returning-visitors': 'Geri Dönen Ziyaretçi',
    'new-visitors': 'Yeni Ziyaretçi',
    'device-breakdown': 'Cihaz Dağılımı',
    'browser-analysis': 'Tarayıcı Analizi',
    'geographic-distribution': 'Coğrafi Dağılım',
    'traffic-sources': 'Trafik Kaynakları',
    'referral-analysis': 'Yönlendirme Analizi',
    'social-media-traffic': 'Sosyal Medya Trafiği',
    'direct-traffic': 'Doğrudan Trafik',
    'organic-traffic': 'Organik Trafik',
    'paid-traffic': 'Ücretli Trafik',
    
    // Keyword Volatility
    'keyword-volatility': 'Anahtar Kelime Volatilitesi',
    'volatility-protection': 'Volatilite Koruması',
    'volatility-insurance': 'Volatilite Sigortası',
    'risk-assessment': 'Risk Değerlendirmesi',
    'backup-keywords': 'Yedek Anahtar Kelimeler',
    'hedge-strategy': 'Hedge Stratejisi',
    'traffic-diversification': 'Trafik Çeşitlendirmesi',
    'volume-stability': 'Hacim Kararlılığı',
    'ranking-stability': 'Sıralama Kararlılığı',
    'seasonal-patterns': 'Mevsimsel Desenler',
    'trend-analysis': 'Trend Analizi',
    'volatility-score': 'Volatilite Puanı',
    'stability-index': 'Kararlılık Endeksi',
    'risk-level': 'Risk Seviyesi',
    'contingency-plan': 'Acil Durum Planı',
    'alternative-keywords': 'Alternatif Anahtar Kelimeler',
    'keyword-portfolio': 'Anahtar Kelime Portföyü',
    'diversification-score': 'Çeşitlendirme Puanı',
    'risk-mitigation': 'Risk Azaltma',
    'volume-fluctuation': 'Hacim Dalgalanması',
    'competition-changes': 'Rekabet Değişiklikleri',
    'serp-volatility': 'SERP Volatilitesi',
    'algorithm-impact': 'Algoritma Etkisi',
    'market-trends': 'Pazar Trendleri',
    'industry-shifts': 'Sektör Değişimleri',
    'consumer-behavior': 'Tüketici Davranışı',
    'economic-factors': 'Ekonomik Faktörler',
    'seasonal-adjustments': 'Mevsimsel Ayarlamalar',
    'forecast-accuracy': 'Tahmin Doğruluğu',
    'prediction-confidence': 'Tahmin Güveni',
    
    // Errors
    'error': 'Hata',
    'something-went-wrong': 'Bir şeyler yanlış gitti',
    'page-not-found': 'Sayfa bulunamadı',
    'access-denied': 'Erişim reddedildi',
    'invalid-credentials': 'Geçersiz kimlik bilgileri',
    'required-field': 'Bu alan zorunludur',
    'invalid-email': 'Lütfen geçerli bir e-posta adresi girin',
    'password-too-short': 'Şifre en az 8 karakter olmalıdır',
    'passwords-dont-match': 'Şifreler eşleşmiyor',
    
    // Success Messages
    'task-completed': 'Görev başarıyla tamamlandı',
    'audit-completed': 'Denetim başarıyla tamamlandı',
    'settings-saved': 'Ayarlar başarıyla kaydedildi',
    'profile-updated': 'Profil başarıyla güncellendi',
    'keyword-added': 'Anahtar kelime başarıyla eklendi',
    'language-changed': 'Dil başarıyla değiştirildi',
    'currency-updated': 'Para birimi başarıyla güncellendi',

    // Content Analysis
    'content-quality': 'İçerik Kalitesi',
    'intent-fit-score': 'Niyet Uyum Puanı',
    'crawl-rank-timeline': 'Tarama-Sıralama Zaman Çizelgesi',
    'eat-analysis': 'E-E-A-T Analizi',
    'clarity-builder': 'İçerik Netliği Oluşturucu',
    'cannibalization': 'Semantik Yamyamlık',
    'nlp-engagement': 'NLP Etkileşim Artırıcı',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem('language');
    return (stored as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    
    // Set RTL direction for future RTL languages
    if (language === 'ar' || language === 'he') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const formatCurrency = (amount: number, currency: string = 'USD'): string => {
    if (amount === null || amount === undefined) {
      return language === 'en' ? 'Custom' : 'Özel';
    }
    
    const currencyMap: Record<string, { symbol: string, rate: number }> = {
      'USD': { symbol: '$', rate: 1 },
      'EUR': { symbol: '€', rate: 0.87 },  // 1 USD = 0.87 EUR
      'GBP': { symbol: '£', rate: 0.73 },  // 1 USD = 0.73 GBP
      'TRY': { symbol: '₺', rate: 20 }     // 1 USD = 20 TRY
    };

    const { symbol } = currencyMap[currency] || currencyMap['USD'];
    
    // Format based on language and currency
    if (language === 'tr') {
      // Turkish formatting: 1.234,56 ₺
      const formattedAmount = new Intl.NumberFormat('tr-TR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      }).format(amount);
      
      return `${formattedAmount} ${symbol}`;
    } else {
      // English formatting: $1,234.56
      const formattedAmount = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      }).format(amount);
      
      return `${symbol}${formattedAmount}`;
    }
  };

  const formatDate = (date: Date): string => {
    if (language === 'tr') {
      return date.toLocaleDateString('tr-TR');
    }
    return date.toLocaleDateString('en-US');
  };

  const formatNumber = (num: number): string => {
    if (language === 'tr') {
      return num.toLocaleString('tr-TR');
    }
    return num.toLocaleString('en-US');
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      t, 
      formatCurrency, 
      formatDate, 
      formatNumber 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;