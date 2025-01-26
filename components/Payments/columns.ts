import type { ColumnDef } from "@tanstack/vue-table"
import DropdownAction from '@/components/Payments/DropDown.vue'

interface Payment {
    id: string; // Add the 'id' field
    index: number,
    amount: number
    status: 'pending' | 'processing' | 'completed'
    email: string,
    actions: Function
}

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: 'index',
        header: () => h('div', { class: 'text-left' }, '#'),
        cell: ({ row }: any) => {
            const index = row.getValue('index')

            return h('div', { class: 'text-left font-medium' }, index)
        }
    },
    {
        accessorKey: 'email',
        header: () => h('div', { class: 'text-left' }, 'Email'),
        cell: ({ row }: any) => {
            const email = row.getValue('email')

            return h('div', { class: 'text-left font-medium' }, email)
        }
    }, {
        accessorKey: 'status',
        header: () => h('div', { class: 'text-left' }, 'Status'),
        cell: ({ row }: any) => {
            const status = row.getValue('status')

            return h('div', { class: 'text-left font-medium' }, status)
        }
    }, {
        accessorKey: 'amount',
        header: () => h('div', { class: 'text-left' }, 'Amount'),
        cell: ({ row }: any) => {
            const amount = Number.parseFloat(row.getValue('amount'));
            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(amount)

            return h('div', { class: 'text-left font-medium' }, formatted)
        }
    }
    , {
        accessorKey: 'actions',
        header: () => h('div', { class: 'text-left' }, 'Actions'),
        cell: ({ row }) => {
            const payment = row.original
            return h('div', { class: 'relative' }, h(DropdownAction, { payment }))
        }
    }
]