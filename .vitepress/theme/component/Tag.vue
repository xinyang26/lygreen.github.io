<script setup>

import { useData } from 'vitepress';
import { onMounted } from 'vue';

const { params } = useData();

const base = import.meta.env.BASE_URL;
const tags = params.value?.tags;

const COLOR_COUNT = 6;
const colors = [];
for (let i = 0; i < COLOR_COUNT; i++) {
    colors.push('color' + i);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

onMounted(() => {
    const categories = document.querySelectorAll('#tag a');
    for (let i = 0; i < categories.length; i++) {
        categories[i].classList.add(colors[getRandomInt(0, colors.length)]);
    }
});

</script>

<template>
    <div id="tag">
        <a :href="base + 'tag/' + item" target="_self" class="block" v-for="(item, index) in tags" v-bind:key="index">
            <span>{{ item }}</span>
        </a>
    </div>
</template>

<style scoped>

#tag {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    
    gap: 20px;
    margin: 20px 20px 20px 20px;
}

.block {
    position: relative;
    box-shadow: var(--float-component-shadow);
    border-radius: 8px;

    width: 200px;
    height: 120px;
}

span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

a {
    transition: transform 0.3s ease, var(--transition-attribute, background-color 0s);

}

a:hover {
    transform: translateY(-2px);
}

</style>
