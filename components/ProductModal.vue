<template>
    <Dialog v-model:open="open">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add product</DialogTitle>
            </DialogHeader>

            <form class="mt-5" @submit.prevent="submit">
                <div>
                    <label class="block font-medium">Name</label>
                    <input v-model="form.name" type="text" placeholder="Product name"
                        class="w-full border p-2 mt-2 rounded-md" />
                    <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</p>
                </div>

                <!-- Description Field -->
                <div class="mt-3">
                    <label class="block font-medium">Description</label>
                    <textarea v-model="form.description" placeholder="Type your product description here."
                        class="w-full border p-2 mt-2 rounded-md resize-none"></textarea>
                    <p v-if="errors.description" class="text-red-500 text-sm">{{ errors.description }}</p>
                </div>

                <!-- Price Field -->
                <div class="mt-3">
                    <label class="block font-medium">Price</label>
                    <input v-model="form.price" type="number" placeholder="Product price"
                        class="w-full border p-2 mt-2 rounded-md" />
                    <p v-if="errors.price" class="text-red-500 text-sm">{{ errors.price }}</p>
                </div>

                <Button type="submit" class="w-full mt-5 h-11">
                    Create
                </Button>

            </form>
        </DialogContent>
    </Dialog>

</template>

<script setup lang="ts">
import * as z from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { useForm } from 'vee-validate';
import type { Products } from '~/types';
import { useToast } from './ui/toast';

const { toast } = useToast();
const db = useFirestore();
const collectionName = 'products';
const user = useCurrentUser();

const open = defineModel({
    type: Boolean,
    default: false,
});

const props = defineProps<{
    product?: Products;
}>();

const isEditing = computed(() => !!props.product);

const form = ref({
    name: props.product?.name || '',
    description: props.product?.description || '',
    price: props.product?.price || 0
});

const errors = ref({
    name: '',
    description: '',
    price: ''
});

const submit = async () => {
    errors.value = { name: '', description: '', price: '' };

    if (!form.value.name) errors.value.name = "Name is required";
    if (!form.value.description) errors.value.description = "Description is required";
    if (!form.value.price || form.value.price <= 0) errors.value.price = "Price must be greater than 0";

    if (errors.value.name || errors.value.description || errors.value.price) {
        return;
    }
    try {
        const productRef = doc(collection(db, collectionName));
        await setDoc(productRef, {
            ...form.value,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            userId: user.value?.uid,
        });
        toast({
            title: `Product Added successfully`
        });
        open.value = false;
    } catch (error) {
        console.error('❌ Error in handleProductSubmit:', error);
    }
}


// const { handleSubmit } = useForm({
//     validationSchema: toTypedSchema(ProductSchema),
//     // initialValues: props.pet ?? {},
// });


// const submit = handleSubmit((values) => {
//     console.log('test');
//     console.log(ProductSchema.parse({ name: 'Test', description: 'A valid description', price: 10 }));

// try {
//     if (isEditing.value) {
//         // Update product
//         const productRef = doc(db, collectionName, props.product?.id!);
//         await updateDoc(productRef, {
//             name: values.name,
//             description: values.description,
//             price: values.price,
//             updatedAt: new Date().toISOString(),
//         });
//         toast({
//             title: `Product updated successfully`
//         });
//     } else {
//         // Create product
//         const productRef = doc(collection(db, collectionName));
//         await setDoc(productRef, {
//             ...values,
//             createdAt: new Date().toISOString(),
//             updatedAt: new Date().toISOString(),
//             userId: user.value?.uid,
//         });
//         toast({
//             title: `Product Added successfully`
//         });
//     }
//     open.value = false;
// } catch (error) {
//     console.error('❌ Error in handleProductSubmit:', error);
// }

// });

</script>

<style scoped></style>