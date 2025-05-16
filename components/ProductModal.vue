<template>
    <Dialog v-model:open="open">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{{ title }}</DialogTitle>
            </DialogHeader>

            <form @submit="onSubmit" class="space-y-4">
                <div class="space-y-2">
                    <Label for="name">Name</Label>
                    <Input id="name" v-model="name" v-bind="nameAttrs" placeholder="John Doe" />
                    <span v-if="errors.name" class="text-sm inline-block mt-2 text-red-500">
                        {{ errors.name }}
                    </span>
                </div>

                <div class="space-y-2">
                    <Label for="description">Description</Label>
                    <textarea v-model="description" v-bind="descriptionAttrs"
                        placeholder="Type your product description here."
                        class="w-full border p-2 mt-2 rounded-md resize-none"></textarea>
                    <span v-if="errors.description" class="text-sm text-red-500">
                        {{ errors.description }}
                    </span>
                </div>

                <div class="space-y-2">
                    <Label for="price">Price</Label>
                    <Input type="number" id="price" v-model="price" v-bind="priceAttrs" placeholder="Price" />
                    <span v-if="errors.price" class="text-sm inline-block mt-2 text-red-500">
                        {{ errors.price }}
                    </span>
                </div>

                <div class="flex justify-end gap-2">
                    <Button type="submit" :disabled="isSubmitting">{{ buttonText }}</Button>
                </div>
            </form>


        </DialogContent>
    </Dialog>

</template>

<script setup lang="ts">

import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import type { Products } from '~/types';
import { useToast } from './ui/toast';
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';

const { toast } = useToast();
const db = useFirestore();
const collectionName = 'products';
const user = useCurrentUser();

const props = defineProps<{
    product?: Products;
}>();

const open = defineModel({
    type: Boolean,
    default: false,
});

// Validation schema
const formSchema = toTypedSchema(z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(50),
    description: z.string().min(10, "Description must be at least 10 characters").max(250),
    price: z.number({
        invalid_type_error: "Price must be a number",
        required_error: "Price is required",
    }).min(0.01, "Price must be at least 0.01"),
}))

const { handleSubmit, errors, defineField, isSubmitting, setValues, resetForm } = useForm({
    validationSchema: formSchema,
    initialValues: props.product || {},
});

const isEditing = computed(() => !!props.product);

const [name, nameAttrs] = defineField('name')
const [description, descriptionAttrs] = defineField('description')
const [price, priceAttrs] = defineField('price')

const title = computed(() => isEditing.value ? 'Edit Product' : 'Add Product');
const buttonText = computed(() => isEditing.value ? 'Update Product' : 'Add Product');

const onSubmit = handleSubmit(async (values) => {
    console.log(values);
    try {
        if (isEditing.value) {
            // Update product
            const productRef = doc(db, collectionName, props.product?.id!);
            await updateDoc(productRef, {
                name: values.name,
                description: values.description,
                price: values.price,
                updatedAt: new Date().toISOString(),
            });
            toast({
                title: `Product updated successfully`
            });
        } else {
            // Create product
            const productRef = doc(collection(db, collectionName));
            await setDoc(productRef, {
                ...values,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                userId: user.value?.uid,
            });
            toast({
                title: `Product Added successfully`
            });
        }
        open.value = false;
    } catch (error) {
        console.error('❌ Error in handleProductSubmit:', error);
    }
})

</script>

<style scoped></style>