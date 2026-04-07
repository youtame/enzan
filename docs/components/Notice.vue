<template>
    <div class="notice-section">
        <div v-if="loading" class="alert alert-info">読み込み中…</div>

        <div v-else-if="error" class="alert alert-error">
            お知らせの取得に失敗しました
        </div>

        <div v-else class="notice-list">
            <details
                v-for="(item, index) in notices"
                :key="index"
                class="notice-item"
                name="notice-accordion"
            >
                <summary class="notice-header">
                    <span class="notice-date">
                        {{ formatDate(item.info_date) }}
                    </span>
                    <span class="notice-title">
                        {{ item.title || item.information }}
                    </span>
                </summary>

                <div class="notice-body">
                    {{ item.information }}
                </div>
            </details>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useData } from "vitepress"; // VitePressのヘルパーを導入

// isDarkを抽出（今回はCSSメインで対応しますが、JSで判定したい時に使えます）
const { isDark } = useData();

type Notice = {
    title: string;
    information: string;
    info_date: string;
};

const notices = ref<Notice[]>([]);
const loading = ref(true);
const error = ref(false);

const formatDate = (date: string) => {
    return date.replace(/-/g, "/");
};

onMounted(async () => {
    try {
        const res = await fetch("/enzan/information/SFT-info.json");
        if (!res.ok) throw new Error("fetch failed");
        notices.value = await res.json();
    } catch (e) {
        console.error(e);
        error.value = true;
    } finally {
        loading.value = false;
    }
});
</script>

<style scoped>
.notice-section {
    margin: 40px auto;
    width: 100%;
    /* テキスト色をVitePressの標準に合わせる */
    color: var(--vp-c-text-1);
}

.notice-list {
    border-radius: 12px;
    padding: 8px;
    background-color: var(--vp-c-bg-soft);
}

.notice-item {
    border-radius: 8px;
    margin-bottom: 6px;
    overflow: hidden;
    transition: all 0.2s ease;
    /* 閉じている時の境界線を透明にしておく */
    border: 1px solid transparent;
}

.notice-item:hover {
    /* ホバー時に少し背景を明るく/暗くする */
    background-color: var(--vp-c-default-soft);
}

.notice-header {
    display: flex;
    gap: 12px;
    align-items: center;
    padding: 12px;
    cursor: pointer;
    font-weight: 600;
}

/* 開いている時のヘッダー背景 */
.notice-item[open] .notice-header {
    color: var(--vp-c-brand-1);
}

.notice-item[open] {
    border-color: var(--vp-c-brand-1);
    background-color: var(--vp-c-bg);
    margin-top: 10px;
    margin-bottom: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.notice-date {
    padding: 4px 14px;
    border-radius: 6px;
    font-size: 14px;
    /* 背景はブランド色、文字は背景に応じた読みやすい色 */
    background-color: var(--vp-c-brand-1);
    color: var(--vp-c-bg);
    flex-shrink: 0;
    font-weight: bold;
}

.notice-title {
    flex: 1;
    /* 折り返し対策 */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.notice-body {
    padding: 16px;
    line-height: 1.7;
    border-top: 1px solid var(--vp-c-divider);
    background-color: var(--vp-c-bg);
    white-space: pre-wrap; /* 改行を反映させる */
}

summary {
    list-style: none;
}
summary::-webkit-details-marker {
    display: none;
}

.notice-header::after {
    content: "▾";
    margin-left: auto;
    transition: transform 0.2s ease;
    opacity: 0.5;
}

.notice-item[open] .notice-header::after {
    transform: rotate(180deg);
}

/* アラート系の色もVitePress変数に合わせる */
.alert {
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 16px;
    border: 1px solid transparent;
}

.alert-info {
    background: var(--vp-c-brand-soft);
    color: var(--vp-c-brand-1);
}

.alert-error {
    background: var(--vp-c-danger-soft);
    color: var(--vp-c-danger-1);
}

@media (max-width: 600px) {
    .notice-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
    }
    .notice-title {
        white-space: normal;
        padding-left: 4px;
    }
    .notice-header::after {
        align-self: flex-end;
        margin-top: -20px;
    }
}
</style>
