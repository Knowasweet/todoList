<template>
  <PageShadows />
  <Notification />
  <OpenTodos :todos="todoStore.openTodos" />
  <AddTodo />
  <CompletedTodos :todos="todoStore.completedTodos" />
</template>

<script setup>
import PageShadows from '@/components/PageShadows.vue'
import AddTodo from '@/components/AddTodo.vue'
import CompletedTodos from '@/components/CompletedTodos.vue'
import OpenTodos from '@/components/OpenTodos.vue'
import { useTodoStore } from '@/stores/TodoStore.js'
import Notification from '@/components/Notification.vue'

const todoStore = useTodoStore()
</script>
