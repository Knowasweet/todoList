<template>
  <PageShadows />
  <div class="my-[45px]">
    <OpenedTodos :todos="todosStore.openedTodos" />
    <AddTodo />
    <CompletedTodos :todos="todosStore.completedTodos" />
  </div>
</template>

<script setup>
import PageShadows from '@/components/PageShadows.vue'
import AddTodo from '@/components/AddTodo.vue'
import CompletedTodos from '@/components/CompletedTodos.vue'
import OpenedTodos from '@/components/OpenedTodos.vue'
import { useTodosStore } from '@/stores/todos.js'

const todosStore = useTodosStore()
</script>
