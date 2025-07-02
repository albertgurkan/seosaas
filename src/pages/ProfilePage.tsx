import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Camera, Save, CreditCard, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional()
});

type ProfileFormData = z.infer<typeof profileSchema>;

const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      company: '',
      website: '',
      bio: ''
    }
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await updateProfile(data);
      setIsEditing(false);
    } catch (error) {
      // Error is handled in the auth context
    }
  };

  const handleUpgradeClick = () => {
    navigate('/pricing');
  };

  // Get the correct plan name based on the user's plan
  const getPlanDisplayName = () => {
    if (!user) return '';
    
    switch (user.plan) {
      case 'free':
        return language === 'en' ? 'Free Plan' : 'Ücretsiz Plan';
      case 'pro':
        return language === 'en' ? 'Starter Plan' : 'Başlangıç Planı';
      case 'business':
      case 'professional':
        return language === 'en' ? 'Professional Plan' : 'Profesyonel Plan';
      case 'enterprise':
      case 'agency':
        return language === 'en' ? 'Custom Plan' : 'Özel Plan';
      default:
        return `${user.plan} Plan`;
    }
  };

  const planFeatures = {
    free: [
      language === 'en' ? '1 project' : '1 proje', 
      language === 'en' ? '3 keyword tracking' : '3 anahtar kelime takibi', 
      language === 'en' ? '1 site audit' : '1 site denetimi', 
      language === 'en' ? 'Basic reports' : 'Temel raporlar'
    ],
    starter: [
      language === 'en' ? '5 projects' : '5 proje', 
      language === 'en' ? '100 keyword tracking' : '100 anahtar kelime takibi', 
      language === 'en' ? '10 site audits' : '10 site denetimi', 
      language === 'en' ? 'Advanced reports' : 'Gelişmiş raporlar'
    ],
    professional: [
      language === 'en' ? '25 projects' : '25 proje', 
      language === 'en' ? '500 keyword tracking' : '500 anahtar kelime takibi', 
      language === 'en' ? 'Unlimited audits' : 'Sınırsız denetim', 
      language === 'en' ? 'White-label reports' : 'Beyaz etiketli raporlar'
    ],
    business: [
      language === 'en' ? '25 projects' : '25 proje', 
      language === 'en' ? '500 keyword tracking' : '500 anahtar kelime takibi', 
      language === 'en' ? 'Unlimited audits' : 'Sınırsız denetim', 
      language === 'en' ? 'White-label reports' : 'Beyaz etiketli raporlar'
    ],
    enterprise: [
      language === 'en' ? 'Unlimited projects' : 'Sınırsız proje', 
      language === 'en' ? 'Unlimited keywords' : 'Sınırsız anahtar kelime', 
      language === 'en' ? 'Custom integrations' : 'Özel entegrasyonlar', 
      language === 'en' ? 'Dedicated support' : 'Özel destek'
    ],
    agency: [
      language === 'en' ? 'Unlimited projects' : 'Sınırsız proje', 
      language === 'en' ? 'Unlimited keywords' : 'Sınırsız anahtar kelime', 
      language === 'en' ? 'Custom integrations' : 'Özel entegrasyonlar', 
      language === 'en' ? 'Dedicated support' : 'Özel destek'
    ]
  };

  // Get the correct plan features based on the user's plan
  const getPlanFeatures = () => {
    if (!user) return planFeatures.free;
    
    switch (user.plan) {
      case 'free':
        return planFeatures.free;
      case 'pro':
        return planFeatures.starter;
      case 'business':
      case 'professional':
        return planFeatures.professional;
      case 'enterprise':
      case 'agency':
        return planFeatures.enterprise;
      default:
        return planFeatures.free;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('profile')}</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {language === 'en' ? 'Manage your profile information and account settings' : 'Profil bilgilerinizi ve hesap ayarlarınızı yönetin'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="text-center">
              <div className="relative inline-block">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto"
                  />
                ) : (
                  <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                    <User className="w-12 h-12 text-white" />
                  </div>
                )}
                <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              
              <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                {user?.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
              
              <div className="mt-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize ${
                  user?.plan === 'free' ? 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300' :
                  user?.plan === 'pro' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                  user?.plan === 'business' || user?.plan === 'professional' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' :
                  'bg-gold-100 text-gold-800 dark:bg-gold-900 dark:text-gold-300'
                }`}>
                  {getPlanDisplayName()}
                </span>
              </div>

              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center justify-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {language === 'en' ? 'Member since' : 'Üyelik başlangıcı'} {user?.createdAt ? new Date(user.createdAt).getFullYear() : '2024'}
                </div>
              </div>
            </div>
          </div>

          {/* Current Plan */}
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">{language === 'en' ? 'Current Plan' : 'Mevcut Plan'}</h4>
              <CreditCard className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="space-y-3">
              <div className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
                {getPlanDisplayName()}
              </div>
              
              <ul className="space-y-2">
                {getPlanFeatures().map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              {user?.plan !== 'enterprise' && user?.plan !== 'agency' && (
                <button 
                  onClick={handleUpgradeClick}
                  className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {t('upgrade')}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {language === 'en' ? 'Profile Information' : 'Profil Bilgileri'}
              </h3>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded-lg transition-colors"
                >
                  {t('edit')}
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('full-name')}
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('email-address')}
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'en' ? 'Company' : 'Şirket'}
                  </label>
                  <input
                    {...register('company')}
                    type="text"
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'en' ? 'Website' : 'Web Sitesi'}
                  </label>
                  <input
                    {...register('website')}
                    type="url"
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500"
                  />
                  {errors.website && (
                    <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'en' ? 'Bio' : 'Hakkında'}
                </label>
                <textarea
                  {...register('bio')}
                  rows={4}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500 resize-none"
                  placeholder={language === 'en' ? "Tell us about yourself..." : "Kendiniz hakkında bilgi verin..."}
                />
                {errors.bio && (
                  <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
                )}
              </div>

              {isEditing && (
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isSubmitting ? t('loading') : t('save')} {language === 'en' ? 'Changes' : 'Değişiklikleri'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    {t('cancel')}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;