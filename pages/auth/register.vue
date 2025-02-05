<template>
    <div class="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="container">
            <div class="text-center">
                <img src="/logo.svg" alt="logo" class="mx-auto h-20 w-auto" />
                <h1 class="text-3xl font-bold mt-4">Create account</h1>
                <p class="mt-2 text-lg text-muted-foreground">
                    Start managing your pets today!
                </p>
            </div>
            <div class="bg-white dark:bg-gray-900 max-w-[500px] mx-auto mt-8 p-6 rounded-lg">
                <form class="mt-5" @submit.prevent="onSubmit">

                    <FormField v-slot="{ componentField }" name="name">
                        <FormItem>
                            <FormLabel>Full name *</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Full name" v-bind="componentField" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>

                    <FormField v-slot="{ componentField }" name="email">
                        <FormItem class="mt-4">
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

                    <Button type="submit" class="w-full mt-5 h-11">
                        Create account
                    </Button>

                    <Separator label="Or" class="my-8" />

                    <Button @click="signUpWithGoogle" type="button" variant="outline" class="w-full h-11">
                        <Icon name="logos:google-icon" class="me-1" />
                        Sign up with Google
                    </Button>

                </form>


                <p class="mt-10 text-center text-sm">
                    Already have an account?
                    <NuxtLink to="/auth/login" class="text-sm text-primary-500 font-semibold hover:underline">
                        Sign in here
                    </NuxtLink>
                </p>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { toTypedSchema } from '@vee-validate/zod'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useForm } from 'vee-validate'
import { useToast } from '~/components/ui/toast';

const auth = useFirebaseAuth();
const { toast } = useToast();
const { signUpWithGoogle } = useGoogleAuth();

const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(RegisterSchema),
})

const onSubmit = handleSubmit(async (values) => {

    try {
        const { user } = await createUserWithEmailAndPassword(auth!, values.email, values.password);
        await updateProfile(user, {
            displayName: values.name
        });
        toast({
            title: 'Account created successfully',
        });
        return navigateTo('/', { replace: true });
    } catch (error: any) {
        console.error(error.message);
        console.error(error.code);
        if (error.code === 'auth/email-already-in-use') {
            toast({
                title: 'Email already in use',
            });
        }
    }
});

definePageMeta({
    layout: 'sign'
});

useSeoMeta({
    title: "Create account",
    description: "Create an account to manage your pets",
});

</script>

<style scoped></style>