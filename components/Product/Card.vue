<template>
    <section class="grid grid-cols-3 gap-4">
        <Card v-for="product in products" :key="product.id">
            <CardHeader class="pb-5">
                <CardTitle class="leading-7 text-xl">{{ product.name }}</CardTitle>
            </CardHeader>
            <CardContent class="grid gap-4">
                <div>
                    {{ product.description }}
                </div>
                <span>
                    <strong>Price:</strong> <span class="text-foreground font-semibold">{{ product.price }} $</span>
                </span>
            </CardContent>
            <CardFooter class="space-x-2">
                <Button @click="editProduct(product)">
                    Edit
                </Button>
                <Button variant="ghost" @click="deleteProduct(product)">
                    Delete
                </Button>
            </CardFooter>
        </Card>
    </section>
</template>

<script setup lang="ts">

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

import { collection, deleteDoc, doc, query, where } from "firebase/firestore";
import type { Products } from '~/types';
import { useToast } from '../ui/toast';

const props = defineProps<{
    dialog: boolean
    editItem: Products | undefined
}>();


const db = useFirestore();
const collectionName = 'products';
const user = useCurrentUser();
const { toast } = useToast();

const q = query(collection(db, collectionName), where('userId', '==', user.value?.uid));

const { data: products, pending } = useCollection<Products>(q, { ssrKey: useId() });

const deleteProduct = async (product: Products) => {
    await deleteDoc(doc(db, collectionName, product.id!));
    toast({
        title: `Product removed successfully`
    });
}

const emit = defineEmits<{
    (e: 'update:dialog', value: boolean): void
    (e: 'update:editItem', value: Products | undefined): void
}>()

const editProduct = (product: Products) => {
    emit('update:dialog', true)
    emit('update:editItem', product)
}

watch(() => props.dialog, (v) => {
    if (!v) {
        emit('update:editItem', undefined)
    }
});

</script>

<style scoped></style>