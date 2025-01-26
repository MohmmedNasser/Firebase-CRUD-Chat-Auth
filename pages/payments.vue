<template>
    <GlobalLayoutHeading headingTitle="Payments" />
    <DataTable :columns="columns" :data="data" />
</template>

<script setup lang="ts">

import { columns } from '~/components/Payments/columns';

const data = ref<any>([]);

function generateRandomData(numObjects: number) {
    const statuses = ['pending', 'processing', 'completed'];
    const emails = ['example@gmail.com', 'm@example.com', 'test@example.com', 'user@example.com'];

    const randomData: any[] = [];

    for (let i = 0; i < numObjects; i++) {
        const index = i + 1
        const id = Math.random().toString(36).substr(2, 8);
        const amount = Math.floor(Math.random() * 500) + 50; // Random amount between 50 and 550
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const email = emails[Math.floor(Math.random() * emails.length)];

        randomData.push({ index, id, amount, status, email });
    }

    return data.value = randomData;
}

onMounted(() => {
    generateRandomData(100);
})

</script>

<style scoped></style>