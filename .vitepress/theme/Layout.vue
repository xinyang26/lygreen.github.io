<script setup lang="ts">
import { useData } from 'vitepress'

import Home from './component/Home.vue';
import Header from './component/Header.vue'
import Sidebar from './component/Sidebar.vue';
import Category from './component/Category.vue';
import CategoryPage from './component/CategoryPage.vue';
import Tag from './component/Tag.vue';
import TagPage from './component/TagPage.vue';
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
    <Category v-else-if="frontmatter.layout === 'category'" />
    <CategoryPage v-else-if="frontmatter.layout === 'category-page'" />
    <Tag v-else-if="frontmatter.layout === 'tag'" />
    <TagPage v-else-if="frontmatter.layout === 'tag-page'" />
    <div id="h-container" v-else>
        <!-- <Sidebar /> -->
        
        <Article />
        <ArticleTOC />
    </div>
</template>

<style scoped>



#h-container {
    display: flex;
    width: calc(100% - 40px);
    gap: 16px;
    flex-direction: row;
    min-height: calc(100% - 50px);
    padding-left: 20px;
    padding-right: 20px;
}

</style>
