<template>
    <section class="grid gap-5 md:grid-cols-3">
        <div class="rounded-lg border p-6" v-for="(card, index) in cards" :key="index">
            <div class="flex items-center justify-between">
                <p class="text-lg font-medium">{{ card.title }}</p>
                <span class="shrink-0">
                    <Icon :name="card.icon" class="h-8 w-8 text-gray-400" />
                </span>
            </div>
            <p class="mt-1.5 text-xl font-bold">
                {{ card.number }}
            </p>
            <p class="text-xs mt-2 text-gray-500">
                {{ card.text }}
            </p>
        </div>
    </section>
</template>

<script setup lang="ts">

const cards = [
    {
        title: 'Total Revenue',
        icon: 'heroicons:banknotes',
        number: '$45,231.89',
        text: '20% more than last month',
    },
    {
        title: 'Sales',
        icon: 'heroicons:credit-card',
        number: '$12,231',
        text: '13.2% more than last month',
    },
    {
        title: 'Customers',
        icon: 'flowbite:users-outline',
        number: '289',
        text: '13.2% more than last month',
    },
]
</script>

<style scoped></style>