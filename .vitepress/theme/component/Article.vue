<script setup lang="ts">

import { onMounted } from 'vue';
import { useData } from 'vitepress';
import theme from 'vitepress/theme';

const { frontmatter } = useData();

onMounted(() => {
    loadDiscussion();
});

function loadDiscussion() {
    // script src="https://giscus.app/client.js"
    //     data-repo="LYGreen/lygreen.github.io"
    //     data-repo-id="R_kgDOPH1RXg"
    //     data-category="Article discussions"
    //     data-category-id="DIC_kwDOPH1RXs4CsjU0"
    //     data-mapping="pathname"
    //     data-strict="0"
    //     data-reactions-enabled="1"
    //     data-emit-metadata="0"
    //     data-input-position="bottom"
    //     data-theme="preferred_color_scheme"
    //     data-lang="zh-CN"
    //     crossorigin="anonymous"
    //     async>
    // /script>

    const theme = document.documentElement.getAttribute('data-theme') ?? 'light';
    const comments = document.getElementById('comments');
    const script = document.createElement('script');
    script.src = "https://giscus.app/client.js";
    script.setAttribute('data-repo', "LYGreen/lygreen.github.io");
    script.setAttribute('data-repo-id', "R_kgDOPH1RXg");
    script.setAttribute('data-category', "Article discussions");
    script.setAttribute('data-category-id', "DIC_kwDOPH1RXs4CsjU0");
    script.setAttribute('data-mapping', "pathname");
    script.setAttribute('data-strict', "0");
    script.setAttribute('data-reactions-enabled', "1");
    script.setAttribute('data-emit-metadata', "0");
    script.setAttribute('data-input-position', "bottom");
    script.setAttribute('data-theme', theme);
    script.setAttribute('data-lang', "zh-CN");
    script.crossOrigin = 'anonymous';
    script.async = true;
    comments?.appendChild(script);
}

</script>

<template>
    <div id="article">
        <div class="header">
            <strong class="title">{{ frontmatter.title }}</strong>
            <span class="description">{{ frontmatter.description }}</span>
            <hr>
            <span class="time">
                📅创建时间：{{ frontmatter.createdTime }}
            </span>
            <span class="time">
                🕒修改时间：{{ frontmatter.updatedTime }}
            </span>
            <span class="time">
                📖阅读时间：{{ frontmatter.readingTime }} 分钟
            </span>
        </div>
        <hr>
        <div class="body">
            <Content />
        </div>
        <hr>
        <div class="footer">
            <span class="time">
                📅创建时间：{{ frontmatter.createdTime }}
            </span>
            <span class="time">
                🕒修改时间：{{ frontmatter.updatedTime }}
            </span>
        </div>
        <hr>
        <div id="comments"></div>
    </div>
</template>

<style scoped>

#article {
    margin-top: 16px;
    width: 100%;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 16px;
    padding-bottom: 16px;

    border-radius: 8px;

    background-color: var(--secondary-bg-color);
    box-shadow: var(--float-component-shadow);
}

.header .title {
    display: flex;
    justify-content: center;
    font-size: 48px;
}

.header .description {
    display: flex;
    justify-content: center;
    font-size: 24px;
}

.time {
    font-size: 14px;
    color: grey;
}

.header, .footer, span {
    display: block;
}

</style>
