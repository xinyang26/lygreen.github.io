import { defineConfig, defineConfigWithTheme } from 'vitepress'
import ThemeConfig from './theme/themeConfig'

// https://vitepress.dev/reference/site-config
export default defineConfigWithTheme<ThemeConfig>({
  srcDir: "./src",
  outDir: "./out",
  title: "自建博客",
  description: "A VitePress Site",
  cleanUrls: true,
  sitemap: {
    hostname: "https://lygreen.github.io/",
  },
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    }
  },
  // base: "/make-blog/",
  head: [
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
