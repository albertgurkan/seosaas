import React, { useState } from 'react';
import { Save, Bell, Shield, Globe, Palette, Database, DollarSign, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const SettingsPage: React.FC = () => {
  const { t, language, setLanguage, formatCurrency } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    defaultCountry: 'US',
    defaultCurrency: 'USD',
    defaultLanguage: language,
    timezone: 'UTC',
    currency: 'USD'
  });

  const tabs = [
    { id: 'general', label: t('general-settings'), icon: Globe },
    { id: 'defaults', label: t('default-project-settings'), icon: MapPin },
    { id: 'currency', label: t('currency-settings'), icon: DollarSign },
    { id: 'notifications', label: language === 'en' ? 'Notifications' : 'Bildirimler', icon: Bell },
    { id: 'security', label: language === 'en' ? 'Security' : 'Güvenlik', icon: Shield },
    { id: 'appearance', label: language === 'en' ? 'Appearance' : 'Görünüm', icon: Palette },
    { id: 'data', label: language === 'en' ? 'Data & Privacy' : 'Veri ve Gizlilik', icon: Database }
  ];

  const countries = [
    { code: 'US', name: language === 'en' ? 'United States' : 'Amerika Birleşik Devletleri' },
    { code: 'GB', name: language === 'en' ? 'United Kingdom' : 'Birleşik Krallık' },
    { code: 'DE', name: language === 'en' ? 'Germany' : 'Almanya' },
    { code: 'FR', name: language === 'en' ? 'France' : 'Fransa' },
    { code: 'TR', name: language === 'en' ? 'Turkey' : 'Türkiye' },
    { code: 'CA', name: language === 'en' ? 'Canada' : 'Kanada' },
    { code: 'AU', name: language === 'en' ? 'Australia' : 'Avustralya' }
  ];

  const currencies = [
    { code: 'USD', name: language === 'en' ? 'US Dollar' : 'ABD Doları', symbol: '$' },
    { code: 'EUR', name: language === 'en' ? 'Euro' : 'Euro', symbol: '€' },
    { code: 'GBP', name: language === 'en' ? 'British Pound' : 'İngiliz Sterlini', symbol: '£' },
    { code: 'TRY', name: language === 'en' ? 'Turkish Lira' : 'Türk Lirası', symbol: '₺' }
  ];

  const timezones = [
    { value: 'UTC', label: 'UTC' },
    { value: 'America/New_York', label: language === 'en' ? 'Eastern Time (ET)' : 'Doğu Saati (ET)' },
    { value: 'America/Chicago', label: language === 'en' ? 'Central Time (CT)' : 'Merkez Saati (CT)' },
    { value: 'America/Denver', label: language === 'en' ? 'Mountain Time (MT)' : 'Dağ Saati (MT)' },
    { value: 'America/Los_Angeles', label: language === 'en' ? 'Pacific Time (PT)' : 'Pasifik Saati (PT)' },
    { value: 'Europe/London', label: language === 'en' ? 'London (GMT)' : 'Londra (GMT)' },
    { value: 'Europe/Paris', label: language === 'en' ? 'Paris (CET)' : 'Paris (CET)' },
    { value: 'Europe/Istanbul', label: language === 'en' ? 'Istanbul (TRT)' : 'İstanbul (TRT)' },
    { value: 'Asia/Tokyo', label: language === 'en' ? 'Tokyo (JST)' : 'Tokyo (JST)' },
    { value: 'Australia/Sydney', label: language === 'en' ? 'Sydney (AEDT)' : 'Sidney (AEDT)' }
  ];

  const handleSave = () => {
    toast.success(t('settings-saved'), { duration: 1000 });
  };

  const handleBulkUpdate = () => {
    toast.success(language === 'en' ? 'Projects updated with new defaults' : 'Projeler yeni varsayılanlarla güncellendi', { duration: 1000 });
  };

  const updateSetting = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('general-settings')}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('default-language')}
                  </label>
                  <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as 'en' | 'tr')}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="en">English</option>
                    <option value="tr">Türkçe</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('timezone')}
                  </label>
                  <select 
                    value={settings.timezone}
                    onChange={(e) => updateSetting('timezone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    {timezones.map(tz => (
                      <option key={tz.value} value={tz.value}>{tz.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'en' ? 'Date Format' : 'Tarih Formatı'}
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'defaults':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('default-project-settings')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                {language === 'en'
                  ? 'These settings will be applied to new projects automatically.'
                  : 'Bu ayarlar yeni projelere otomatik olarak uygulanacaktır.'}
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('default-country')}
                  </label>
                  <select 
                    value={settings.defaultCountry}
                    onChange={(e) => updateSetting('defaultCountry', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    {countries.map(country => (
                      <option key={country.code} value={country.code}>{country.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('default-currency')}
                  </label>
                  <select 
                    value={settings.defaultCurrency}
                    onChange={(e) => updateSetting('defaultCurrency', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    {currencies.map(currency => (
                      <option key={currency.code} value={currency.code}>
                        {currency.name} ({currency.symbol})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('default-language')}
                  </label>
                  <select 
                    value={settings.defaultLanguage}
                    onChange={(e) => updateSetting('defaultLanguage', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="en">English</option>
                    <option value="tr">Türkçe</option>
                  </select>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={handleBulkUpdate}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {t('update-existing-projects')}
                  </button>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {language === 'en'
                      ? 'Apply these defaults to all existing projects'
                      : 'Bu varsayılanları tüm mevcut projelere uygulayın'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'currency':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('currency-settings')}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('select-currency')}
                  </label>
                  <select 
                    value={settings.currency}
                    onChange={(e) => updateSetting('currency', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    {currencies.map(currency => (
                      <option key={currency.code} value={currency.code}>
                        {currency.name} ({currency.symbol})
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {language === 'en'
                      ? 'This will update all pricing displays throughout the platform'
                      : 'Bu, platform genelindeki tüm fiyat görüntülemelerini güncelleyecektir'}
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">{language === 'en' ? 'Currency Preview' : 'Para Birimi Önizleme'}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Starter Plan:' : 'Başlangıç Planı:'}</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {formatCurrency(19, settings.currency)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Professional Plan:' : 'Profesyonel Plan:'}</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {formatCurrency(39, settings.currency)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{language === 'en' ? 'Notification Preferences' : 'Bildirim Tercihleri'}</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">{language === 'en' ? 'Email Notifications' : 'E-posta Bildirimleri'}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Receive email updates about your SEO performance' : 'SEO performansınız hakkında e-posta güncellemeleri alın'}</p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">{language === 'en' ? 'Ranking Alerts' : 'Sıralama Uyarıları'}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Get notified when your rankings change significantly' : 'Sıralamalarınız önemli ölçüde değiştiğinde bildirim alın'}</p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">{language === 'en' ? 'Weekly Reports' : 'Haftalık Raporlar'}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Receive weekly SEO performance summaries' : 'Haftalık SEO performans özetleri alın'}</p>
                  </div>
                  <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">{language === 'en' ? 'Security Alerts' : 'Güvenlik Uyarıları'}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Important security and account notifications' : 'Önemli güvenlik ve hesap bildirimleri'}</p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{language === 'en' ? 'Security Settings' : 'Güvenlik Ayarları'}</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">{language === 'en' ? 'Change Password' : 'Şifre Değiştir'}</h4>
                  <div className="space-y-3">
                    <input
                      type="password"
                      placeholder={language === 'en' ? 'Current password' : 'Mevcut şifre'}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                    <input
                      type="password"
                      placeholder={language === 'en' ? 'New password' : 'Yeni şifre'}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                    <input
                      type="password"
                      placeholder={language === 'en' ? 'Confirm new password' : 'Yeni şifreyi onayla'}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">{language === 'en' ? 'Two-Factor Authentication' : 'İki Faktörlü Kimlik Doğrulama'}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Add an extra layer of security to your account' : 'Hesabınıza ekstra bir güvenlik katmanı ekleyin'}</p>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    {language === 'en' ? 'Enable' : 'Etkinleştir'}
                  </button>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">{language === 'en' ? 'Active Sessions' : 'Aktif Oturumlar'}</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{language === 'en' ? 'Current Session' : 'Mevcut Oturum'}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{language === 'en' ? 'Chrome on Windows • Active now' : 'Windows\'ta Chrome • Şu anda aktif'}</p>
                      </div>
                      <span className="text-xs text-green-600 dark:text-green-400">{language === 'en' ? 'Current' : 'Mevcut'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{language === 'en' ? 'Appearance Settings' : 'Görünüm Ayarları'}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'en' ? 'Theme' : 'Tema'}
                  </label>
                  <div className="flex space-x-3">
                    <button
                      onClick={theme === 'dark' ? toggleTheme : undefined}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        theme === 'light'
                          ? 'bg-blue-50 border-blue-200 text-blue-700'
                          : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      {language === 'en' ? 'Light' : 'Açık'}
                    </button>
                    <button
                      onClick={theme === 'light' ? toggleTheme : undefined}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        theme === 'dark'
                          ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900 dark:border-blue-600 dark:text-blue-300'
                          : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      {language === 'en' ? 'Dark' : 'Koyu'}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'en' ? 'Sidebar Behavior' : 'Kenar Çubuğu Davranışı'}
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                    <option value="expanded">{language === 'en' ? 'Always Expanded' : 'Her Zaman Genişletilmiş'}</option>
                    <option value="collapsed">{language === 'en' ? 'Always Collapsed' : 'Her Zaman Daraltılmış'}</option>
                    <option value="auto">{language === 'en' ? 'Auto (Remember State)' : 'Otomatik (Durumu Hatırla)'}</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">{language === 'en' ? 'Compact Mode' : 'Kompakt Mod'}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Use smaller spacing and elements' : 'Daha küçük boşluklar ve öğeler kullanın'}</p>
                  </div>
                  <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'data':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{language === 'en' ? 'Data & Privacy' : 'Veri ve Gizlilik'}</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">{language === 'en' ? 'Data Export' : 'Veri Dışa Aktarma'}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {language === 'en'
                      ? 'Download all your data including keywords, rankings, and reports'
                      : 'Anahtar kelimeler, sıralamalar ve raporlar dahil tüm verilerinizi indirin'}
                  </p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    {language === 'en' ? 'Export Data' : 'Verileri Dışa Aktar'}
                  </button>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">{language === 'en' ? 'Data Retention' : 'Veri Saklama'}</h4>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                    <option value="1year">{language === 'en' ? '1 Year' : '1 Yıl'}</option>
                    <option value="2years">{language === 'en' ? '2 Years' : '2 Yıl'}</option>
                    <option value="5years">{language === 'en' ? '5 Years' : '5 Yıl'}</option>
                    <option value="forever">{language === 'en' ? 'Forever' : 'Süresiz'}</option>
                  </select>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h4 className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">{language === 'en' ? 'Danger Zone' : 'Tehlikeli Bölge'}</h4>
                  <div className="space-y-3">
                    <button className="px-4 py-2 border border-red-300 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm">
                      {language === 'en' ? 'Clear All Data' : 'Tüm Verileri Temizle'}
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                      {language === 'en' ? 'Delete Account' : 'Hesabı Sil'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('settings')}</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {language === 'en'
            ? 'Manage your account settings and preferences'
            : 'Hesap ayarlarınızı ve tercihlerinizi yönetin'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            {renderTabContent()}
            
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleSave}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                {language === 'en' ? 'Save Changes' : 'Değişiklikleri Kaydet'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;