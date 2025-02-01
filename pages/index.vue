<template>
    <GlobalLayoutHeading headingTitle="Dashboard" />

    <p class="mb-5">
        Welcome back, <span class="font-semibold">{{ user?.displayName }}</span>
    </p>

    <StatusCard />
    <ChartSales />
</template>

<script setup lang="ts">

const user = useCurrentUser();

</script>

<style scoped></style>