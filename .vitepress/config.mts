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
    hostname: "https://lygreen.github.io/make-blog/",
  },
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    }
  },
  base: "/make-blog/",
  themeConfig: {
    data: "Hello World",
  }
})
