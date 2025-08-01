import { defineConfig, defineConfigWithTheme } from 'vitepress'
import ThemeConfig from './theme/themeConfig'

// https://vitepress.dev/reference/site-config
export default defineConfigWithTheme<ThemeConfig>({
  srcDir: "./src",
  outDir: "./out",
  title: "💝 LYGreen 的博客 💖",
  // titleTemplate: '',
  description: "个人博客",
  cleanUrls: true,
  lastUpdated: true,
  sitemap: {
    hostname: "https://xinyang26.github.io/",
    lastmodDateOnly: true,
    xmlns: {
      news: false,
      video: false,
      xhtml: false,
      image: false,
    },
    transformItems: (items) => {
      items = items.filter((item) => {
        return item.url.startsWith("posts/") || item.url == '';
      })
      return items;
    },
  },
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    }
  },
  base: "/lygreen.github.io/",
  head: [
    // [
    //   'link',
    //   {
    //     rel: 'icon',
    //     href: '/favicon.ico',
    //     type: 'image/x-icon',
    //   },
    //   '',
    // ],
    [
      'script',
      {},
      `
      (function() {
        const localTheme = localStorage.getItem('data-theme');
        if (localTheme != null) {
            document.documentElement.setAttribute('data-theme', localTheme);
        } else {
          const media = window.matchMedia('(prefers-color-scheme: dark)');
          if (media.matches) {
              document.documentElement.setAttribute('data-theme', 'dark');
          } else {
              document.documentElement.setAttribute('data-theme', 'light');
          }
        }
      })();
      `
    ],
  ],
  themeConfig: {
    data: "Hello World",
  }
})
