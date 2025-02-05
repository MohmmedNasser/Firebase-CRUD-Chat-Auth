<template>
    <div class="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="container">
            <div class="text-center">
                <img src="/logo.svg" alt="logo" class="mx-auto h-20 w-auto" />
                <h1 class="text-3xl font-bold mt-4">Login Page</h1>
                <p class="mt-2 text-lg text-muted-foreground">
                    Welcome back! Enter your details to get started.
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

                    <FormField v-slot="{ componentField }" name="password">
                        <FormItem class="mt-4">
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Password" v-bind="componentField" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>

                    <p class="text-sm text-end mt-3">
                        <NuxtLink to="/auth/forgot-password" class="text-primary-500 hover:underline">
                            Forgot password?
                        </NuxtLink>
                    </p>

                    <Button type="submit" class="w-full mt-5 h-11">
                        Sign in
                    </Button>

                    <Separator label="Or" class="my-8" />

                    <Button @click="signUpWithGoogle" type="button" variant="outline" class="w-full h-11">
                        <Icon name="logos:google-icon" class="me-1" />
                        Sign in with Google
                    </Button>

                </form>


                <p class="mt-10 text-center text-sm">
                    Don't have an account?
                    <NuxtLink to="/auth/register" class="text-sm text-primary-500 font-semibold hover:underline">
                        Sign up
                    </NuxtLink>
                </p>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { toTypedSchema } from '@vee-validate/zod'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useForm } from 'vee-validate'
import { useToast } from '~/components/ui/toast';


const auth = useFirebaseAuth();
const { toast } = useToast();
const { signUpWithGoogle } = useGoogleAuth();

const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(LoginSchema),
})

const onSubmit = handleSubmit(async (values) => {

    try {
        await signInWithEmailAndPassword(auth!, values.email, values.password);
        toast({
            title: 'You are login successfully',
        });
        return navigateTo('/', { replace: true });
    } catch (error: any) {
        console.error(error.message);
        toast({
            title: `Invalid email or password`
        });
    }
})

definePageMeta({
    layout: 'sign'
});

useSeoMeta({
    title: "Sign in",
    description: "Sign in to your account",
});

</script>

<style scoped></style>