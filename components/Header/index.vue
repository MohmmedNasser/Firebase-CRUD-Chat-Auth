<template>
    <header class="sticky z-10 top-0 border-b py-3 bg-background backdrop-blur">
        <div class="container">
            <div class="flex justify-between items-center gap-2">
                <div class="flex justify-between items-center gap-2">
                    <button @click="isSidebarOpen = true"
                        class="flex justify-center items-center w-6 h-6 bg-transparent cursor-pointer lg:hidden">
                        <span class="sr-only">Button used to open menu</span>
                        <Icon name="mage:align-left" size="50" />
                    </button>
                    <nuxt-link to="/" class="flex items-center gap-2">
                        <img src="/logo.svg" alt="logo" class="w-9 h-9">
                        <span class="font-medium">Firebase</span>
                    </nuxt-link>
                </div>
                <div class="flex gap-3 items-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger as-child>
                            <Button variant="outline" class="rounded-full p-2 w-9 h-9">
                                <Icon name="radix-icons:moon"
                                    class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Icon name="radix-icons:sun"
                                    class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span class="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem @click="colorMode.preference = 'light'" class="cursor-pointer">
                                Light
                            </DropdownMenuItem>
                            <DropdownMenuItem @click="colorMode.preference = 'dark'" class="cursor-pointer">
                                Dark
                            </DropdownMenuItem>
                            <DropdownMenuItem @click="colorMode.preference = 'system'" class="cursor-pointer">
                                System
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger as-child>
                            <Button class="rounded-full p-0 w-9 h-9 overflow-hidden">
                                <img src="https://randomuser.me/api/portraits/men/74.jpg" alt="Logged in user"
                                    class="h-full w-full" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" class="w-[220px]">
                            <DropdownMenuLabel class="border-b px-3 py-1.5 text-sm mb-1">
                                <p class="font-semibold">{{ user?.displayName }}</p>
                                <a :href="`mailto:${user?.email}`"
                                    class="font-normal text-sm text-gray-400 break-words">{{
                                        user?.email }}</a>
                            </DropdownMenuLabel>
                            <template v-for="(item, index) in profileMenuOptions" :key="index">
                                <DropdownMenuItem class="p-0" v-if="!item.divider">
                                    <RouterLink to="/" v-if="!item.click"
                                        class="block w-full rounded-md p-2 transition-all hover:bg-gray-100 focus-within:bg-gray-100 dark:hover:bg-gray-900">
                                        {{ item.title }}
                                    </RouterLink>

                                    <button v-else @click="item.click"
                                        class="block w-full text-start rounded-md p-2 transition-all hover:bg-gray-100 focus-within:bg-gray-100 dark:hover:bg-gray-900">
                                        {{ item.title }}
                                    </button>

                                </DropdownMenuItem>
                                <hr v-if="item.divider" class="my-1" />
                            </template>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { signOut } from 'firebase/auth';
const colorMode = useColorMode();

const { isSidebarOpen } = useSidebar();
const auth = useFirebaseAuth();

const user = useCurrentUser();

const logout = async () => {
    await signOut(auth!);
    await navigateTo('/auth/login', { replace: true });
    // alert('Logout User');
}

const profileMenuOptions = [
    { title: "Profile" },
    { title: "Billing" },
    { title: "Settings" },
    { title: "Team members" },
    { title: "Sales" },
    { divider: true },
    { title: "Logout", click: () => logout() },
];

</script>

<style scoped></style>