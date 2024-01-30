<template>
  <PageShadows />
  <div class="my-[45px]">
    <OpenedTodos :todos="todoStore.openedTodos" />
    <AddTodo />
    <CompletedTodos :todos="todoStore.completedTodos" />
  </div>
</template>

<script setup>
import PageShadows from '@/components/PageShadows.vue'
import AddTodo from '@/components/AddTodo.vue'
import CompletedTodos from '@/components/CompletedTodos.vue'
import OpenedTodos from '@/components/OpenedTodos.vue'
import { useTodoStore } from '@/stores/TodoStore.js'

const todoStore = useTodoStore()
</script>
