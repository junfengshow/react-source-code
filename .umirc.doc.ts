import { defineConfig } from 'umi'
export default defineConfig({
  // 站点模式
  mode: 'site',
  outputPath: 'doc-dist',

  title: '源码笔记(react)',
  logo: '//www.junfengshow.com/static/assets/logo.png',
  favicon: '//www.junfengshow.com/static/favicon.png',

  resolve: {
    includes: ['./docs'],
    previewLangs: ['jsx', 'tsx'],
  },

  base: '/',
  navs: [
    { path: '/idea', title: '理念' },
    { path: '/17-x-x', title: '17-x-x' },
    { path: '/16-x-x', title: '16-x-x' },
  ],
  // menus: {
  // },

  // 默认是中文，index.md index.en-US.md必须要存在的
  locales: [['zh-CN', '中文'], ['en-US', 'English'], ['en', 'English']],
  
  chainWebpack(memo, { env, webpack, createCSSRule }) {
    // 设置 alias
    memo.entry('umi').add('./docs/app.ts')
  },
  hash: true
})
