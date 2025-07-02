import React, { useState } from 'react';
import { Check, Star, Clock, Plus, Minus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { mockPricingPlans } from '../data/mockData';

const PricingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [addonQuantities, setAddonQuantities] = useState<Record<string, Record<string, number>>>({});
  const { t, formatCurrency, language } = useLanguage();
  const { user } = useAuth();

  const updateAddonQuantity = (planId: string, addonId: string, quantity: number) => {
    setAddonQuantities(prev => ({
      ...prev,
      [planId]: {
        ...prev[planId],
        [addonId]: Math.max(0, quantity)
      }
    }));
  };

  const getAddonQuantity = (planId: string, addonId: string) => {
    return addonQuantities[planId]?.[addonId] || 0;
  };

  // Convert mockPricingPlans to the format needed for the pricing page
  const plans = mockPricingPlans.map(plan => {
    // Get the appropriate price based on currency
    const getPriceForCurrency = () => {
      if (selectedCurrency === 'EUR' && plan.euroPrice !== undefined) {
        return plan.euroPrice;
      } else if (selectedCurrency === 'GBP' && plan.gbpPrice !== undefined) {
        return plan.gbpPrice;
      } else if (selectedCurrency === 'TRY' && plan.tryPrice !== undefined) {
        return plan.tryPrice;
      }
      return plan.price;
    };

    return {
      id: plan.id,
      name: plan.name,
      price: getPriceForCurrency(),
      yearlyPrice: getPriceForCurrency() ? getPriceForCurrency() * 10 : null, // 10 months for yearly (16.7% discount)
      description: plan.id === 'free' ? (language === 'en' ? 'Perfect for getting started with SEO' : 'SEO\'ya başlamak için mükemmel') :
                  plan.id === 'pro' ? (language === 'en' ? 'Great for small businesses and freelancers' : 'Küçük işletmeler ve serbest çalışanlar için harika') :
                  plan.id === 'business' ? (language === 'en' ? 'Perfect for growing businesses and agencies' : 'Büyüyen işletmeler ve ajanslar için mükemmel') :
                  (language === 'en' ? 'Custom solution for large organizations' : 'Büyük kuruluşlar için özel çözüm'),
      features: plan.features,
      limitations: plan.id === 'free' ? [language === 'en' ? 'Limited features' : 'Sınırlı özellikler', language === 'en' ? 'Basic analytics' : 'Temel analitik'] : undefined,
      buttonText: user?.plan === plan.id ? t('current-plan') : 
                 plan.id === 'free' && (user?.plan === 'pro' || user?.plan === 'business' || user?.plan === 'professional') ? (language === 'en' ? 'Downgrade' : 'Paketi Düşür') :
                 plan.id === 'free' ? t('get-started') :
                 plan.id === 'agency' ? t('contact-us') : t('join-waitlist'),
      popular: plan.id === 'business',
      comingSoon: plan.id !== 'free' && plan.id !== 'agency',
      isCustomizable: plan.id === 'agency'
    };
  });

  // Add add-ons to the starter plan
  const starterPlan = plans.find(p => p.id === 'pro');
  if (starterPlan) {
    starterPlan.addOns = [
      { 
        id: 'advanced-reports',
        name: language === 'en' ? 'Advanced Reports' : 'Gelişmiş Raporlar',
        basePrice: 0,
        unitPrice: selectedCurrency === 'TRY' ? 399.99 : 
                  selectedCurrency === 'EUR' ? 17.99 : 
                  selectedCurrency === 'GBP' ? 15.99 : 20,
        maxQuantity: 10,
        description: language === 'en' ? 'Additional advanced report packages' : 'Ek gelişmiş rapor paketleri'
      },
      { 
        id: 'premium-support',
        name: language === 'en' ? 'Premium Support' : 'Premium Destek',
        basePrice: 0,
        unitPrice: selectedCurrency === 'TRY' ? 199.99 : 
                  selectedCurrency === 'EUR' ? 8.99 : 
                  selectedCurrency === 'GBP' ? 7.99 : 10,
        maxQuantity: 1,
        description: language === 'en' ? 'Priority support with 24/7 access' : '7/24 erişimli öncelikli destek'
      },
      { 
        id: 'additional-users',
        name: language === 'en' ? 'Additional Users' : 'Ek Kullanıcılar',
        basePrice: 0,
        unitPrice: selectedCurrency === 'TRY' ? 149.99 : 
                  selectedCurrency === 'EUR' ? 6.99 : 
                  selectedCurrency === 'GBP' ? 5.99 : 8,
        maxQuantity: 5,
        description: language === 'en' ? 'Add more team members to your account' : 'Hesabınıza daha fazla ekip üyesi ekleyin'
      }
    ];
  }

  // Custom options for the agency plan
  const agencyPlan = plans.find(p => p.id === 'agency');
  if (agencyPlan) {
    agencyPlan.customOptions = [
      {
        id: 'projects',
        name: language === 'en' ? 'Projects' : 'Projeler',
        basePrice: 0,
        unitPrice: selectedCurrency === 'TRY' ? 199.99 : 
                  selectedCurrency === 'EUR' ? 8.99 : 
                  selectedCurrency === 'GBP' ? 7.99 : 10,
        defaultValue: 50,
        minValue: 30,
        maxValue: 500,
        step: 10,
        description: language === 'en' ? 'Number of projects' : 'Proje sayısı'
      },
      {
        id: 'keywords',
        name: language === 'en' ? 'Keywords' : 'Anahtar Kelimeler',
        basePrice: 0,
        unitPrice: selectedCurrency === 'TRY' ? 0.99 : 
                  selectedCurrency === 'EUR' ? 0.045 : 
                  selectedCurrency === 'GBP' ? 0.039 : 0.05,
        defaultValue: 5000,
        minValue: 1000,
        maxValue: 50000,
        step: 1000,
        description: language === 'en' ? 'Keyword tracking capacity' : 'Anahtar kelime takip kapasitesi'
      },
      {
        id: 'users',
        name: language === 'en' ? 'Team Members' : 'Ekip Üyeleri',
        basePrice: 0,
        unitPrice: selectedCurrency === 'TRY' ? 149.99 : 
                  selectedCurrency === 'EUR' ? 6.79 : 
                  selectedCurrency === 'GBP' ? 5.99 : 7.5,
        defaultValue: 5,
        minValue: 3,
        maxValue: 50,
        step: 1,
        description: language === 'en' ? 'Number of user accounts' : 'Kullanıcı hesabı sayısı'
      }
    ];
  }

  const calculatePlanTotal = (plan: any) => {
    if (plan.price === null) return null;
    
    const basePrice = billingCycle === 'monthly' ? plan.price : plan.yearlyPrice;
    let addonTotal = 0;

    if (plan.addOns) {
      plan.addOns.forEach((addon: any) => {
        const quantity = getAddonQuantity(plan.id, addon.id);
        addonTotal += addon.basePrice + (addon.unitPrice * quantity);
      });
    }

    // Calculate custom options for agency plan
    if (plan.isCustomizable && plan.customOptions) {
      plan.customOptions.forEach((option: any) => {
        const quantity = option.defaultValue;
        addonTotal += option.unitPrice * quantity;
      });
    }

    return basePrice + addonTotal;
  };

  const handlePlanSelect = (planId: string) => {
    if (planId === 'agency') {
      window.location.href = '/contact';
    } else if (planId === 'free') {
      console.log('Selected free plan');
    } else {
      console.log('Coming soon:', planId);
    }
  };

  const currencies = [
    { code: 'USD', name: language === 'en' ? 'US Dollar' : 'ABD Doları', symbol: '$' },
    { code: 'EUR', name: language === 'en' ? 'Euro' : 'Euro', symbol: '€' },
    { code: 'GBP', name: language === 'en' ? 'British Pound' : 'İngiliz Sterlini', symbol: '£' },
    { code: 'TRY', name: language === 'en' ? 'Turkish Lira' : 'Türk Lirası', symbol: '₺' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {t('pricing')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {language === 'en' 
            ? 'Choose the perfect plan for your SEO needs. All plans include our core features with varying limits and advanced capabilities.'
            : 'SEO ihtiyaçlarınız için mükemmel planı seçin. Tüm planlar, değişen limitler ve gelişmiş özelliklerle temel özelliklerimizi içerir.'}
        </p>
      </div>

      {/* Coming Soon Notice */}
      <div className="bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 rounded-xl p-6 text-center">
        <div className="flex items-center justify-center mb-4">
          <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('coming-soon')}!</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {language === 'en'
            ? 'Payment system launching soon. Sign up to get notified when paid plans become available!'
            : 'Ödeme sistemi yakında başlıyor. Ücretli planlar kullanıma sunulduğunda bildirim almak için kaydolun!'}
        </p>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          {t('notify-me')}
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Billing Toggle */}
        <div className="flex justify-center">
          <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {language === 'en' ? 'Monthly' : 'Aylık'}
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'yearly'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {language === 'en' ? 'Yearly' : 'Yıllık'} <span className="text-green-600 text-xs ml-1">{language === 'en' ? 'Save 20%' : '%20 İndirim'}</span>
            </button>
          </div>
        </div>

        {/* Currency Selector */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('select-currency')}:
          </label>
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          >
            {currencies.map(currency => (
              <option key={currency.code} value={currency.code}>
                {currency.name} ({currency.symbol})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {plans.map((plan) => {
          const totalPrice = calculatePlanTotal(plan);
          
          return (
            <div
              key={plan.id}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm border-2 transition-all duration-200 hover:shadow-lg ${
                plan.popular
                  ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-20'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    {language === 'en' ? 'Most Popular' : 'En Popüler'}
                  </div>
                </div>
              )}

              {plan.comingSoon && (
                <div className="absolute -top-4 right-4">
                  <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {language === 'en' ? 'COMING SOON' : 'YAKINDA'}
                  </div>
                </div>
              )}

              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {plan.description}
                  </p>
                  <div className="mb-4">
                    {plan.id !== 'agency' && totalPrice !== null ? (
                      <>
                        <span className="text-4xl font-bold text-gray-900 dark:text-white">
                          {formatCurrency(totalPrice, selectedCurrency)}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400 ml-2">
                          /{billingCycle === 'monthly' ? (language === 'en' ? 'month' : 'ay') : (language === 'en' ? 'year' : 'yıl')}
                        </span>
                        {plan.addOns && Object.keys(addonQuantities[plan.id] || {}).some(key => getAddonQuantity(plan.id, key) > 0) && (
                          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {language === 'en' ? 'Base:' : 'Temel:'} {formatCurrency(
                              billingCycle === 'monthly' ? plan.price : plan.yearlyPrice,
                              selectedCurrency
                            )}
                          </div>
                        )}
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {language === 'en' ? 'Custom' : 'Özel'}
                      </span>
                    )}
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-400 text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                  {plan.limitations?.map((limitation, index) => (
                    <li key={`limitation-${index}`} className="flex items-start opacity-60">
                      <span className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-gray-400">×</span>
                      <span className="text-gray-500 dark:text-gray-500 text-sm">
                        {limitation}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Custom options for agency plan */}
                {plan.isCustomizable && plan.customOptions && (
                  <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                      {language === 'en' ? 'Customize Your Plan' : 'Planınızı Özelleştirin'}
                    </h4>
                    <div className="space-y-4">
                      {plan.customOptions.map((option) => (
                        <div key={option.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {option.name}
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">
                                {option.description}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {language === 'en' ? 'Default:' : 'Varsayılan:'} {option.defaultValue}
                            </div>
                          </div>
                          
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {language === 'en' ? 'Range:' : 'Aralık:'} {option.minValue} - {option.maxValue}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
                      {language === 'en' 
                        ? 'Contact us to customize your plan exactly to your needs'
                        : 'İhtiyaçlarınıza göre planınızı özelleştirmek için bizimle iletişime geçin'}
                    </div>
                  </div>
                )}

                {/* Tiered Add-ons */}
                {plan.addOns && (
                  <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                      <Plus className="w-4 h-4 mr-1" />
                      {language === 'en' ? 'Add-ons Available' : 'Ek Özellikler Mevcut'}
                    </h4>
                    <div className="space-y-3">
                      {plan.addOns.map((addon) => {
                        const quantity = getAddonQuantity(plan.id, addon.id);
                        const addonTotal = addon.basePrice + (addon.unitPrice * quantity);
                        
                        return (
                          <div key={addon.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex-1">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {addon.name}
                                </div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                  {addon.description}
                                </div>
                              </div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {formatCurrency(addon.unitPrice, selectedCurrency)}/{language === 'en' ? 'unit' : 'birim'}
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => updateAddonQuantity(plan.id, addon.id, quantity - 1)}
                                  disabled={quantity <= 0}
                                  className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-8 text-center text-sm font-medium text-gray-900 dark:text-white">
                                  {quantity}
                                </span>
                                <button
                                  onClick={() => updateAddonQuantity(plan.id, addon.id, quantity + 1)}
                                  disabled={quantity >= addon.maxQuantity}
                                  className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                              
                              {quantity > 0 && (
                                <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                  +{formatCurrency(addonTotal, selectedCurrency)}
                                </div>
                              )}
                            </div>
                            
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {language === 'en' ? 'Max:' : 'Maksimum:'} {addon.maxQuantity} {language === 'en' ? 'units' : 'birim'}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => handlePlanSelect(plan.id)}
                  disabled={user?.plan === plan.id && !plan.comingSoon}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    plan.popular && !plan.comingSoon
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : user?.plan === plan.id && !plan.comingSoon
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      : plan.comingSoon
                      ? 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-800'
                      : 'bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* FAQ Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          {language === 'en' ? 'Frequently Asked Questions' : 'Sıkça Sorulan Sorular'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              {language === 'en' ? 'When will paid plans be available?' : 'Ücretli planlar ne zaman kullanıma sunulacak?'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {language === 'en'
                ? 'We\'re launching our payment system soon! Join our waitlist to be the first to know when paid plans become available.'
                : 'Ödeme sistemimizi yakında başlatıyoruz! Ücretli planlar kullanıma sunulduğunda ilk öğrenen siz olmak için bekleme listemize katılın.'}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              {language === 'en' ? 'Can I use the free plan indefinitely?' : 'Ücretsiz planı süresiz olarak kullanabilir miyim?'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {language === 'en'
                ? 'Yes! Our free plan will always be available with basic features to help you get started with SEO.'
                : 'Evet! Ücretsiz planımız, SEO\'ya başlamanıza yardımcı olacak temel özelliklerle her zaman kullanılabilir olacaktır.'}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              {language === 'en' ? 'How do tiered add-ons work?' : 'Kademeli ek özellikler nasıl çalışır?'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {language === 'en'
                ? 'You can select multiple units of each add-on up to the maximum limit. Each additional unit adds to your monthly cost.'
                : 'Maksimum sınıra kadar her ek özelliğin birden çok birimini seçebilirsiniz. Her ek birim, aylık maliyetinize eklenir.'}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              {language === 'en' ? 'Will there be a free trial for paid plans?' : 'Ücretli planlar için ücretsiz deneme olacak mı?'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {language === 'en'
                ? 'Yes, we\'ll offer a 14-day free trial for all paid plans when they become available.'
                : 'Evet, ücretli planlar kullanıma sunulduğunda tüm ücretli planlar için 14 günlük ücretsiz deneme sunacağız.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;