<template>
    <div class="audio-player">
        <button @click="togglePlay" class="play-btn">
        {{ isPlaying ? "⏸" : "▶︎" }}
        </button>

        <div class="progress-wrapper">
        <input
            type="range"
            min="0"
            :max="duration"
            step="0.1"
            v-model="currentTime"
            @input="seek"
        />
        <div class="time">
            {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
        </div>
        </div>

        <audio
        ref="audio"
        :src="src"
        @loadedmetadata="onLoaded"
        @timeupdate="onTimeUpdate"
        @ended="isPlaying = false"
        />
    </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
    src: {
        type: String,
        required: true,
    },
});

const audio = ref(null);
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);

const togglePlay = () => {
    if (!audio.value) return;
    if (isPlaying.value) {
        audio.value.pause();
    } else {
        audio.value.play();
    }
    isPlaying.value = !isPlaying.value;
};

const onLoaded = () => {
    duration.value = audio.value.duration;
};

const onTimeUpdate = () => {
    currentTime.value = audio.value.currentTime;
};

const seek = () => {
    audio.value.currentTime = currentTime.value;
};

const formatTime = (time) => {
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60)
        .toString()
        .padStart(2, "0");
    return `${m}:${s}`;
};
</script>

<style scoped>
.audio-player {
    margin: auto;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    background: #e7391780;
    border-radius: 12px;
    color: #fff;
    width: 95%;
}

.play-btn {
    font-size: 20px;
    background: #e73917;
    border: none;
    border-radius: 10px;
    width: 44px;
    height: 44px;
    color: white;
    cursor: pointer;
}

.progress-wrapper {
    flex: 1;
}

input[type="range"] {
    width: 100%;
}

.time {
    font-size: 15px;
    text-align: right;
    opacity: 0.8;
}
</style>
