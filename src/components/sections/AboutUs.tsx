import React from 'react';
import { Award, Users, TrendingUp, Globe } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const AboutUs: React.FC = () => {
  const { language } = useLanguage();

  const stats = [
    {
      value: '10+',
      label: language === 'en' ? 'Years Experience' : 'Yıl Deneyim',
      icon: Award,
      color: 'text-blue-500'
    },
    {
      value: '500+',
      label: language === 'en' ? 'Clients Worldwide' : 'Dünya Çapında Müşteri',
      icon: Globe,
      color: 'text-green-500'
    },
    {
      value: '98%',
      label: language === 'en' ? 'Client Retention' : 'Müşteri Tutma Oranı',
      icon: Users,
      color: 'text-purple-500'
    },
    {
      value: '250%',
      label: language === 'en' ? 'Average ROI' : 'Ortalama ROI',
      icon: TrendingUp,
      color: 'text-orange-500'
    }
  ];

  return (
    <section id="about-us" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            {language === 'en' ? 'About Us' : 'Hakkımızda'}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-teal-400 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {language === 'en' 
              ? "We don't offer cookie-cutter tools — our platform adapts to your SEO goals. From automated technical audits to content intelligence, every feature is designed to fit your business context and scale with your growth."
              : "Şablon araçlar sunmuyoruz — platformumuz SEO hedeflerinize uyum sağlar. Otomatik teknik denetimlerden içerik zekasına kadar her özellik, işletme bağlamınıza uyacak ve büyümenizle birlikte ölçeklenecek şekilde tasarlanmıştır."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {language === 'en' ? 'Our Story' : 'Hikayemiz'}
            </h3>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>
                {language === 'en'
                  ? 'Our SEO journey began in 2020, born from a passion for understanding search algorithms and helping businesses gain visibility online. What started as a curiosity quickly evolved into a dedicated pursuit of excellence in the digital marketing space.'
                  : '2020 yılında, arama algoritmalarını anlama ve işletmelerin çevrimiçi görünürlük kazanmasına yardımcı olma tutkusuyla SEO yolculuğumuz başladı. Bir merak olarak başlayan şey, hızla dijital pazarlama alanında mükemmelliğe adanmış bir arayışa dönüştü.'}
              </p>
              <p>
                {language === 'en'
                  ? 'Led by İbrahim Aydoğdu, who brings 5 years of industry experience, our team combines technical expertise with creative strategies. We\'ve developed a unique approach that focuses not just on rankings, but on meaningful results that drive business growth.'
                  : '5 yıllık sektör deneyimini getiren İbrahim Aydoğdu liderliğindeki ekibimiz, teknik uzmanlığı yaratıcı stratejilerle birleştiriyor. Sadece sıralamalara değil, işletme büyümesini sağlayan anlamlı sonuçlara odaklanan benzersiz bir yaklaşım geliştirdik.'}
              </p>
              <p>
                {language === 'en'
                  ? 'This isn\'t just about rankings — it\'s about results. With real-time insights, strategic recommendations, and transparent reporting, you\'ll always know what\'s working, what\'s next, and why it matters.'
                  : 'Bu sadece sıralamalarla ilgili değil — sonuçlarla ilgili. Gerçek zamanlı içgörüler, stratejik öneriler ve şeffaf raporlama ile neyin işe yaradığını, sırada neyin olduğunu ve neden önemli olduğunu her zaman bileceksiniz.'}
              </p>
            </div>
          </div>
          
          <div className="order-1 md:order-2 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 p-8 rounded-2xl shadow-lg">
            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300">
                    <div className="flex justify-center mb-4">
                      <Icon className={`w-10 h-10 ${stat.color}`} />
                    </div>
                    <div className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;