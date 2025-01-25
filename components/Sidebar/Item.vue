<template>
    <div>
        <template v-for="(item, index) in sidebarMenu" :key="index">
            <RouterLink :to="item.path ? item.path : ''" v-if="!item.subItems"
                class="flex items-center gap-2 text-left text-[14px] p-3 transition hover:bg-gray-50 dark:hover:bg-gray-800 focus:bg-gray-100 dark:focus:bg-gray-800"
                :class="{ 'bg-gray-200 dark:bg-gray-800 hover:!bg-gray-200 dark:hover:!bg-gray-800': $route.fullPath == item.path }">
                <Icon v-if="item.icon" :name="item.icon" class="h-5 w-5 text-muted-foreground" />
                <span>
                    {{ item.title }}
                </span>
            </RouterLink>
            <Accordion v-else type="single" collapsible>
                <AccordionItem value="item-1" class="border-b-0">
                    <AccordionTrigger
                        class="p-3 font-normal transition hover:bg-gray-50 dark:hover:bg-gray-800 focus:bg-gray-100 dark:focus:bg-gray-800">
                        <span class="flex items-center gap-2 text-[14px]">
                            <Icon v-if="item.icon" :name="item.icon" class="h-5 w-5 text-muted-foreground" />
                            <span>
                                {{ item.title }}
                            </span>
                        </span>
                    </AccordionTrigger>
                    <AccordionContent class="mx-5 mt-2 mb-1 pb-0 border-s border-b-0">
                        <template v-for="(i, j) in item.subItems" :key="j">
                            <RouterLink :to="i.path"
                                class="flex items-center gap-2 text-left text-[14px] px-3 py-2 ms-2 transition rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 focus:bg-gray-100 dark:focus:bg-gray-800">
                                <span>
                                    {{ i.title }}
                                </span>
                            </RouterLink>
                        </template>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </template>
    </div>
</template>

<script setup lang="ts">

interface SubItem {
    title: string;
    path: string;
}

interface MenuItem {
    title: string;
    icon: string;
    path?: string;
    subItems?: SubItem[];
}

defineProps<{
    sidebarMenu: MenuItem[],
}>()

</script>

<style scoped></style>