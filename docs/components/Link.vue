<template>
    <a :href="link" class="article-card">
        <img :src="image" alt="Article Thumbnail" class="card-image" />
        <div class="card-body">
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
        </div>
    </a>
</template>

<script setup>
defineProps({
    title: String,
    image: String,
    description: String,
    link: String
});
</script>

<style scoped>
.article-card {
    display: flex;
    flex-direction: column;
    width: 250px;
    background-color: #e74717;
    color: #FFF;
    border-radius: 10px;
    overflow: hidden;
    transition: box-shadow 0.3s ease;
    margin: 0 20px;
    text-decoration: none;
}

.article-card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    color: #FFF;
    cursor: pointer;
}

.card-image {
    width: 100%;
    height: 150px;
    object-fit: cover;
}

.card-body {
    padding: 1rem;
}

</style>
