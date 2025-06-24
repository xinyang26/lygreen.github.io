<script setup>

import { ref, onMounted } from 'vue'
import { useData } from 'vitepress';

const { params, frontmatter } = useData();

const base = import.meta.env.BASE_URL

const post = ref();
const createdTime = ref('');
const updatedTime = ref('');
const readingTime = ref();

// onMounted(() => {
//     const url = new URL(window.location.href)
//     post.value = posts.find(p => base + p.url === url.pathname)

//     createdTime.value = formatISOString(post.value.createdTime);
//     updatedTime.value = formatISOString(post.value.updatedTime);
//     readingTime.value = post.value.readingTime;

//     loadDiscussion();
// });

// function formatISOString(isoString) {
//     const date = new Date(isoString);
//     return `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ` +
//         `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
// }

function loadDiscussion() {
    // script src="https://giscus.app/client.js"
    //     data-repo="LYGreen/make-blog"
    //     data-repo-id="R_kgDOO_l9dQ"
    //     data-category="Article discussions"
    //     data-category-id="DIC_kwDOO_l9dc4Cr1qV"
    //     data-mapping="pathname"
    //     data-strict="0"
    //     data-reactions-enabled="1"
    //     data-emit-metadata="0"
    //     data-input-position="bottom"
    //     data-theme="preferred_color_scheme"
    //     data-lang="zh-CN"
    //     crossorigin="anonymous"
    //     async>
    // script>

    const comments = document.getElementById('comments');
    const script = document.createElement('script');
    script.src = "https://giscus.app/client.js";
    script.setAttribute('data-repo', "LYGreen/make-blog");;
    script.setAttribute('data-repo-id', "R_kgDOO_l9dQ");
    script.setAttribute('data-category', "Article discussions");
    script.setAttribute('data-category-id', "DIC_kwDOO_l9dc4Cr1qV");
    script.setAttribute('data-mapping', "pathname");
    script.setAttribute('data-strict', "0");
    script.setAttribute('data-reactions-enabled', "1");
    script.setAttribute('data-emit-metadata', "0");
    script.setAttribute('data-input-position', "bottom");
    script.setAttribute('data-theme', "light");
    script.setAttribute('data-lang', "zh-CN");
    script.crossOrigin = 'anonymous';
    script.async = true;
    comments.appendChild(script);
}

</script>

<template>
    <div id="article">
        <div class="header">
            <strong class="title">{{ frontmatter.title }}</strong>
            <span class="description">{{ frontmatter.description }}</span>
            <span>
                🕒创建时间：{{ frontmatter.createdTime }}
            </span>
            <span>
                🕒修改时间：{{ frontmatter.updatedTime }}
            </span>
            <span>
                📖阅读时间：{{ frontmatter.readingTime }} 分钟
            </span>
        </div>
        <div class="body">
            <Content />
        </div>
        <div class="footer">
            <span>
                🕒创建时间：{{ frontmatter.createdTime }}
            </span>
            <span>
                🕒修改时间：{{ frontmatter.updatedTime }}
            </span>
        </div>
        <div id="comments"></div>
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
