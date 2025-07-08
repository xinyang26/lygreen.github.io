import { defineConfig, defineConfigWithTheme, HeadConfig } from 'vitepress'
import ThemeConfig from './theme/themeConfig'

// https://vitepress.dev/reference/site-config
export default defineConfigWithTheme<ThemeConfig>({
  mpa: true,
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            // 示例：将一些共享模块拆分
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          }
        }
      }
    }
  },
  srcDir: "./src",
  outDir: "./out",
  title: "💝 LYGreen 的博客 💖",
  // titleTemplate: '',
  description: "个人博客",
  cleanUrls: true,
  lastUpdated: true,
  sitemap: {
    hostname: "https://lygreen.github.io/",
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
  transformHead(context) {
    const meta: HeadConfig = [
      'meta',
      {
        name: 'robots',
        content: '',
      },
      ''
    ]
    if (context.page === 'index.md' || context.page.startsWith('posts/')) {
      (meta[1] as any).content = 'index, nofollow';
    } else {
      (meta[1] as any).content = 'noindex, nofollow';
    }
    return [meta];
  },
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
