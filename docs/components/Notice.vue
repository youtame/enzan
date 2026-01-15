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

type Notice = {
    title: string;
    information: string;
    info_date: string;
};

const notices = ref<Notice[]>([]);
const loading = ref(true);
const error = ref(false);

const formatDate = (date: string) => {
    // 例: 2025-01-16 → 2025/01/16
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
<style lang="css">
.notice-section {
    margin: 40px auto;
    width: 100%;
}

.notice-list {
    border: 1px solid #ddd;
    border-radius: 12px;
    padding: 8px;
}

.notice-item {
    border-radius: 8px;
    margin-bottom: 6px;
    overflow: hidden;
}

.notice-item:last-child {
    margin-bottom: 0;
}

.notice-header {
    display: flex;
    gap: 12px;
    align-items: center;
    padding: 12px;
    cursor: pointer;
    font-weight: 500;
}

.notice-item[open] .notice-header {
    background: var(--vp-c-brand-1);
    border-radius: 10px;
}

.notice-date {
    padding: 4px 18px;
    border-radius: 5px;
    font-size: 16px;
    background-color: var(--vp-c-brand-1);
    color: #fff;
    flex-shrink: 0;
    font-weight: 600;
}

.notice-title {
    flex: 1;
}

.notice-body {
    padding: 12px;
    line-height: 1.6;
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
}

.notice-item[open] .notice-header::after {
    transform: rotate(180deg);
}

.alert {
    padding: 12px;
    border-radius: 8px;
}

.alert-info {
    background: #e3f2fd;
    color: #0d47a1;
}

.alert-error {
    background: #fdecea;
    color: #b71c1c;
}

/* 画面幅600px以下のとき縦並び */
@media (max-width: 600px) {
    .vp-doc summary {
        margin: 5px 8px 5px 8px;
    }

    .notice-header {
        flex-direction: column;
        align-items: flex-start; /* 左揃え */
        gap: 6px; /* 小さい隙間に調整 */
    }

    .notice-date {
        padding: 4px 12px; /* 日付のパディングも少し小さめに */
        font-size: 14px;
    }

    .notice-title {
        font-size: 16px; /* タイトルサイズ調整 */
        padding-left: 10px;
    }

    .notice-header::after {
        content: "▾";
        font-size: 20px;
        margin-left: auto;
        transition: transform 0.2s ease;
    }
}
</style>
