<script setup lang="ts">

import { useData, useRoute, useRouter } from 'vitepress';
import { onMounted, reactive, ref } from 'vue';
import axios from 'axios';

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

interface PostsPageInfo {
    postsPerPage: number,
    totalPages: number,
    length: number,
}

interface User {
    avatarUrl: string,
    bio: string,
}

const base = (import.meta as any).env.BASE_URL;
const data = useData();
const route = useRoute();
const router = useRouter();

let _postsPageInfo: PostsPageInfo;
let _posts: Post[];
let _user: any;

const posts = ref<Post[]>([]);
const currentPage = ref<number>(1);
const user = ref<User>({} as User);
const pagination = ref<Array<any>>([]);
    
router.onAfterRouteChange = (async (to) => {
    getCurrentPageNumber();
    await Promise.all([
        requestPosts()
    ]);
    loadPosts();
    loadPagination();
});

onMounted(async () => {
    getCurrentPageNumber();
    await Promise.all([
        requestUserInfo(),
        requestPageInfo(),
        requestPosts(),
    ]);

    loadUserInfo();
    loadPosts();
    loadPagination();
});



// ChatGPT
function getPagination(currentPage: number, totalPages: number, delta = 2) : Array<any> {
    const pages: Array<any> = [];
    const range: Array<any> = [];

    // 总页数小于等于显示页码数量时全部展示
    // 中间显示的页数 + 首页尾页，此处没有省略号页
    if (totalPages <= 1 + 2 * delta + 2) {
        for (let i = 1; i <= totalPages; i++) {
            range.push(i);
        }
    } else {
        // 中间显示的页数的最左边的页数
        const left = Math.max(2, currentPage - delta);

        // 中间显示的页数的最右边的页数
        const right = Math.min(totalPages - 1, currentPage + delta);

        range.push(1); // 首页

        if (left > 2) {
            range.push("...");
        }

        for (let i = left; i <= right; i++) {
            range.push(i);
        }

        if (right < totalPages - 1) {
            range.push("...");
        }

        range.push(totalPages); // 尾页
    }

    return range;
}

function getCurrentPageNumber() {
    const relativePath = data.page.value.relativePath;

    if (relativePath === "index.md") {
        currentPage.value = 1;
    } else {
        const match = relativePath.match(/^page\/(\d+).md$/);
        currentPage.value = match ? Number.parseInt(match[1]) : 1;
    }
}

async function requestPageInfo() {
    await axios.get(base + "json/posts-page-info.json").then((response) => {
        _postsPageInfo = response.data;
    });
    
}

async function requestPosts() {
    let postsUrl = base + "json/posts-page-" + currentPage.value + ".json";

    await axios.get(postsUrl).then((response) => {
        _posts = response.data;
    })
}

async function requestUserInfo() {
    await axios.get("https://api.github.com/users/LYGreen").then((response) => {
        _user = response.data;
    });
}

function loadUserInfo() {
    user.value.avatarUrl = _user.avatar_url ?? "";
    user.value.bio = _user.bio ?? "";
}

function loadPosts() {
    posts.value = _posts;
}

function loadPagination() {
    pagination.value = getPagination(currentPage.value, _postsPageInfo.totalPages);
}

</script>

<template>
    <div id="home">
        <div class="profile">
            <div class="avatar">
                <a href="#">
                    <img :src="user.avatarUrl" alt="">
                </a>
                <span class="emoji">🍥</span>
            </div>
            <span>{{ user.bio }}</span>
        </div>
        <div class="articles">
            <div class="item" v-for="(item, index) in posts" v-bind:key="index">
                <a class="item-header" :href="base + item.url">
                    <h3>{{ item.title }}</h3>
                    <p>{{ item.description }}</p>
                </a>
                <a class="item-footer">
                    <div class="category">
                        <a :href="base + 'category/'" v-for="(i, idx) in item.category" v-bind:key="idx">
                            {{ i }}
                        </a>
                    </div>
                    <div class="tag">
                        <a :href="base + 'tag/'" v-for="(i, idx) in item.tag" v-bind:key="idx">
                            {{ i }}
                        </a>
                    </div>
                </a>
            </div>

            <div class="pages">
                <a :href="item == 1 ? '/' : ('/page/' + item)" v-for="(item, index) in pagination" v-bind:key="index" :class="{ active: item == currentPage }">
                    {{ item }}
                </a>
            </div>
        </div>

    </div>
</template>

<style scoped>

#home {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 48px;
    padding-top: 48px;
    padding-left: 200px;
    padding-right: 200px;
    padding-bottom: 48px;
}

.profile {
    position: sticky;
    display: flex;
    gap: 20px;
    flex-direction: column;
    align-items: center;

    top: calc(50px + 48px);

    background-color: var(--main-bg-color);
    box-shadow: var(--float-component-shadow);

    padding: 16px 16px 16px 16px;
    border-radius: 12px;
    width: 240px;

}

.profile .avatar {
    position: relative;
}

.profile .emoji {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 32px;
    height: 32px;
    background-color: var(--secondary-bg-color);
    box-shadow: var(--float-component-shadow);
    text-align: center;
    line-height: 32px;
    border-radius: 50%;
}

.profile img {
    box-shadow: var(--float-component-shadow);
    aspect-ratio: 1;
    width: 128px;
    border-radius: 50%;

}

.articles {
    display: flex;
    flex-direction: column;
    gap: 20px;

    flex: 1;
}

.item {
    display: flex;
    flex-direction: column;

    background-color: var(--main-bg-color);
    box-shadow: var(--float-component-shadow);
    padding: 16px 32px 16px 32px;
    border-radius: 12px;

    transition: transform 0.3s ease, var(--transition-attribute, background-color 0s);
}

.item:hover {
    transform: translateY(-2px);
}

.item-header {
    flex: 1;
}

.item-footer {
    bottom: 0px;
    
}

.item-footer a {
    padding: 8px 8px 8px 8px;
    border-radius: 8px;
    
    box-shadow: var(--float-component-shadow);
    transition: transform 0.3s ease, var(--transition-attribute, background-color 0s);
}

.item-footer a:hover {
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

.pages {
    display: flex;
    flex-direction: row;
}

.pages a {
    box-shadow: var(--float-component-shadow);
    transition: transform 0.3s ease, var(--transition-attribute, background-color 0s);

    display: block;
    padding: 12px 12px 12px 12px;
    border-radius: 8px;

}

.pages .active {
    background-color: var(--secondary-bg-color);
}

</style>
