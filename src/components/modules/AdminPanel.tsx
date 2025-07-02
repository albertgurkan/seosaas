import React, { useState } from 'react';
import { Users, Settings, BarChart3, CreditCard, Shield, Globe, UserCog, Database, Server, Lock, Key, FileText, AlertTriangle, CheckCircle, Clock, Zap } from 'lucide-react';
import { mockPricingPlans } from '../../data/mockData';
import { useLanguage } from '../../contexts/LanguageContext';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('users');
  const { language, formatCurrency } = useLanguage();

  const tabs = [
    { id: 'users', label: language === 'en' ? 'User Management' : 'Kullanıcı Yönetimi', icon: Users },
    { id: 'pricing', label: language === 'en' ? 'Pricing Plans' : 'Fiyatlandırma Planları', icon: CreditCard },
    { id: 'analytics', label: language === 'en' ? 'Analytics' : 'Analitik', icon: BarChart3 },
    { id: 'security', label: language === 'en' ? 'Security' : 'Güvenlik', icon: Shield },
    { id: 'system', label: language === 'en' ? 'System Settings' : 'Sistem Ayarları', icon: Settings },
    { id: 'localization', label: language === 'en' ? 'Localization' : 'Yerelleştirme', icon: Globe }
  ];

  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', plan: 'pro', status: 'active', joined: '2024-01-15', sites: ['example.com', 'johndoe.com'], keywords: 87, audits: 8 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', plan: 'business', status: 'active', joined: '2024-01-10', sites: ['janesmith.com', 'janeblog.com', 'janeportfolio.com'], keywords: 342, audits: 24 },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', plan: 'free', status: 'inactive', joined: '2024-01-20', sites: ['mikejohnson.com'], keywords: 3, audits: 1 }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'users':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">1,247</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Total Users' : 'Toplam Kullanıcı'}</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">892</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Active Users' : 'Aktif Kullanıcı'}</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">456</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Paid Users' : 'Ücretli Kullanıcı'}</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">$12,450</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Monthly Revenue' : 'Aylık Gelir'}</div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{language === 'en' ? 'User Management' : 'Kullanıcı Yönetimi'}</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{language === 'en' ? 'Name' : 'İsim'}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{language === 'en' ? 'Email' : 'E-posta'}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{language === 'en' ? 'Plan' : 'Plan'}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{language === 'en' ? 'Status' : 'Durum'}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{language === 'en' ? 'Joined' : 'Katılma'}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{language === 'en' ? 'Sites' : 'Siteler'}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{language === 'en' ? 'Usage' : 'Kullanım'}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{language === 'en' ? 'Actions' : 'İşlemler'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {mockUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                            user.plan === 'free' ? 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300' :
                            user.plan === 'pro' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                            'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                          }`}>
                            {user.plan === 'free' ? (language === 'en' ? 'Free' : 'Ücretsiz') : 
                             user.plan === 'pro' ? (language === 'en' ? 'Starter' : 'Başlangıç') : 
                             user.plan === 'business' ? (language === 'en' ? 'Professional' : 'Profesyonel') : 
                             (language === 'en' ? 'Custom' : 'Özel')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.status === 'active' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                          }`}>
                            {user.status === 'active' ? (language === 'en' ? 'active' : 'aktif') : (language === 'en' ? 'inactive' : 'pasif')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {new Date(user.joined).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          <div className="flex flex-col space-y-1">
                            {user.sites.map((site, idx) => (
                              <span key={idx} className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                                {site}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          <div className="flex flex-col space-y-1">
                            <span>{language === 'en' ? 'Keywords:' : 'Anahtar Kelimeler:'} {user.keywords}</span>
                            <span>{language === 'en' ? 'Audits:' : 'Denetimler:'} {user.audits}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 dark:text-blue-400 hover:underline">{language === 'en' ? 'Edit' : 'Düzenle'}</button>
                            <button className="text-red-600 dark:text-red-400 hover:underline">{language === 'en' ? 'Suspend' : 'Askıya Al'}</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'pricing':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockPricingPlans.map((plan) => (
                <div key={plan.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      {plan.id === 'free' ? (language === 'en' ? 'Free' : 'Ücretsiz') : plan.id === 'agency' ? (language === 'en' ? 'Custom' : 'Özel') : (
                        <>
                          {plan.id === 'pro' ? 
                            formatCurrency(plan.price || 0, 'USD') : 
                            formatCurrency(plan.price || 0, 'USD')}
                          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">/{language === 'en' ? 'month' : 'ay'}</span>
                        </>
                      )}
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
                      {plan.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      {language === 'en' ? 'Edit Plan' : 'Planı Düzenle'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">98.5%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'System Uptime' : 'Sistem Çalışma Süresi'}</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">1.2M</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'API Requests/day' : 'API İstekleri/gün'}</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">45TB</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Data Processed' : 'İşlenen Veri'}</div>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            {/* Security Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">92</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Security Score' : 'Güvenlik Puanı'}</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">3</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Active Threats' : 'Aktif Tehditler'}</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">24</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Failed Login Attempts' : 'Başarısız Giriş Denemeleri'}</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">156</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Active Sessions' : 'Aktif Oturumlar'}</div>
              </div>
            </div>

            {/* Authentication Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center mb-4">
                <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{language === 'en' ? 'Authentication Settings' : 'Kimlik Doğrulama Ayarları'}</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{language === 'en' ? 'Two-Factor Authentication' : 'İki Faktörlü Kimlik Doğrulama'}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Require 2FA for all admin accounts' : 'Tüm yönetici hesapları için 2FA gerektir'}</p>
                  </div>
                  <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer">
                    <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform translate-x-6"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{language === 'en' ? 'Password Requirements' : 'Şifre Gereksinimleri'}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Minimum 12 characters with special characters' : 'Özel karakterlerle minimum 12 karakter'}</p>
                  </div>
                  <div className="relative inline-block w-12 h-6 rounded-full bg-green-500 cursor-pointer">
                    <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform translate-x-6"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{language === 'en' ? 'Session Timeout' : 'Oturum Zaman Aşımı'}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Automatically log out inactive users' : 'Aktif olmayan kullanıcıları otomatik olarak çıkış yaptır'}</p>
                  </div>
                  <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm">
                    <option value="15">15 {language === 'en' ? 'minutes' : 'dakika'}</option>
                    <option value="30">30 {language === 'en' ? 'minutes' : 'dakika'}</option>
                    <option value="60">1 {language === 'en' ? 'hour' : 'saat'}</option>
                    <option value="120">2 {language === 'en' ? 'hours' : 'saat'}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* API Security */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center mb-4">
                <Key className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{language === 'en' ? 'API Security' : 'API Güvenliği'}</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{language === 'en' ? 'Rate Limiting' : 'Oran Sınırlaması'}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Limit API requests per user' : 'Kullanıcı başına API isteklerini sınırla'}</p>
                  </div>
                  <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm">
                    <option value="100">100 {language === 'en' ? 'requests/min' : 'istek/dk'}</option>
                    <option value="500">500 {language === 'en' ? 'requests/min' : 'istek/dk'}</option>
                    <option value="1000">1000 {language === 'en' ? 'requests/min' : 'istek/dk'}</option>
                    <option value="unlimited">{language === 'en' ? 'Unlimited' : 'Sınırsız'}</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{language === 'en' ? 'JWT Token Expiration' : 'JWT Token Süresi'}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Set token lifetime' : 'Token ömrünü ayarla'}</p>
                  </div>
                  <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm">
                    <option value="1h">1 {language === 'en' ? 'hour' : 'saat'}</option>
                    <option value="24h">24 {language === 'en' ? 'hours' : 'saat'}</option>
                    <option value="7d">7 {language === 'en' ? 'days' : 'gün'}</option>
                    <option value="30d">30 {language === 'en' ? 'days' : 'gün'}</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{language === 'en' ? 'CORS Configuration' : 'CORS Yapılandırması'}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Manage allowed origins' : 'İzin verilen kökenleri yönet'}</p>
                  </div>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm">
                    {language === 'en' ? 'Configure' : 'Yapılandır'}
                  </button>
                </div>
              </div>
            </div>

            {/* Security Logs */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{language === 'en' ? 'Security Logs' : 'Güvenlik Kayıtları'}</h3>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">{language === 'en' ? 'Timestamp' : 'Zaman Damgası'}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">{language === 'en' ? 'Event' : 'Olay'}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">{language === 'en' ? 'User' : 'Kullanıcı'}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">{language === 'en' ? 'IP Address' : 'IP Adresi'}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">{language === 'en' ? 'Status' : 'Durum'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {[
                      { time: '2024-05-15 14:23:45', event: language === 'en' ? 'Login attempt' : 'Giriş denemesi', user: 'admin@workexe.co', ip: '192.168.1.1', status: language === 'en' ? 'success' : 'başarılı' },
                      { time: '2024-05-15 13:45:12', event: language === 'en' ? 'Password change' : 'Şifre değişikliği', user: 'john@example.com', ip: '192.168.1.2', status: language === 'en' ? 'success' : 'başarılı' },
                      { time: '2024-05-15 12:32:18', event: language === 'en' ? 'Login attempt' : 'Giriş denemesi', user: 'unknown@example.com', ip: '192.168.1.3', status: language === 'en' ? 'failed' : 'başarısız' },
                      { time: '2024-05-15 11:15:33', event: language === 'en' ? 'API key generated' : 'API anahtarı oluşturuldu', user: 'jane@example.com', ip: '192.168.1.4', status: language === 'en' ? 'success' : 'başarılı' },
                      { time: '2024-05-15 10:05:22', event: language === 'en' ? 'Login attempt' : 'Giriş denemesi', user: 'mike@example.com', ip: '192.168.1.5', status: language === 'en' ? 'failed' : 'başarısız' }
                    ].map((log, index) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {log.time}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {log.event}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {log.user}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {log.ip}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            log.status === 'success' || log.status === 'başarılı'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                          }`}>
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'localization':
        return (
          <div className="space-y-6">
            {/* Language Management */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center mb-4">
                <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{language === 'en' ? 'Language Management' : 'Dil Yönetimi'}</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">{language === 'en' ? 'Language' : 'Dil'}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">{language === 'en' ? 'Code' : 'Kod'}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">{language === 'en' ? 'Status' : 'Durum'}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">{language === 'en' ? 'Completion' : 'Tamamlanma'}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">{language === 'en' ? 'Actions' : 'İşlemler'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {[
                      { name: language === 'en' ? 'English' : 'İngilizce', code: 'en', status: language === 'en' ? 'active' : 'aktif', completion: 100 },
                      { name: language === 'en' ? 'Turkish' : 'Türkçe', code: 'tr', status: language === 'en' ? 'active' : 'aktif', completion: 95 },
                      { name: language === 'en' ? 'Spanish' : 'İspanyolca', code: 'es', status: language === 'en' ? 'inactive' : 'pasif', completion: 0 },
                      { name: language === 'en' ? 'German' : 'Almanca', code: 'de', status: language === 'en' ? 'inactive' : 'pasif', completion: 0 },
                      { name: language === 'en' ? 'French' : 'Fransızca', code: 'fr', status: language === 'en' ? 'inactive' : 'pasif', completion: 0 }
                    ].map((lang, index) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {lang.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {lang.code}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            lang.status === 'active' || lang.status === 'aktif'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                          }`}>
                            {lang.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mr-2">
                              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${lang.completion}%` }}></div>
                            </div>
                            <span>{lang.completion}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 dark:text-blue-400 hover:underline mr-3">{language === 'en' ? 'Edit' : 'Düzenle'}</button>
                          {lang.status === 'active' || lang.status === 'aktif' ? (
                            <button className="text-red-600 dark:text-red-400 hover:underline">{language === 'en' ? 'Deactivate' : 'Devre Dışı Bırak'}</button>
                          ) : (
                            <button className="text-green-600 dark:text-green-400 hover:underline">{language === 'en' ? 'Activate' : 'Etkinleştir'}</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  {language === 'en' ? 'Add New Language' : 'Yeni Dil Ekle'}
                </button>
              </div>
            </div>

            {/* Translation Management */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center mb-4">
                <FileText className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{language === 'en' ? 'Translation Management' : 'Çeviri Yönetimi'}</h3>
              </div>
              
              <div className="flex space-x-4 mb-4">
                <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option value="all">{language === 'en' ? 'All Categories' : 'Tüm Kategoriler'}</option>
                  <option value="navigation">{language === 'en' ? 'Navigation' : 'Navigasyon'}</option>
                  <option value="common">{language === 'en' ? 'Common' : 'Ortak'}</option>
                  <option value="auth">{language === 'en' ? 'Authentication' : 'Kimlik Doğrulama'}</option>
                  <option value="dashboard">{language === 'en' ? 'Dashboard' : 'Kontrol Paneli'}</option>
                  <option value="settings">{language === 'en' ? 'Settings' : 'Ayarlar'}</option>
                </select>
                
                <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option value="tr">{language === 'en' ? 'Turkish' : 'Türkçe'}</option>
                  <option value="es">{language === 'en' ? 'Spanish' : 'İspanyolca'}</option>
                  <option value="de">{language === 'en' ? 'German' : 'Almanca'}</option>
                  <option value="fr">{language === 'en' ? 'French' : 'Fransızca'}</option>
                </select>
              </div>
              
              <div className="space-y-4">
                {[
                  { key: 'dashboard', en: 'Dashboard', tr: 'Kontrol Paneli' },
                  { key: 'keywords', en: 'Keywords', tr: 'Anahtar Kelimeler' },
                  { key: 'site-audit', en: 'Site Audit', tr: 'Site Denetimi' },
                  { key: 'content-analysis', en: 'Content Analysis', tr: 'İçerik Analizi' }
                ].map((item, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{language === 'en' ? 'Key' : 'Anahtar'}</label>
                      <div className="text-sm font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">
                        {item.key}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{language === 'en' ? 'English (Source)' : 'İngilizce (Kaynak)'}</label>
                      <div className="text-sm bg-gray-50 dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-700">
                        {item.en}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{language === 'en' ? 'Turkish' : 'Türkçe'}</label>
                      <input 
                        type="text" 
                        value={item.tr}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  {language === 'en' ? 'Reset' : 'Sıfırla'}
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  {language === 'en' ? 'Save Translations' : 'Çevirileri Kaydet'}
                </button>
              </div>
            </div>

            {/* Regional Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center mb-4">
                <Settings className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{language === 'en' ? 'Regional Settings' : 'Bölgesel Ayarlar'}</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'en' ? 'Default Language' : 'Varsayılan Dil'}
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="en">{language === 'en' ? 'English' : 'İngilizce'}</option>
                    <option value="tr">{language === 'en' ? 'Turkish' : 'Türkçe'}</option>
                    <option value="es">{language === 'en' ? 'Spanish' : 'İspanyolca'}</option>
                    <option value="de">{language === 'en' ? 'German' : 'Almanca'}</option>
                    <option value="fr">{language === 'en' ? 'French' : 'Fransızca'}</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'en' ? 'Default Currency' : 'Varsayılan Para Birimi'}
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="TRY">TRY (₺)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'en' ? 'Date Format' : 'Tarih Formatı'}
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'en' ? 'Time Format' : 'Zaman Formatı'}
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="12">{language === 'en' ? '12-hour (AM/PM)' : '12 saat (ÖÖ/ÖS)'}</option>
                    <option value="24">{language === 'en' ? '24-hour' : '24 saat'}</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  {language === 'en' ? 'Save Regional Settings' : 'Bölgesel Ayarları Kaydet'}
                </button>
              </div>
            </div>
          </div>
        );

      case 'system':
        return (
          <div className="space-y-6">
            {/* System Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">v2.4.1</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Current Version' : 'Mevcut Sürüm'}</div>
                  </div>
                  <Server className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">{language === 'en' ? 'Online' : 'Çevrimiçi'}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'System Status' : 'Sistem Durumu'}</div>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">23 {language === 'en' ? 'days' : 'gün'}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Uptime' : 'Çalışma Süresi'}</div>
                  </div>
                  <Clock className="w-8 h-8 text-blue-500" />
                </div>
              </div>
            </div>

            {/* System Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center mb-4">
                <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{language === 'en' ? 'System Configuration' : 'Sistem Yapılandırması'}</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{language === 'en' ? 'Maintenance Mode' : 'Bakım Modu'}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Take the system offline for maintenance' : 'Bakım için sistemi çevrimdışı al'}</p>
                  </div>
                  <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer">
                    <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{language === 'en' ? 'Debug Mode' : 'Hata Ayıklama Modu'}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Enable detailed error reporting' : 'Ayrıntılı hata raporlamayı etkinleştir'}</p>
                  </div>
                  <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer">
                    <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{language === 'en' ? 'Cache Lifetime' : 'Önbellek Ömrü'}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Set how long data is cached' : 'Verilerin ne kadar süre önbelleğe alınacağını ayarla'}</p>
                  </div>
                  <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm">
                    <option value="5">5 {language === 'en' ? 'minutes' : 'dakika'}</option>
                    <option value="15">15 {language === 'en' ? 'minutes' : 'dakika'}</option>
                    <option value="30">30 {language === 'en' ? 'minutes' : 'dakika'}</option>
                    <option value="60">1 {language === 'en' ? 'hour' : 'saat'}</option>
                    <option value="1440">1 {language === 'en' ? 'day' : 'gün'}</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{language === 'en' ? 'Database Backup' : 'Veritabanı Yedekleme'}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Schedule automatic backups' : 'Otomatik yedeklemeleri programla'}</p>
                  </div>
                  <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm">
                    <option value="daily">{language === 'en' ? 'Daily' : 'Günlük'}</option>
                    <option value="weekly">{language === 'en' ? 'Weekly' : 'Haftalık'}</option>
                    <option value="monthly">{language === 'en' ? 'Monthly' : 'Aylık'}</option>
                    <option value="manual">{language === 'en' ? 'Manual Only' : 'Sadece Manuel'}</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  {language === 'en' ? 'Save Settings' : 'Ayarları Kaydet'}
                </button>
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  {language === 'en' ? 'Reset to Defaults' : 'Varsayılanlara Sıfırla'}
                </button>
              </div>
            </div>

            {/* System Maintenance */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center mb-4">
                <Database className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{language === 'en' ? 'System Maintenance' : 'Sistem Bakımı'}</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left">
                  <div className="flex items-center">
                    <Zap className="w-5 h-5 text-yellow-500 mr-2" />
                    <h4 className="font-medium text-gray-900 dark:text-white">{language === 'en' ? 'Clear System Cache' : 'Sistem Önbelleğini Temizle'}</h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {language === 'en' ? 'Purge all cached data to refresh the system' : 'Sistemi yenilemek için tüm önbelleğe alınmış verileri temizle'}
                  </p>
                </button>
                
                <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left">
                  <div className="flex items-center">
                    <Database className="w-5 h-5 text-blue-500 mr-2" />
                    <h4 className="font-medium text-gray-900 dark:text-white">{language === 'en' ? 'Backup Database' : 'Veritabanını Yedekle'}</h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {language === 'en' ? 'Create a manual backup of the database' : 'Veritabanının manuel bir yedeğini oluştur'}
                  </p>
                </button>
                
                <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left">
                  <div className="flex items-center">
                    <AlertTriangle className="w-5 h-5 text-orange-500 mr-2" />
                    <h4 className="font-medium text-gray-900 dark:text-white">{language === 'en' ? 'Run System Diagnostics' : 'Sistem Tanılamasını Çalıştır'}</h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {language === 'en' ? 'Check for potential issues and errors' : 'Potansiyel sorunları ve hataları kontrol et'}
                  </p>
                </button>
                
                <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left">
                  <div className="flex items-center">
                    <UserCog className="w-5 h-5 text-purple-500 mr-2" />
                    <h4 className="font-medium text-gray-900 dark:text-white">{language === 'en' ? 'Rebuild User Permissions' : 'Kullanıcı İzinlerini Yeniden Oluştur'}</h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {language === 'en' ? 'Reset and rebuild all user role permissions' : 'Tüm kullanıcı rolü izinlerini sıfırla ve yeniden oluştur'}
                  </p>
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
            <div className="text-gray-500 dark:text-gray-400">
              {tabs.find(tab => tab.id === activeTab)?.label} {language === 'en' ? 'settings will be implemented here.' : 'ayarları burada uygulanacak.'}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{language === 'en' ? 'Admin Panel' : 'Yönetim Paneli'}</h1>
        <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Manage users, pricing, and system settings' : 'Kullanıcıları, fiyatlandırmayı ve sistem ayarlarını yönetin'}</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div>{renderTabContent()}</div>
    </div>
  );
};

export default AdminPanel;