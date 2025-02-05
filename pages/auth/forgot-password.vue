<template>
    <div class="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="container">
            <div class="text-center">
                <img src="/logo.svg" alt="logo" class="mx-auto h-20 w-auto" />
                <h1 class="text-3xl font-bold mt-4">Forgot password</h1>
                <p class="mt-2 text-lg text-muted-foreground">
                    Let us help you sign in to your account.
                </p>
            </div>
            <div class="bg-white dark:bg-gray-900 max-w-[500px] mx-auto mt-8 p-6 rounded-lg">
                <form class="mt-5" @submit.prevent="onSubmit">
                    <FormField v-slot="{ componentField }" name="email">
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="Email" v-bind="componentField" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>

                    <Button type="submit" class="w-full mt-5 h-11">
                        Send instructions
                    </Button>
                </form>

                <p class="mt-10 text-center text-sm">
                    <NuxtLink to="/auth/login" class="text-sm text-primary-500 font-semibold hover:underline">
                        Go to sign in
                    </NuxtLink>
                </p>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { toTypedSchema } from '@vee-validate/zod'
import { sendPasswordResetEmail } from 'firebase/auth'
import { useForm } from 'vee-validate'
import { useToast } from '~/components/ui/toast';


const auth = useFirebaseAuth();
const { toast } = useToast();

const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(ForgotPasswordSchema),
})

const onSubmit = handleSubmit(async (values) => {
    toast({
        title: "Loading...",
        description: "We are sending the instructions to your email",
    });
    try {
        await sendPasswordResetEmail(auth!, values.email, {
            url: "http://localhost:3000/auth/login",
        });
        toast({
            title: 'Please check your email',
            description: "We have sent you instructions to reset your password",
        });
        return navigateTo('/auth/login', { replace: true });
    } catch (error: any) {
        console.error(error.message);
        toast({
            title: `Invalid email`
        });
    }
})

definePageMeta({
    layout: 'sign'
});

useSeoMeta({
    title: "Forgot password",
    description: "Forgot your password? Let us help you sign in to your account",
});

</script>

<style scoped></style>