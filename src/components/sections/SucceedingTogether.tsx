import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const SucceedingTogether: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const benefits = [
    language === 'en' ? 'Data-driven strategies tailored to your business goals' : 'İşletme hedeflerinize göre özelleştirilmiş veri odaklı stratejiler',
    language === 'en' ? 'Transparent reporting with clear ROI metrics' : 'Net ROI metrikleriyle şeffaf raporlama',
    language === 'en' ? 'Regular strategy reviews and optimization' : 'Düzenli strateji incelemeleri ve optimizasyon',
    language === 'en' ? 'Proactive adaptation to algorithm changes' : 'Algoritma değişikliklerine proaktif uyum',
    language === 'en' ? 'Continuous learning and improvement' : 'Sürekli öğrenme ve gelişme'
  ];

  return (
    <section id="succeeding-together" className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
              {language === 'en' ? 'We Believe in Succeeding Together' : 'Birlikte Başarmaya İnanıyoruz'}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-teal-400 mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              {language === 'en'
                ? 'Your success is our success. We work as an extension of your team, aligning our SEO strategies with your business objectives to deliver sustainable growth and measurable results.'
                : 'Sizin başarınız bizim başarımızdır. Ekibinizin bir uzantısı olarak çalışıyor, sürdürülebilir büyüme ve ölçülebilir sonuçlar sunmak için SEO stratejilerimizi işletme hedeflerinizle uyumlu hale getiriyoruz.'}
            </p>
            
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 dark:text-gray-300">{benefit}</p>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => navigate('/contact')}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg hover:from-blue-600 hover:to-teal-500 transition-all font-medium shadow-md hover:shadow-lg"
            >
              {language === 'en' ? 'Start Your SEO Journey' : 'SEO Yolculuğunuza Başlayın'}
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 p-10 rounded-2xl shadow-lg">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-20 h-20 bg-blue-500 rounded-full opacity-20"></div>
              <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-teal-500 rounded-full opacity-20"></div>
              
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md relative z-10">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {language === 'en' ? 'Our Partnership Approach' : 'Ortaklık Yaklaşımımız'}
                </h3>
                
                <div className="space-y-6">
                  <div className="flex">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xl">
                      1
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {language === 'en' ? 'Discover' : 'Keşfet'}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {language === 'en'
                          ? 'We analyze your business, goals, and current SEO performance'
                          : 'İşletmenizi, hedeflerinizi ve mevcut SEO performansınızı analiz ediyoruz'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 font-bold text-xl">
                      2
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {language === 'en' ? 'Strategize' : 'Strateji Oluştur'}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {language === 'en'
                          ? 'We develop a customized SEO roadmap aligned with your objectives'
                          : 'Hedeflerinizle uyumlu özelleştirilmiş bir SEO yol haritası geliştiriyoruz'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-xl">
                      3
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {language === 'en' ? 'Execute' : 'Uygula'}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {language === 'en'
                          ? 'We implement proven SEO tactics with regular communication'
                          : 'Düzenli iletişimle kanıtlanmış SEO taktiklerini uyguluyoruz'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400 font-bold text-xl">
                      4
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {language === 'en' ? 'Measure & Refine' : 'Ölç & İyileştir'}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {language === 'en'
                          ? 'We track results, analyze data, and continuously optimize'
                          : 'Sonuçları takip ediyor, verileri analiz ediyor ve sürekli optimize ediyoruz'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SucceedingTogether;