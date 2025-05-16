<template>
    <GlobalLayoutHeading headingTitle="Products" />

    <div class="flex justify-between items-center gap-4 mb-4">
        <p>
            Welcome back, <span class="font-semibold">{{ user?.displayName }}</span>
        </p>
        <Button @click="dialog = true">
            Add Product
        </Button>
        <LazyProductModal v-if="dialog" v-model="dialog" :product="editItem" />

    </div>
    <ProductCard v-model:dialog="dialog" v-model:editItem="editItem" />
</template>

<script setup lang="ts">
import type { Products } from '~/types';

const user = useCurrentUser();

const dialog = ref(false);
const editItem = ref<Products>();


useSeoMeta({
    title: "Products",
    description: "Manage your products",
});

</script>

<style scoped></style>