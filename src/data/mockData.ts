export const mockTaskData = [
  {
    id: '1',
    title: 'Optimize homepage meta description',
    description: 'Update meta description to improve CTR',
    status: 'pending',
    priority: 'high',
    assignee: 'John Doe',
    dueDate: '2024-01-15',
    estimatedTime: 2,
    category: 'On-Page SEO'
  },
  {
    id: '2',
    title: 'Create blog content for Q1',
    description: 'Develop 12 blog posts focusing on target keywords',
    status: 'in-progress',
    priority: 'medium',
    assignee: 'Jane Smith',
    dueDate: '2024-02-01',
    estimatedTime: 40,
    category: 'Content Creation'
  },
  {
    id: '3',
    title: 'Fix broken internal links',
    description: 'Audit and fix 23 broken internal links',
    status: 'completed',
    priority: 'medium',
    assignee: 'Mike Johnson',
    dueDate: '2024-01-10',
    estimatedTime: 4,
    category: 'Technical SEO'
  }
];

export const mockContentCalendar = [
  {
    id: '1',
    title: 'How to Improve Your SEO in 2024',
    type: 'blog-post',
    status: 'scheduled',
    publishDate: '2024-01-20',
    platform: 'website',
    author: 'Content Team',
    keywords: ['SEO', '2024', 'optimization']
  },
  {
    id: '2',
    title: 'Social Media Post - SEO Tips',
    type: 'social-media',
    status: 'draft',
    publishDate: '2024-01-18',
    platform: 'linkedin',
    author: 'Marketing Team',
    keywords: ['SEO tips', 'social media']
  }
];

export const mockKeywordData = [
  {
    keyword: 'seo tools',
    difficulty: 65,
    searchVolume: 12000,
    cpc: 4.5,
    trend: 'up',
    currentRank: 15,
    potentialTraffic: 2400
  },
  {
    keyword: 'keyword research',
    difficulty: 45,
    searchVolume: 8500,
    cpc: 3.2,
    trend: 'stable',
    currentRank: 8,
    potentialTraffic: 1700
  },
  {
    keyword: 'seo audit',
    difficulty: 55,
    searchVolume: 6200,
    cpc: 5.8,
    trend: 'down',
    currentRank: 25,
    potentialTraffic: 1240
  }
];

export const mockTrafficData = [
  { date: '2024-01-01', organic: 1200, paid: 300, direct: 800, social: 150 },
  { date: '2024-01-02', organic: 1350, paid: 280, direct: 750, social: 180 },
  { date: '2024-01-03', organic: 1180, paid: 320, direct: 820, social: 140 },
  { date: '2024-01-04', organic: 1420, paid: 290, direct: 780, social: 200 },
  { date: '2024-01-05', organic: 1380, paid: 310, direct: 850, social: 170 },
  { date: '2024-01-06', organic: 1450, paid: 340, direct: 900, social: 220 },
  { date: '2024-01-07', organic: 1520, paid: 360, direct: 920, social: 190 }
];

export const mockCompetitorData = [
  {
    domain: 'competitor1.com',
    organicKeywords: 15420,
    organicTraffic: 89000,
    paidKeywords: 850,
    paidTraffic: 12000,
    authorityScore: 78
  },
  {
    domain: 'competitor2.com',
    organicKeywords: 12800,
    organicTraffic: 67000,
    paidKeywords: 640,
    paidTraffic: 8900,
    authorityScore: 72
  },
  {
    domain: 'competitor3.com',
    organicKeywords: 18900,
    organicTraffic: 105000,
    paidKeywords: 1200,
    paidTraffic: 18000,
    authorityScore: 85
  }
];

export const mockSchemaTypes = [
  'Article', 'BlogPosting', 'NewsArticle', 'WebPage', 'Organization', 
  'Person', 'Product', 'Review', 'Recipe', 'Event', 'FAQ', 'HowTo',
  'LocalBusiness', 'Course', 'JobPosting', 'Movie', 'Book', 'Software'
];

export const mockPricingPlans = [
  {
    id: 'free',
    name: 'Ücretsiz',
    price: 0,
    features: ['1 proje', '3 anahtar kelime takibi', '1 site denetimi'],
    limits: { projects: 1, keywords: 3, audits: 1 }
  },
  {
    id: 'pro',
    name: 'Başlangıç',
    price: 19,
    euroPrice: 15,
    gbpPrice: 9,
    tryPrice: 299,
    features: ['5 proje', '100 anahtar kelime takibi', '10 site denetimi', 'İçerik takvimi', 'Temel analitik'],
    limits: { projects: 5, keywords: 100, audits: 10 }
  },
  {
    id: 'business',
    name: 'Profesyonel',
    price: 39,
    euroPrice: 29,
    gbpPrice: 20,
    tryPrice: 459,
    features: ['25 proje', '500 anahtar kelime takibi', '50 site denetimi', 'Gelişmiş analitik', 'Ekip işbirliği'],
    limits: { projects: 25, keywords: 500, audits: 50 }
  },
  {
    id: 'agency',
    name: 'Özel',
    price: null,
    euroPrice: null,
    gbpPrice: null,
    tryPrice: null,
    features: ['İstediğiniz kadar proje', 'İstediğiniz kadar anahtar kelime', 'İstediğiniz kadar denetim', 'Beyaz etiketli raporlar', 'API erişimi'],
    limits: { projects: -1, keywords: -1, audits: -1 }
  }
];