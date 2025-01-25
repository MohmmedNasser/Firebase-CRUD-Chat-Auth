<template>
    <div>
        <Header />
        <div class="container">
            <div class="flex items-start gap-5">
                <Sidebar v-if="!isMobile"
                    class="sticky top-[61px] hidden lg:block h-[calc(100vh-61px)] w-[250px] flex-shrink-0 py-5" />
                <template v-else>
                    <Sidebar v-if="isSidebarOpen"
                        class="fixed z-20 start-[15px] top-[15px] bg-background block h-[calc(100vh-30px)] w-[250px] rounded-lg" />
                </template>
                <main class="py-5 flex-grow">
                    <slot />
                </main>
            </div>
        </div>
        <div class="fixed inset-0 z-10 bg-black/25 dark:bg-black/05 backdrop-blur" v-if="isSidebarOpen"></div>
    </div>
</template>

<script setup lang="ts">

const { isMobile, pageSize, isSidebarOpen } = useSidebar();

onMounted(() => {
    pageSize();
});

</script>

<style scoped></style>