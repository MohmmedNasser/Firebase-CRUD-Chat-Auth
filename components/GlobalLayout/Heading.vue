<template>
    <h1 class="text-4xl font-bold mb-5">
        {{ headingTitle }}
    </h1>
</template>

<script setup lang="ts">
defineProps<{
    headingTitle: String;
}>()
</script>

<style scoped></style>