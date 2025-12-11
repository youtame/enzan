// /enzan/docs/.vitepress/config.js

export default {
  base: '/enzan/',
  lastUpdated: false,
  title: 'Site for Train',
  publicDir: 'public',

  // Site head settings
  head: [
    // Favicon and related icons
    ['link', { rel: 'icon', type: 'image/png', href: '/enzan/favicon/favicon-96x96.png', sizes: '96x96' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/enzan/favicon/favicon.svg' }],
    ['link', { rel: 'shortcut icon', href: '/enzan/favicon/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/enzan/favicon/apple-touch-icon.png' }],
    ['link', { rel: 'manifest', href: '/enzan/pages/site.webmanifest' }],

    //OG Tag
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Site for Train' }],
    ['meta', { property: 'og:description', content: '少ない更新頻度とライトな記事で手軽に読める鉄道に関するブログサイト' }],
    ['meta', { property: 'og:image', content: '/enzan/assets/home.png' }],

    // theme-color meta tags for light and dark modes
    ['meta', { name: 'theme-color', content: '#ffffff', media: '(prefers-color-scheme: light)' }],
    ['meta', { name: 'theme-color', content: '#1b1b1f', media: '(prefers-color-scheme: dark)' }],

    // Google Analytics
    [
      'script',
      { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-E0J4HP2C0T' }
    ],
    [
      'script',
      {},
      `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-E0J4HP2C0T');
      `
    ]
  ],

  // Vitepress Sitemap Generation
  sitemap: {
    hostname: 'https://youtame.github.io/enzan/'
  },

  // Vitepress theme settings  
  themeConfig: {
    brandColor: '#e73917',
    logo: '/assets/home.png',
    nav: [
      { text: 'はじめに', link: '/menu' },
      { text: '記事', link: '/article' },
      { 
        text: 'サイトについて',
        items: [
          { text: 'このサイトについて', link: '/about' },
          { text: 'プライバシーポリシー', link: '/about#プライバシーポリシー' },
          { text: 'お問い合わせ', link: '/about#お問い合わせ' }
        ] 
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/youtame/enzan/' },
      { icon: 'x', link: 'https://x.com/Geniusrailway' },
      { icon: 'youtube', link: 'https://www.youtube.com/@GeniusRailway' }
    ],
    sidebar: [
      {
        collapsed: false,
        text: 'はじめに',
        items: [
          { text: 'イントロダクション', link: '/menu' },
          { text: 'コンテンツに関して', link: '/features.md' }
        ]
      },  
      {
        collapsed: true,
        text: '記事',
        items: [
          { text: '記事一覧', link: '/article/' },
          { text: '塩山駅に行ったときの話', link: '/article/20251120' },
          { text: '横浜市営地下鉄の進化', link: '/article/20251121' },
          { text: '一泊二日の寄り道', link: '/article/20251122' },
          { text: '三重県伊賀市へ行った話', link: '/article/20251123' },
          { text: '東京から１時間で行ける秘境', link: '/article/20251204' },
          { text: '南武線のダイヤ改正2024', link: '/article/20251206' },
          { text: 'シンガポールのMRTの話', link: '/article/20251211' }
        ]
      },
      {
        collapsed: false,
        text: 'このサイトについて',
        items: [
          { text: 'サイトについて', link: '/about/' }
          
        ]
      },
    ],
    search: {
      provider: 'local'
    },
    footer: {
      message: 'ライセンス及びその詳細は<a href="/enzan/about">「このサイトについて」</a>をご覧ください',
      copyright: 'Copyright © 2025- 102do LLC'
    }
  }
}