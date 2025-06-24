<script setup>

const base = import.meta.env.BASE_URL;

import { useData } from 'vitepress';
const { params } = useData();
const posts = params.value.posts;
const currentPage = params.value.page;
const totalPage = params.value.totalPage;
console.log(params.value.posts);

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
                    <a href="'#'" v-for="(e, i) in item.category" v-bind:key="i">
                        {{ e }}
                    </a>
                </div>
                <div class="tag">
                    <a :href="'#'" v-for="(e, i) in item.tag" v-bind:key="i">
                        {{ e }}
                    </a>
                </div>
            </div>
        </div>
        <div class="pages">
            <a :href="currentPage != 1 ? base + 'articles/pages/' + (currentPage - 1) : ''" target="_self">
                <div class="page-block">
                    <
                </div>
            </a>
            <a :href="base + 'articles/pages/' + item" target="_self" v-for="(item, index) in totalPage" v-bind:key="index">
                <div :class="{ 'active': currentPage == item, 'page-block': true }">
                    {{ item }}
                </div>
            </a>
            <a :href="currentPage != totalPage ? base + 'articles/pages/' + (currentPage + 1) : ''" target="_self">
                <div class="page-block">
                    >
                </div>
            </a>
        </div>
    </div>
</template>

<style scoped>

#articles {
    margin-left: 32px;
    margin-right: 32px;
}

#articles .pages .active {
    background-color: #afafaf;
}

#articles .pages {
    display: flex;
    flex-direction: row;
    gap: 0px;
}

#articles .pages .page-block {
    display: flex;
    width: 32px;
    height: 48px;
    justify-content: center;
    align-items: center;
    box-shadow: 1px 1px 3px #333333;
}

#articles .item {
    display: flex;
    flex-direction: column;
    min-height: 100px;
    margin-top: 16px;
    margin-bottom: 16px;
    padding: 16px 16px 16px 16px;
    box-shadow: 1px 1px 3px #333333;
}

#articles .description {
    flex: 1;
}

#articles .bottom {
    bottom: 0px;
    
}

#articles .bottom a {
    background-color: whitesmoke;

    padding: 8px 8px 8px 8px;
    border-radius: 5px;
}

#articles .category {
    float: left;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 16px;
    align-items: center;
    margin-top: 8px;
    margin-bottom: 8px;
}

#articles .tag {
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
