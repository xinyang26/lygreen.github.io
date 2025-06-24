<script setup>

const base = import.meta.env.BASE_URL

function toggleTheme() {
    const html = document.querySelector("html");
    html.className = html.className == 'dark' ? "light" : "dark"
}

</script>

<template>
    <div id="header">
        <div class="left">
            <a id="home" :href="base" target="_self">首页</a>
            <a :href="base + 'articles/pages/1'" target="_self">文章</a>
            <!-- <a href="#">分类</a>
            <a href="#">标签</a> -->
        </div>

        <div class="right">
            <a href="https://github.com/LYGreen/make-blog" target="_blank">Github</a>

        </div>
        <!-- <button :onclick="toggleTheme">aa</button> -->
    </div>

</template>

<style scoped>

#header {
    z-index: 999;
    position: sticky;

    top: 0px;
    width: 100%;
    height: 50px;


    box-shadow: 2px 2px 5px #333333;

    background-color: white;
    transition: background-color 0.8s;
}

#home {
    text-align: center;
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
