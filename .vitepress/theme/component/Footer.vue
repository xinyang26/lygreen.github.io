<script setup>

import { ref, onMounted } from 'vue';

const year = ref('');
year.value = new Date(Date.now()).getFullYear();

</script>

<script client>

(() => {
    if (document.getElementById('footer') == null) {
        return;
    }

    const year = new Date(Date.now()).getFullYear();
    const elements = document.querySelectorAll('#footer span my-var');

    elements.forEach((e) => {
        e.textContent = year;
    });


});

</script>

<template>
    <div id="footer">
        <hr>
        <span>版权所有 © {{ year }} LYGreen。保留所有权利。</span>
        <span>Copyright © {{ year }} LYGreen. All rights reserved.</span>
    </div>
</template>

<style scoped>

#footer {
    background-color: var(--main-bg-color);
    box-shadow: var(--float-component-shadow);

    text-align: center;
}

span {
    display: block;
}

</style>
