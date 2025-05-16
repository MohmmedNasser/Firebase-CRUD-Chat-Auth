<template>
    <aside class="">
        <div
            class="flex h-full flex-col border  gap-5 overflow-y-auto rounded-md scrollbar-thin scrollbar-thumb-input scrollbar-thumb-rounded-md">
            <SidebarItem :sidebarMenu="sidebarMenu" />
            <div class="mt-auto">
                <SidebarItem :sidebarMenu="bottomMenu" />
            </div>
        </div>
        <button v-if="isMobile" @click="isSidebarOpen = false"
            class="fixed top-[20px] start-[300px] w-8 h-8 flex justify-center items-center bg-background rounded-full">
            <Icon name="material-symbols:close-rounded" size="20" />
        </button>
    </aside>
</template>

<script setup lang="ts">
import { signOut } from 'firebase/auth';

const { isSidebarOpen, isMobile } = useSidebar();
const auth = useFirebaseAuth();

const logout = async () => {
    await signOut(auth!);
    await navigateTo('/auth/login', { replace: true });
}

const bottomMenu = [
    // {
    //     title: "Settings",
    //     icon: "heroicons:cog-8-tooth",
    //     path: '/'
    // },
    // {
    //     title: "Help",
    //     icon: "heroicons:question-mark-circle",
    //     path: '/'
    // },
    {
        title: "Logout",
        icon: "heroicons:arrow-left-on-rectangle",
        path: '/',
        click: () => logout(),
    },
]

const sidebarMenu = [
    {
        title: "Dashboard",
        icon: "heroicons:home",
        path: '/'
    },
    {
        title: "Tabs",
        icon: "material-symbols:tabs-outline-rounded",
        path: '/tabs'
    },
    {
        title: "Dialog",
        icon: "proicons:archive",
        path: '/dialog'
    },
    {
        title: "Products",
        icon: "heroicons:cube",
        subItems: [
            { title: "Show", path: '/products' },
            { title: "Create", path: '/products/create' },
            { title: "Update", path: '/products/create' },
        ],
    },
    {
        title: "Analytics",
        icon: "heroicons:chart-pie",
        subItems: [{ title: "Payments", path: '/payments' }],
    },
]

</script>

<style scoped></style>