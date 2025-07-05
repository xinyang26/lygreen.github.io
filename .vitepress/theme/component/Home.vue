<script setup>

import { onMounted } from 'vue';

const text = "Hello World !"
let currentText = text;
let span;
let strong;

onMounted(() => {
    span = document.querySelector("#home > span");
    strong = document.querySelector("#home > strong");

    span.textContent = currentText;

    startAnimation();
});

function startAnimation() {
    setTimeout(spanRemove, 200);
}

function spanRemove() {
    if (currentText != '') {
        currentText = currentText.slice(0, -1);
        span.textContent = currentText;
        setTimeout(spanRemove, 100);
    } else {
        setTimeout(spanAdd, 100);
    }
}

function spanAdd() {
    if (currentText != text) {
        currentText += text[currentText.length];
        span.textContent = currentText;
        setTimeout(spanAdd, 100);
    } else {
        setTimeout(spanRemove, 3000);
    }
}

</script>

<template>
    <div id="home">
        <span class="home-text">
            Hello World !
        </span>
    </div>
</template>

<style scoped>

#home {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

span {
    color: var(--text-color);
    transition: var(--transition-attribute);
}

</style>
