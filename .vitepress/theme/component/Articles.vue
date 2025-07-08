<script setup>

import { useData } from 'vitepress';

const base = import.meta.env.BASE_URL;

const { params } = useData();
const posts = params.value.posts;
const currentPage = params.value.page;
const totalPage = params.value.totalPage;

</script>

<script client>



function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

(() => {
    if (document.getElementById('articles') == null) {
        return;
    }

    const COLOR_COUNT = 6;
    const colors = [];
    for (let i = 0; i < COLOR_COUNT; i++) {
        colors.push('color' + i);
    }

    const categories = document.querySelectorAll('.category a');
    const tags = document.querySelectorAll('.tag a');
    for (let i = 0; i < categories.length; i++) {
        categories[i].classList.add(colors[getRandomInt(0, colors.length)]);
    }
    for (let i = 0; i < tags.length; i++) {
        tags[i].classList.add(colors[getRandomInt(0, colors.length)]);
    }
})();

</script>

<template>
    <div id="articles">
        <div class="item" v-for="(item, index) in posts" v-bind:key="index">
            <a :href="base + item.url" target="_self">
                <div class="title">{{ item.title }}</div>
                <div class="description">{{ item.description }}</div>
            </a>
            <div class="bottom">
                <div class="category">
                    <a :href="base + 'category/' + e" v-for="(e, i) in item.category" v-bind:key="i">
                        {{ e }}
                    </a>
                </div>
                <div class="tag">
                    <a :href="base + 'tag/' + e" v-for="(e, i) in item.tag" v-bind:key="i">
                        {{ e }}
                    </a>
                </div>
            </div>
        </div>
        <div class="pages">
            <a :href="currentPage != 1 ? base + 'articles/pages/' + (currentPage - 1) : ''">
                <div class="page-block">
                    <
                </div>
            </a>
            <a :href="base + 'articles/pages/' + item" v-for="(item, index) in totalPage" v-bind:key="index">
                <div :class="{ 'active': currentPage == item, 'page-block': true }">
                    {{ item }}
                </div>
            </a>
            <a :href="currentPage != totalPage ? base + 'articles/pages/' + (currentPage + 1) : ''">
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
