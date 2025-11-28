<template>
    <div class="main-card">
        <h1 class="author-name">{{ name }}</h1>
        <img :src="image" />
    </div>
</template>

<script setup>
defineProps({
    name: String,
    image: String
});
</script>

<style scoped>
.main-card {
    height: 200px;
    background-color: #e74717;
    border-radius: 10px;
    margin: 60px 20px 20px 20px;
}

.author-name {
    margin: 20px;
}
</style>