<script setup lang="ts">

import { useData } from 'vitepress';

const { params } = useData();

const categories = params.value?.categories;

</script>

<template>
    <div id="category">
        <div v-for="(item, index) in categories" v-bind:key="index">
            {{ item }}
        </div>
    </div>
</template>

<style scoped>

</style>
