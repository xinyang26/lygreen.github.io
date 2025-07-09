<script setup lang="ts">

import { useData } from 'vitepress';
import { onMounted, reactive, ref } from 'vue';
import axios from 'axios';

const COLOR_COUNT = 6;
const colors: Array<any> = [];
for (let i = 0; i < COLOR_COUNT; i++) {
    colors.push('color' + i);
}
const base = (import.meta as any).env.BASE_URL;

const { params } = useData();

interface PostsPageInfo {
    postsPerPage: number,
    totalPages: number,
    length: number,
}

interface Post {
    title?: string,
    description?: string,
    createdTime?: string,
    updatedTime?: string,
    readingTime?: number,
    category?: string[],
    tag?: string[],
    originBasename?: string,
    url?: string,
}

/* 包括当前页面和前后两页页面（前后两页页面为预加载） */
const posts = ref<Post[]>([]);
let postsPageInfo = reactive<any>({});
let currentPage = (params.value as any).page;

onMounted(async () => {
    const url = base + 'json/posts-page-info.json';
    const response = await axios.get(url);
    postsPageInfo = response.data;
    setPage(currentPage);
})

function lastPage() {
    if (currentPage > 1) {
        setPage(currentPage - 1);
    }
}

function nextPage() {
    if (currentPage < postsPageInfo.totalPages) {
        setPage(currentPage + 1);
    }
}

async function setPage(index: number) {
    const url = window.location.origin + '/json/posts-page-' + index + '.json';
    const res = await axios.get(url);
    posts.value = res.data;
    currentPage = index;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


/* 客户端 */
// const COLOR_COUNT = 6;
// const colors: Array<any> = [];
// for (let i = 0; i < COLOR_COUNT; i++) {
//     colors.push('color' + i);
// }

// function getRandomInt(min, max) {
//     return Math.floor(Math.random() * (max - min) + min);
// }

// onMounted(() => {
//     const categories = document.querySelectorAll('.category a');
//     const tags = document.querySelectorAll('.tag a');
//     for (let i = 0; i < categories.length; i++) {
//         categories[i].classList.add(colors[getRandomInt(0, colors.length)]);
//     }
//     for (let i = 0; i < tags.length; i++) {
//         tags[i].classList.add(colors[getRandomInt(0, colors.length)]);
//     }
// });

</script>

<template>
    <div id="articles">
        <div class="item" v-for="(item, index) in posts" v-bind:key="index">
            <a :href="base + item.url">
                <div class="title">{{ item.title }}</div>
                <div class="description">{{ item.description }}</div>
            </a>
            <div class="bottom">
                <div class="category">
                    <a :href="base + 'category/' + e" v-for="(e, i) in item.category" v-bind:key="i" :class="colors[getRandomInt(0, COLOR_COUNT)]">
                        {{ e }}
                    </a>
                </div>
                <div class="tag">
                    <a :href="base + 'tag/' + e" v-for="(e, i) in item.tag" v-bind:key="i" :class="colors[getRandomInt(0, COLOR_COUNT)]">
                        {{ e }}
                    </a>
                </div>
            </div>
        </div>
        <div class="pages">
            <a :href="currentPage > 1 ? base + 'articles/pages/' + (currentPage - 1) : ''" @click="lastPage">
                <div class="page-block">
                    <
                </div>
            </a>
            <a :href="base + 'articles/pages/' + item" v-for="(item, index) in postsPageInfo.totalPages" v-bind:key="index" @click="setPage(index + 1)">
                <div :class="{ 'active': currentPage == item, 'page-block': true }">
                    {{ item }}
                </div>
            </a>
            <a :href="currentPage < postsPageInfo.totalPages ? base + 'articles/pages/' + (currentPage + 1) : ''" @click="nextPage">
                <div class="page-block">
                    >
                </div>
            </a>
        </div>
    </div>
</template>

<style scoped>

#articles {
    padding-left: 32px;
    padding-right: 32px;
}

.pages {
    display: flex;
    flex-direction: row;
    gap: 0px;
}

.pages .active {
    background-color: var(--main-bg-color);
    box-shadow: var(--emphasize-shadow);
}

.pages div {
    display: flex;
    width: 30px;
    height: 36px;
    justify-content: center;
    align-items: center;

    border-radius: 8px;
    background-color: var(--secondary-bg-color);
    box-shadow: var(--basic-card-shadow);
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

.bottom {
    bottom: 0px;
    
}

.bottom a {
    padding: 8px 8px 8px 8px;
    border-radius: 5px;
    
    box-shadow: var(--float-component-shadow);
    transition: transform 0.3s ease, var(--transition-attribute, background-color 0s);
}

.bottom a:hover {
    transform: translateY(-2px);
}

.category {
    float: left;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 16px;
    align-items: center;
    margin-top: 8px;
    margin-bottom: 8px;
}

.tag {
    float: right;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 16px;
    align-items: center;
    margin-top: 8px;
    margin-bottom: 8px;
}

</style>
