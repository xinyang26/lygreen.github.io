<script setup lang="ts">

import { useData } from 'vitepress';

const { params } = useData();

const tags = params.value?.tags;

</script>

<template>
    <div id="tag">
        <div v-for="(item, index) in tags" v-bind:key="index">
            {{ item }}
        </div>
    </div>
    
</template>
