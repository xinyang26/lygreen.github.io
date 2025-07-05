<script setup lang="ts">

import { onMounted } from 'vue';

const base = (import.meta as any).env.BASE_URL

let hasEvent = false;
let media: MediaQueryList;

function toggleTheme() {
    if (hasEvent) {
        media.removeEventListener('change', onMediaChanged);
        hasEvent = false;
    }
    let theme = document.documentElement.getAttribute('data-theme');
    theme = theme == 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-transition', '');
    localStorage.setItem('data-theme', theme);
}

function onMediaChanged(e: MediaQueryListEvent) {
    document.documentElement.setAttribute('data-transition', '');
    if (e.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
    localStorage.removeItem('data-theme');
}

onMounted(() => {
    media = window.matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', onMediaChanged);
    hasEvent = true;
});

</script>

<template>
    <div id="header">
        <div class="left">
            <a id="home" :href="base" target="_self">首页</a>
            <a :href="base + 'articles/pages/1'" target="_self">文章</a>
            <a :href="base + 'category/'" target="_self">分类</a>
            <a :href="base + 'tag/'" target="_self">标签</a>
        </div>

        <div class="right">
            <button @click="toggleTheme">切换主题</button>
            <a href="https://github.com/LYGreen/make-blog" target="_blank">Github</a>

        </div>
    </div>

</template>

<style scoped>

#header {
    background-color: var(--main-bg-color);
    box-shadow: var(--float-component-shadow);

    z-index: 999;
    position: sticky;

    top: 0px;
    width: 100%;
    height: 50px;
}

#home {
    text-align: center;
}

button {
  background-color: #4f46e5; /* 深蓝紫色 */
  color: white;
  padding: 0.6em 1.2em;
  border: none;
  border-radius: 0.5em;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

button:hover {
  background-color: #4338ca;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
}

button:active {
  transform: translateY(0);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
}

.left {
    float: left;
    display: flex;
    flex-direction: row;
    gap: 16px;
    align-items: center;
    padding-left: 16px;
    height: 100%;
}

.right {
    float: right;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
    padding-right: 16px;
    height: 100%;
}

</style>
