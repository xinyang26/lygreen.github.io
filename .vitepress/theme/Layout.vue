<script setup lang="ts">
import { useData } from 'vitepress'

import Home from './component/Home.vue';
import Header from './component/Header.vue'
import Sidebar from './component/Sidebar.vue';
import Article from './component/Article.vue';
import ArticleTOC from './component/ArticleTOC.vue';
import Articles from './component/Articles.vue';
import Page404 from './component/Page404.vue';

const { site, page, frontmatter } = useData()

</script>

<template>
    <Header />
    <Page404 v-if="page.isNotFound" />
    <Home v-else-if="frontmatter.layout === 'home'" />
    <Articles v-else-if="frontmatter.layout === 'articles'" />
    <div id="h-container" v-else>
        <!-- <Sidebar /> -->
        
        <Article />
        <ArticleTOC />
    </div>
    <!-- <div id="v-container">
    </div> -->

</template>

<style scoped>

#v-container {
    display: flex;
    gap: 20px;
    flex-direction: column;
}

#h-container {
    display: flex;
    gap: 16px;
    flex-direction: row;
    min-height: calc(100vh - 50px);
    padding-left: 20px;
    padding-right: 20px;
}

</style>
