<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Open menu</span>
        <Icon name="meteor-icons:ellipsis" class="w-5 h-5 text-gray-600" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem @click="copy(payment.id)">
        Copy payment ID
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>View customer</DropdownMenuItem>
      <DropdownMenuItem>View payment details</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { useToast } from '../ui/toast';

defineProps<{
  payment: {
    id: string
  }
}>();

const { toast } = useToast()

function copy(id: string) {
  navigator.clipboard.writeText(id);
  toast({
    title: 'Payment ID copied successfully',
    description: 'You can past the Payment ID in anywhere',
  });
}


</script>
