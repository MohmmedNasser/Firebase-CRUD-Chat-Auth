<template>
    <div class="">
        <Header />
        <div class="container">
            <div class="flex items-start gap-5">
                <Sidebar class="sticky top-[61px] hidden lg:block h-[calc(100vh-61px)] w-[250px] flex-shrink-0 py-5" />
                <main class="py-5 flex-grow">
                    <slot />
                </main>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>