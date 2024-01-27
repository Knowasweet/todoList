<template>
  <Transition
    enterFromClass="opacity-0"
    enterActiveClass="transition-opacity duration-300"
    leaveToClass="opacity-0"
    leaveActiveClass="transition-opacity duration-300"
  >
    <div
      v-if="todoStore.notificationFlag"
      class="fixed right-0 flex space-x-3 rounded-md bg-blue-100 p-4"
    >
      <div class="shrink-0">
        <FontAwesomeIcon :icon="['fas', 'circle-info']" class="h-6 w-6 text-blue-600/80" />
      </div>
      <div class="flex-1 space-y-2">
        <h4 class="text-base font-bold text-gray-500">Congrats!</h4>
        <div class="text-xs text-blue-600">Todo has been created.</div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useTodoStore } from '@/stores/TodoStore.js'

const todoStore = useTodoStore()
</script>
