<template>
    <div class="main-card">
        <img :src="image" alt="author image" class="author-image" />
        <h2 class="author-name">{{ name }}</h2>
        <p class="author-intro">{{ intro }}</p>
    </div>
</template>

<script setup>
defineProps({
    name: String,
    image: String,
    intro: String
});
</script>

<style scoped>
.main-card {
    background-color: #e74717;
    border-radius: 10px;
    margin: 20px 0;
    padding: 20px;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.author-image {
    width: 120px;
    height: 120px;
    border-radius: 60px;
    object-fit: cover;
    margin-bottom: 10px;
}

.author-name {
    margin-bottom: 10px;
    margin-top: 15px;
    border-top: 2px solid var(--vp-c-divider);
}

.author-intro {
    text-align: center;
    font-size: 16px;
    opacity: 0.9;
}
</style>