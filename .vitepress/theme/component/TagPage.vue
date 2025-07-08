<script setup>

import { useData } from 'vitepress';

const base = import.meta.env.BASE_URL;
const tag = useData().params.value.tag;
const posts = useData().params.value.posts;

</script>

<script client>

(() => {
    if (document.getElementById('tag-page') == null) {
        return;
    }
})();

</script>

<template>
    <div id="tag-page">
        <div class="header">
            当前标签：{{ tag }}
        </div>
        <a :href="base + item.url" target="_self" class="item" v-for="(item, index) in posts" v-bind:key="index">
            <div class="title">{{ item.title }}</div>
            <div class="description">{{ item.description }}</div>
        </a>
    </div>
</template>

<style scoped>

#tag-page {
    padding-left: 32px;
    padding-right: 32px;
}

.header {
    display: flex;

    margin-top: 16px;
    margin-bottom: 16px;
    padding: 16px 16px 16px 16px;

    border-radius: 8px;
    background-color: var(--secondary-bg-color);
    box-shadow: var(--float-component-shadow);

    height: 24px;
    justify-content: center;
    align-items: center;
}

.item {
    display: flex;
    flex-direction: column;
    min-height: 100px;
    margin-top: 16px;
    margin-bottom: 16px;
    padding: 16px 16px 16px 16px;

    border-radius: 8px;
    background-color: var(--secondary-bg-color);
    box-shadow: var(--float-component-shadow);
    transition: transform 0.3s ease, var(--transition-attribute, background-color 0s);
}

.item:hover {
    transform: translateY(-2px);
}

.title {
    font-weight: bold;
    font-size: 20px;
}

.description {
    flex: 1;
}

</style>
