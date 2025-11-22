export default {
  base: '/enzan/',

  title: 'Site for Train',
  publicDir: 'public',
  themeConfig: {
    brandColor: '#008080',
    nav: [
      { text: 'はじめに', link: '/menu' },
      { text: '記事', link: '/article' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/youtame/enzan/' },
      { icon: 'x', link: 'https://x.com/Geniusrailway' },
      { icon: 'youtube', link: 'https://www.youtube.com/@GeniusRailway' }
    ],
    sidebar: [
      {
        text: 'はじめに',
        items: [
          { text: 'イントロダクション', link: '/menu' },
          { text: 'コンテンツに関して', link: '/features.md' }
        ]
      },  
      {
        text: '記事',
        items: [
          { text: '記事一覧', link: '/article/' },
          { text: '塩山駅に行ったときの話', link: '/article/20251120' },
          { text: '横浜市営地下鉄の進化', link: '/article/20251121' },
          { text: '一泊二日の寄り道', link: '/article/20251122' }
        ]
      },
      {
        text: 'このサイトについて',
        items: [
          { text: 'このサイトについて', link: '/about/' }
        ]
      },
    ],
    search: {
      provider: 'local'
    },
    footer: {
      message: 'このコンテンツはMITライセンスのもと自由に利用できます　詳細は「このサイトについて」をご覧ください',
      copyright: 'Copyright © 2025- 102do LLC'
    },
  },
  head: [
    // Favicon and related icons
    ['link', { rel: 'icon', type: 'image/png', href: '/enzan/favicon/favicon-96x96.png', sizes: '96x96' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/enzan/favicon/favicon.svg' }],
    ['link', { rel: 'shortcut icon', href: '/enzan/favicon/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/enzan/favicon/apple-touch-icon.png' }],
    ['link', { rel: 'manifest', href: '/enzan/site.webmanifest' }],

    // theme-color meta tags for light and dark modes
    ['meta', { name: 'theme-color', content: '#ffffff', media: '(prefers-color-scheme: light)' }],
    ['meta', { name: 'theme-color', content: '#121212', media: '(prefers-color-scheme: dark)' }]
  ]
}
