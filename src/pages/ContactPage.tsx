import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Phone, Mail, MessageCircle, Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import toast from 'react-hot-toast';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters')
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactPage: React.FC = () => {
  const { t, language } = useLanguage();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(language === 'en' ? 'Message sent successfully! We\'ll get back to you soon.' : 'Mesaj başarıyla gönderildi! En kısa sürede size geri döneceğiz.', { duration: 1000 });
      reset();
    } catch (error) {
      toast.error(language === 'en' ? 'Failed to send message. Please try again.' : 'Mesaj gönderimi başarısız oldu. Lütfen tekrar deneyin.', { duration: 1000 });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {t('get-in-touch')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {language === 'en' 
            ? 'Have questions about our SEO platform? We\'re here to help! Reach out to us through any of the channels below.'
            : 'SEO platformumuz hakkında sorularınız mı var? Yardım etmek için buradayız! Aşağıdaki kanallardan herhangi biri aracılığıyla bize ulaşın.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {language === 'en' ? 'Contact Information' : 'İletişim Bilgileri'}
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-lg">
                  <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {t('phone')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    <a href="tel:+48501182962" className="hover:text-blue-600 dark:hover:text-blue-400">
                      +48 501 182 962
                    </a>
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    {language === 'en' 
                      ? 'Available Monday - Friday, 9 AM - 6 PM CET'
                      : 'Pazartesi - Cuma, 9:00 - 18:00 CET saatleri arasında ulaşılabilir'}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {t('email')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    <a href="mailto:ibrahim@workexe.co" className="hover:text-green-600 dark:hover:text-green-400">
                      ibrahim@workexe.co
                    </a>
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    {language === 'en' ? 'We\'ll respond within 24 hours' : '24 saat içinde yanıt vereceğiz'}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 dark:bg-purple-900/50 p-3 rounded-lg">
                  <MessageCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {language === 'en' ? 'Live Chat' : 'Canlı Sohbet'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {language === 'en' ? 'Chat with our support team' : 'Destek ekibimizle sohbet edin'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    {language === 'en' ? 'Available during business hours' : 'Çalışma saatleri içinde kullanılabilir'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {language === 'en' ? 'Quick Answers' : 'Hızlı Cevaplar'}
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                  {language === 'en' ? 'How quickly can I get started?' : 'Ne kadar hızlı başlayabilirim?'}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                  {language === 'en'
                    ? 'You can start using our platform immediately after signing up. No setup required!'
                    : 'Kaydolduktan hemen sonra platformumuzu kullanmaya başlayabilirsiniz. Kurulum gerekmez!'}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                  {language === 'en' ? 'Do you offer custom integrations?' : 'Özel entegrasyonlar sunuyor musunuz?'}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                  {language === 'en'
                    ? 'Yes, our Enterprise plan includes custom integrations and dedicated support.'
                    : 'Evet, Kurumsal planımız özel entegrasyonlar ve özel destek içerir.'}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                  {language === 'en' ? 'Is there a free trial?' : 'Ücretsiz deneme var mı?'}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                  {language === 'en'
                    ? 'Our Free plan gives you access to core features. Upgrade anytime for more advanced tools.'
                    : 'Ücretsiz planımız temel özelliklere erişim sağlar. Daha gelişmiş araçlar için istediğiniz zaman yükseltme yapabilirsiniz.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {t('send-message')}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('name')}
              </label>
              <input
                {...register('name')}
                type="text"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder={language === 'en' ? "Your full name" : "Tam adınız"}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('email')}
              </label>
              <input
                {...register('email')}
                type="email"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('subject')}
              </label>
              <input
                {...register('subject')}
                type="text"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder={language === 'en' ? "What can we help you with?" : "Size nasıl yardımcı olabiliriz?"}
              />
              {errors.subject && (
                <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('message')}
              </label>
              <textarea
                {...register('message')}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                placeholder={language === 'en' ? "Tell us more about your inquiry..." : "Sorgunuz hakkında daha fazla bilgi verin..."}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  {t('send-message')}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;