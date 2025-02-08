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
</template>

<script setup lang="ts">
import { query, collection, where } from 'firebase/firestore';
import type { Products } from '~/types';

const user = useCurrentUser();
const db = useFirestore();
const collectionName = 'products';

// const isOpen = useState('dialogOpen', () => false);
const dialog = ref(false);
const editItem = ref<Products>();

// const q = query(collection(db, collectionName), where('userId', '==', user.value?.uid));

// const { data: products, pending } = useCollection<Products>(q, { ssrKey: useId() });

useSeoMeta({
    title: "Products",
    description: "Manage your products",
});

</script>

<style scoped></style>