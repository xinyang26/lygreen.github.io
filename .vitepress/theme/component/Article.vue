<script setup>

import { ref, onMounted } from 'vue'
import { data as posts } from '../data/post.data.mts'

const base = import.meta.env.BASE_URL

const post = ref();
const createdTime = ref('');
const updatedTime = ref('');

onMounted(() => {
    const url = new URL(window.location.href)
    post.value = posts.find(p => base + p.url === url.pathname)

    createdTime.value = formatISOString(post.value.createdTime);
    updatedTime.value = formatISOString(post.value.updatedTime);
});

function formatISOString(isoString) {
    const date = new Date(isoString);
    return `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ` +
        `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
}

</script>

<template>
    <div id="article">
        <div class="header">
            <strong class="title">{{ post?.title }}</strong>
            <span class="description">{{ post?.description }}</span>
            <span>
                创建时间：{{ createdTime }}
            </span>
            <span>
                修改时间：{{ updatedTime }}
            </span>
        </div>
        <div class="body">
            <Content />
        </div>
        <div class="footer">
            <span>
                创建时间：{{ createdTime }}
            </span>
            <span>
                修改时间：{{ updatedTime }}
            </span>
        </div>
    </div>
</template>

<style>

#article {
    width: 100%;
    margin-top: 16px;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 16px;
    padding-bottom: 16px;

    box-shadow: 1px 1px 5px #333333;
}

#article .header .title {
    display: flex;
    justify-content: center;
    font-size: 48px;
}

#article .header .description {
    display: flex;
    justify-content: center;
    font-size: 24px;
}

#article .header span {
    display: block;
}

#article .body {
    
}

#article .body pre {

}

#article .body .vp-adaptive-theme {
    position: relative;

    padding: 8px 8px 8px 8px;
    border-radius: 5px;

    background-color: whitesmoke;
}

#article .body .vp-code {
    overflow-x: auto;
}

#article .body .copy {
    float: right;
}

#article .body .copy::after {
    content: "复制代码";
}

#article .body .copied::after {
    color: grey;
    content: "复制成功";
}

#article .body .lang {

}

#article .footer {
    
}

#article .footer span {
    display: block;
}

.line span {
    color: var(--shiki-light);
}



</style>
