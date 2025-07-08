<script setup>


</script>

<script client>

(() => {
    if (document.getElementById('sidebar') == null) {
        return;
    }
})();

</script>

<template>
    <div id="sidebar">
    
        sidebar
    </div>
    
</template>

<style scoped>

#sidebar {
    
    position: sticky;
    /* top: 80px; */

    min-width: 214px;
    max-height: calc(100vh - 50px);

    border-style: solid;
    border-width: 2px;
    border-color: black;
}

</style>
