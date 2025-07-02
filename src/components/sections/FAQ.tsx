import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const FAQ: React.FC = () => {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: language === 'en' ? 'How long does it take to see results from SEO?' : 'SEO\'dan sonuç görmek ne kadar sürer?',
      answer: language === 'en' 
        ? 'SEO is a long-term strategy. While some improvements can be seen within a few weeks (like technical fixes), meaningful ranking improvements typically take 3-6 months. Competitive industries may take longer. We provide monthly progress reports so you can track improvements throughout the process.'
        : 'SEO uzun vadeli bir stratejidir. Bazı iyileştirmeler birkaç hafta içinde görülebilse de (teknik düzeltmeler gibi), anlamlı sıralama iyileştirmeleri genellikle 3-6 ay sürer. Rekabetçi sektörler daha uzun sürebilir. Süreç boyunca iyileştirmeleri takip edebilmeniz için aylık ilerleme raporları sunuyoruz.'
    },
    {
      question: language === 'en' ? 'What makes your SEO approach different?' : 'SEO yaklaşımınızı farklı kılan nedir?',
      answer: language === 'en'
        ? 'We combine technical expertise with creative content strategies and data analytics. Our approach is fully transparent, with clear reporting and measurable KPIs. We focus on sustainable, white-hat techniques that build long-term value rather than quick fixes that might lead to penalties.'
        : 'Teknik uzmanlığı yaratıcı içerik stratejileri ve veri analitiği ile birleştiriyoruz. Yaklaşımımız, net raporlama ve ölçülebilir KPI\'larla tamamen şeffaftır. Cezalara yol açabilecek hızlı çözümler yerine, uzun vadeli değer oluşturan sürdürülebilir, beyaz şapka tekniklerine odaklanıyoruz.'
    },
    {
      question: language === 'en' ? 'Do you guarantee first-page rankings?' : 'İlk sayfa sıralamaları garanti ediyor musunuz?',
      answer: language === 'en'
        ? 'No reputable SEO agency can guarantee specific rankings, as search algorithms consider hundreds of factors outside our control. However, we do guarantee our methodology, expertise, and commitment to improving your search visibility. Our track record shows consistent improvements for clients who follow our recommendations.'
        : 'Hiçbir saygın SEO ajansı belirli sıralamaları garanti edemez, çünkü arama algoritmaları kontrolümüz dışında yüzlerce faktörü dikkate alır. Ancak, metodolojimizi, uzmanlığımızı ve arama görünürlüğünüzü iyileştirme taahhüdümüzü garanti ediyoruz. Geçmiş performansımız, önerilerimizi izleyen müşteriler için tutarlı iyileştirmeler gösteriyor.'
    },
    {
      question: language === 'en' ? 'What does your SEO process look like?' : 'SEO süreciniz nasıl görünüyor?',
      answer: language === 'en'
        ? 'Our process begins with a comprehensive audit of your website and competitive landscape. We then develop a customized strategy focusing on technical SEO, content optimization, and off-page factors. Implementation follows with regular monitoring, reporting, and strategy refinements based on performance data and algorithm updates.'
        : 'Sürecimiz, web sitenizin ve rekabet ortamınızın kapsamlı bir denetimiyle başlar. Ardından teknik SEO, içerik optimizasyonu ve sayfa dışı faktörlere odaklanan özelleştirilmiş bir strateji geliştiririz. Uygulama, performans verileri ve algoritma güncellemelerine dayalı düzenli izleme, raporlama ve strateji iyileştirmeleriyle devam eder.'
    },
    {
      question: language === 'en' ? 'Do you work with small businesses or only enterprise clients?' : 'Küçük işletmelerle mi yoksa sadece kurumsal müşterilerle mi çalışıyorsunuz?',
      answer: language === 'en'
        ? 'We work with businesses of all sizes, from local small businesses to international enterprises. Our service packages are scalable to meet different needs and budgets. What matters most is not your company size but your commitment to sustainable growth through quality SEO.'
        : 'Yerel küçük işletmelerden uluslararası kuruluşlara kadar her büyüklükteki işletmeyle çalışıyoruz. Hizmet paketlerimiz, farklı ihtiyaçlara ve bütçelere uyacak şekilde ölçeklenebilir. En önemli olan şirket büyüklüğünüz değil, kaliteli SEO aracılığıyla sürdürülebilir büyümeye olan bağlılığınızdır.'
    },
    {
      question: language === 'en' ? 'What metrics do you track to measure SEO success?' : 'SEO başarısını ölçmek için hangi metrikleri takip ediyorsunuz?',
      answer: language === 'en'
        ? 'We track a comprehensive set of metrics including organic traffic, keyword rankings, click-through rates, conversion rates, backlink quality and quantity, page load speed, user engagement metrics, and ultimately, ROI. Our reporting dashboards provide full transparency into these metrics and how they impact your business goals.'
        : 'Organik trafik, anahtar kelime sıralamaları, tıklama oranları, dönüşüm oranları, backlink kalitesi ve miktarı, sayfa yükleme hızı, kullanıcı etkileşim metrikleri ve nihayetinde ROI dahil olmak üzere kapsamlı bir metrik seti takip ediyoruz. Raporlama panolarımız, bu metriklere ve bunların işletme hedeflerinizi nasıl etkilediğine tam şeffaflık sağlar.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Add structured data for FAQs
  React.useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    // Create or update the script element
    let script = document.getElementById('faq-schema');
    if (!script) {
      script = document.createElement('script');
      script.id = 'faq-schema';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);

    // Cleanup
    return () => {
      const scriptToRemove = document.getElementById('faq-schema');
      if (scriptToRemove) {
        document.head.removeChild(scriptToRemove);
      }
    };
  }, [faqs]);

  return (
    <section id="faq" className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-3xl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            {language === 'en' ? 'Frequently Asked Questions' : 'Sıkça Sorulan Sorular'}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-teal-400 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {language === 'en' 
              ? 'Find answers to common questions about our SEO services and approach'
              : 'SEO hizmetlerimiz ve yaklaşımımız hakkında sık sorulan soruların cevaplarını bulun'}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                <button
                  className="w-full px-8 py-6 text-left flex items-center justify-between focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {faq.question}
                  </h3>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  )}
                </button>
                
                <div 
                  className={`px-8 pb-6 transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
                >
                  <p className="text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;