<template>
    <aside class="">
        <div
            class="flex h-full flex-col border  gap-5 overflow-y-auto rounded-md scrollbar-thin scrollbar-thumb-input scrollbar-thumb-rounded-md">
            <SidebarItem :sidebarMenu="sidebarMenu" />
            <div class="mt-auto">
                <SidebarItem :sidebarMenu="bottomMenu" />
            </div>
        </div>
    </aside>
</template>

<script setup lang="ts">

const bottomMenu = [
    {
        title: "Settings",
        icon: "heroicons:cog-8-tooth",
    },
    {
        title: "Help",
        icon: "heroicons:question-mark-circle",
    },
    {
        title: "Logout",
        icon: "heroicons:arrow-left-on-rectangle",
    },
]

const sidebarMenu = [
    {
        title: "Dashboard",
        icon: "heroicons:home",
    },
    {
        title: "Customers",
        icon: "heroicons:user-group",
    },
    {
        title: "Orders",
        icon: "heroicons:shopping-cart",
    },
    {
        title: "Products",
        icon: "heroicons:cube",
        subItems: [
            { title: "Details" },
            { title: "Create" },
            { title: "Edit" },
            { title: "Update" },
        ],
    },
    {
        title: "Analytics",
        icon: "heroicons:chart-pie",
        subItems: [{ title: "Overview" }, { title: "Statistics" }, { title: "Trends" }],
    },
]

</script>

<style scoped></style>