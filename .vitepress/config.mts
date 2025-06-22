import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
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
    
  }
})
