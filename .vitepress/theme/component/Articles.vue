<script setup>

import { data as posts } from '../data/post.data.mts' 

const base = import.meta.env.BASE_URL;

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
                    <a :href="'#'" v-for="(e, i) in item.category" v-bind:key="i">
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
    </div>
</template>

<style scoped>

#articles {
    margin-left: 32px;
    margin-right: 32px;
}

#articles .item {
    display: flex;
    flex-direction: column;
    min-height: 100px;
    margin-top: 16px;
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
