import React from 'react';
import { X, Crown, Check, Clock } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: string;
  currentLimit: string;
  timeUntilReset?: string;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ 
  isOpen, 
  onClose, 
  feature, 
  currentLimit, 
  timeUntilReset 
}) => {
  const { t, formatCurrency, language } = useLanguage();

  if (!isOpen) return null;

  const plans = [
    {
      name: language === 'en' ? 'Starter Plan' : 'Başlangıç Planı',
      price: language === 'en' ? formatCurrency(19, 'USD') : formatCurrency(299, 'TRY'),
      features: [
        language === 'en' ? '5 projects' : '5 proje',
        language === 'en' ? '100 keyword tracking' : '100 anahtar kelime takibi', 
        language === 'en' ? '10 site audits per month' : '10 site denetimi/ay',
        language === 'en' ? 'Content calendar' : 'İçerik takvimi'
      ]
    },
    {
      name: language === 'en' ? 'Professional Plan' : 'Profesyonel Plan',
      price: language === 'en' ? formatCurrency(39, 'USD') : formatCurrency(459, 'TRY'),
      features: [
        language === 'en' ? '25 projects' : '25 proje',
        language === 'en' ? '500 keyword tracking' : '500 anahtar kelime takibi',
        language === 'en' ? '50 site audits per month' : '50 site denetimi/ay',
        language === 'en' ? 'Advanced analytics' : 'Gelişmiş analitik',
        language === 'en' ? 'Team collaboration' : 'Ekip işbirliği'
      ],
      popular: true
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Crown className="w-6 h-6 text-yellow-500 mr-2" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('limit-exceeded')}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="text-center mb-6">
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              {language === 'en' ? 
                `You've reached your ${feature} limit: ` : 
                `${feature} limitinize ulaştınız: `}
              <strong>{currentLimit}</strong>
            </p>
            {timeUntilReset && (
              <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-500 mb-4">
                <Clock className="w-4 h-4 mr-1" />
                {t('limit-resets-in')} {timeUntilReset}
              </div>
            )}
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('upgrade-for-more')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative p-6 rounded-lg border-2 transition-all ${
                  plan.popular
                    ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-20'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {t('most-popular')}
                    </span>
                  </div>
                )}

                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                    {plan.price}<span className="text-sm font-normal text-gray-500">/month</span>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white'
                  }`}
                  disabled
                >
                  {t('coming-soon')}
                </button>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {language === 'en' ? 
                'Payment system launching soon. Join our waitlist to get notified!' : 
                'Ödeme sistemi yakında başlıyor. Haberdar olmak için bekleme listemize katılın!'}
            </p>
            <div className="flex justify-center space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                {t('maybe-later')}
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t('join-waitlist')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradeModal;